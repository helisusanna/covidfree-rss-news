import React from "react";
import {useState, } from "react";
import makeStyles from '@mui/styles/makeStyles';
// MUI
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// components
import NewCard from "./NewCard";
// Icons
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import VirusIcon from '../media/virus-slash-solid.png'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2%"
  },
}));

function News(props) {
    const classes = useStyles();
    const [news, setNews] = useState(props.news);
    const [categories, setCategories] = React.useState();
    const [categ, setCateg] = React.useState("");
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const allCategories = () => {
        setCateg("");
    }
    const findCategories = () => {
        let arr = [];
        news.map((data) => arr.push(data.category));
        let array = removeDuplicates(arr);
        let result = [];
        array.map((data) => (result.push(
            <MenuItem key={data} onClick={() => handleCloseUserMenu(data)}>
                <Typography textAlign="center">{toUppercase(data)}</Typography>
            </MenuItem> 
        )))
        return result;
    };
    const filterCategories = () => {
        let arr = [];
        news.map((data) => { 
            if(data.category!=categ){
                arr.push(data.category)
            }
        })
        let array = removeDuplicates(arr);
        let result = [];
        array.map((data) => (result.push(
            <MenuItem key={data} onClick={() => handleCloseUserMenu(data)}>
                <Typography textAlign="center">{toUppercase(data)}</Typography>
            </MenuItem> 
        )))
        return result;
    };
    const removeDuplicates = (arr) => {
        let array = [];
        let object = {};
        for (const i in arr) { 
            object[toUppercase(arr[i])] = arr[i]; 
        }
        for (const i in object) {
            array.push(object[i]);
        }
        return array;
    }
    const toUppercase = (string) => {
        let String = string.charAt(0).toUpperCase() + string.slice(1);
        return String;
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = (category) => {
        setAnchorElUser(null);
        console.log(category);
        setCateg(category);
    };
  return (
    <>
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} >Tuoreimmat uutiset</Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton onClick={allCategories}>
                            <Avatar alt="covid" src={VirusIcon} sx={{ mr : 2 }} />
                        </IconButton>
                    </Box>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>Tuoreimmat uutiset</Typography>
                    <Typography variant="button" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', md: 'none' } }}>covid-19-free</Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <IconButton onClick={allCategories}>
                            <Avatar alt="covid" src={VirusIcon} sx={{ mr : 2 }} />
                        </IconButton>
                        <Typography variant="button" sx={{ flexGrow: 1 }}>covid-19-free</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {(categ)
                        ?<Tooltip title="Kaikki kategoriat">
                            <IconButton color="inherit" sx={{ p: 0, mr: 4 }}>
                                <FilterAltOffIcon onClick={allCategories} />
                            </IconButton>
                        </Tooltip>
                        : null }
                        <Tooltip title="Valitse kategoria">
                            <IconButton color="inherit" onClick={handleOpenUserMenu} sx={{ p: 0, mr: 2 }}>
                                <FilterAltIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted transformOrigin={{vertical: 'top', horizontal: 'right',}} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                        {(categ!="")
                        ? filterCategories()
                        : findCategories()}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        <Container className={classes.root} maxWidth={"lg"}>
            <Grid spacing={3} container direction="row" justifyContent="center" alignItems="stretch">
                {news.map((n, index) => (
                    (categ)
                    ? (categ===n.category)
                        ? <Grid key={index} item md={4}>
                            <NewCard ikey={index} title={n.title} content={n.content} img={n.img} datetime={n.datetime} category={n.category} link={n.link} />
                        </Grid>
                        : null
                    : <Grid key={index} item md={4}>
                        <NewCard ikey={index} title={n.title} content={n.content} img={n.img} datetime={n.datetime} category={n.category} link={n.link} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    </>
  );
}
export default News;
