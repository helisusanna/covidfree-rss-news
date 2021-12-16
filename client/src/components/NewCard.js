import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import cardcss from './card.css';
// MUI
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
// Icons
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// Img
import noImg from '../media/noImg.png';
import yleImg from '../media/yle.png';
import hsImg from '../media/hs.png';
import ilImg from '../media/il.png';
import isImg from '../media/is.png';

const useStyles = makeStyles((theme) => ({
    cardWidth: {
        maxWidth: 345,
        [theme.breakpoints.down('sm')]: {
            maxWidth: 500,
        },
    },
    chip: {
        marginLeft:7,
        marginTop:7,
    }
}));

export default function NewCard(props) {
    const classes = useStyles();
    const [ikey, setKey] = React.useState(props.ikey);
    const [title, setTitle] = React.useState(props.title);
    const [content, setContent] = React.useState(props.content);
    const [img, setImg] = React.useState(props.img || noImg);
    const [link, setLink] = React.useState(props.link);
    const [category, setCategory] = React.useState(props.category);
    const [datetime, setDatetime] = React.useState(props.datetime);
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    const checkTheLink = (link) => {
        let resultString = link.substring(6, 20)
        if(resultString.includes("hs.fi") == true || resultString.includes(".hs") == true){
          return hsImg;
        }
        else if(resultString.includes("yle.fi") == true){
          return yleImg;
        }
        else if(resultString.includes("ilta") == true){
          return ilImg;
        }
        else if(resultString.includes("is.fi") == true){
          return isImg;
        }
    }
    const toUppercase = (string) => {
        let String = string.charAt(0).toUpperCase() + string.slice(1);
        return String;
    };
    return (
        <Card key={ikey} className={[classes.cardWidth, 'card']}>
            <CardHeader
            avatar={<Avatar alt="news" src={checkTheLink(link)} />}
            title={title}
            subheader={datetime.replace(/[/,]/g, x => ({'/': '.', ',': ' klo'}[x]))}
            />
            <CardMedia
            component="img"
            height="194"
            image={img}
            alt={title}
            />
            <Chip color="secondary" className={classes.chip} label={toUppercase(category)} variant="outlined" />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button onClick={() => openInNewTab(link)} color="secondary" variant="outlined" aria-label="open" startIcon={<OpenInNewIcon />}>Avaa selaimessa</Button>
            </CardActions>
        </Card>
  );
}