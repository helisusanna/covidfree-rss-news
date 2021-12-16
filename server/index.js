const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 3009;
const news = require("./models/news");

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    news.getAll((err, results) => {
        let newsArr = [];
        console.log(results)
        results[0].forEach((result) => {
            newsArr.push(result);
        });
        function sortFunction(a,b){  
            var dateA = (a.date).getTime();
            var dateB = (b.date).getTime();
            return dateA < dateB ? 1 : -1;  
        }; 
        newsArr.sort(sortFunction);
        newsArr = newsArr.slice(0, 39);
        if (err) throw err;
        res.json({"news" : newsArr});
    });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(port, () => {
    console.log(`Palvelin käynnistyi porttiin: ${port}`);
});