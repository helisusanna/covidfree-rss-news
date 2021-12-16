const fetch = require("node-fetch");
const xml2js = require("xml2js");

let getNews = (yle_url, hs_url, il_url, is_url) => {
    let news = [];
        let yle = new Promise((resolve, reject) => {
            fetch(yle_url).then((response) => {
                response.text().then((dataXML) => {
                    xml2js.parseString(dataXML, (err, dataJSON) => {
                        if (err) {reject("Data ei ole xml-muodossa");
                        } else {
                            dataJSON.rss.channel[0].item.forEach((item) => {
                                let yleObj;  
                                if(!item.category[0].includes("virus")&&!item.description[0].includes("orona")&&!item.description[0].includes("rokot")&&!item.description[0].includes("Rokot")
                                &&!item.description[0].includes("artunta")&&!item.description[0].includes("covid")&&!item.title[0].includes("orona")&&!item.title[0].includes("rokot")){
                                    if (item.enclosure === undefined) {
                                        yleObj =  {
                                            "title" : item.title[0],
                                            "content" : item.description[0],
                                            "link" : item.link[0],
                                            "img" : "",
                                            "date" : new Date(item.pubDate[0]),
                                            "datetime" : new Date(item.pubDate[0]).toLocaleString("en-GB"),
                                            "category" : item.category[0]
                                        }
                                    } else {
                                        yleObj =  {
                                            "title" : item.title[0],
                                            "content" : item.description[0],
                                            "link" : item.link[0],
                                            "img" : item.enclosure[0].$.url,
                                            "date" : new Date(item.pubDate[0]),
                                            "datetime" : new Date(item.pubDate[0]).toLocaleString("en-GB"),
                                            "category" : item.category[0]
                                        }
                                    }
                                }
                                news.push(yleObj);
                            });
                            setTimeout(() => {
                                resolve(news)
                            }, 2000)
                        }//else
                    });//parseString
                })//response
            }).catch((err) => {
                reject("Palvelimeen ei saatu yhteyttä");
            });   
        });//promise

        let hs =  new Promise((resolve, reject) => {
            fetch(hs_url).then((response) => {
                response.text().then((dataXML) => {
                    xml2js.parseString(dataXML, (err, dataJSON) => {
                        if (err) {
                            reject("Data ei ole xml-muodossa");
                        } else {
                            dataJSON.rss.channel[0].item.forEach((item) => {
                                let hsObj;
                                if(!item.category[0].includes("virus")&&!item.description[0].includes("orona")&&!item.description[0].includes("rokot")&&!item.description[0].includes("Rokot")
                                &&!item.description[0].includes("artunta")&&!item.description[0].includes("covid")&&!item.title[0].includes("orona")&&!item.title[0].includes("rokot")){
                                    if (item.enclosure === undefined) {
                                        hsObj =  {
                                            "title" : item.title[0],
                                            "content" : item.description[0],
                                            "link" : item.link[0],
                                            "img" : "",
                                            "date" : new Date(item.pubDate[0]),
                                            "datetime" : new Date(item.pubDate[0]).toLocaleString("en-GB"),
                                            "category" : item.category[0]
                                        }
                                    } else {
                                        hsObj =  {
                                            "title" : item.title[0],
                                            "content" : item.description[0],
                                            "link" : item.link[0],
                                            "img" : item.enclosure[0].$.url,
                                            "date" : new Date(item.pubDate[0]),
                                            "datetime" : new Date(item.pubDate[0]).toLocaleString("en-GB"),
                                            "category" : item.category[0]
                                        }
                                    }
                                }
                                news.push(hsObj);
                            });
                            setTimeout(() => {
                                resolve(news)
                            }, 2000)
                        }//else
                    });//parseString
                })//response
            }).catch((err) => {
                reject("Palvelimeen ei saatu yhteyttä");
            });
        });//promise
        
        let il =  new Promise((resolve, reject) => {
            fetch(il_url).then((response) => {
                response.text().then((dataXML) => {
                    xml2js.parseString(dataXML, (err, dataJSON) => {
                        if (err) {          
                            reject("Data ei ole xml-muodossa");
                        } else {
                            dataJSON.rss.channel[0].item.forEach((item) => {
                                let ilObj;
                                if(!item.category[0].includes("virus")&&!item.description[0].includes("orona")&&!item.description[0].includes("rokot")&&!item.description[0].includes("Rokot")
                                &&!item.description[0].includes("artunta")&&!item.description[0].includes("covid")&&!item.title[0].includes("orona")&&!item.title[0].includes("rokot")){
                                    if (item.enclosure === undefined) {
                                        ilObj =  {
                                            "title" : item.title[0],
                                            "content" : item.description[0],
                                            "link" : item.link[0],
                                            "img" : "",
                                            "date" : new Date(item.pubDate[0]),
                                            "datetime" : new Date(item.pubDate[0]).toLocaleString("en-GB"),
                                            "category" : item.category[0]
                                        }
                                    } else {
                                        ilObj =  {
                                            "title" : item.title[0],
                                            "content" : item.description[0],
                                            "link" : item.link[0],
                                            "img" : item.enclosure[0].$.url,
                                            "date" : new Date(item.pubDate[0]),
                                            "datetime" : new Date(item.pubDate[0]).toLocaleString("en-GB"),
                                            "category" : item.category[0]
                                        }
                                    }
                                }
                               news.push(ilObj);
                            });
                            setTimeout(() => {
                                resolve(news)
                            }, 2000)
                        }//else
                    });//parseString
                })//response
            }).catch((err) => {
                reject("Palvelimeen ei saatu yhteyttä");
            });
        });//promise

        let is =  new Promise((resolve, reject) => {
            fetch(is_url).then((response) => {
                response.text().then((dataXML) => {
                    xml2js.parseString(dataXML, (err, dataJSON) => {
                        if (err) {          
                            reject("Data ei ole xml-muodossa");
                        } else {
                            dataJSON.rss.channel[0].item.forEach((item) => {
                                let isObj;
                                if(!item.category[0].includes("virus")&&!item.description[0].includes("orona")&&!item.description[0].includes("rokot")&&!item.description[0].includes("Rokot")
                                &&!item.description[0].includes("artunta")&&!item.description[0].includes("covid")&&!item.title[0].includes("orona")&&!item.title[0].includes("rokot")){
                                    if (item.enclosure === undefined) {
                                        isObj =  {
                                            "title" : item.title[0],
                                            "content" : item.description[0],
                                            "link" : item.link[0],
                                            "img" : "",
                                            "date" : new Date(item.pubDate[0]),
                                            "datetime" : new Date(item.pubDate[0]).toLocaleString("en-GB"),
                                            "category" : item.category[0]
                                        }
                                    } else {
                                        isObj =  {
                                            "title" : item.title[0],
                                            "content" : item.description[0],
                                            "link" : item.link[0],
                                            "img" : item.enclosure[0].$.url,
                                            "date" : new Date(item.pubDate[0]),
                                            "datetime" : new Date(item.pubDate[0]).toLocaleString("en-GB"),
                                            "category" : item.category[0]
                                        }
                                    }
                                }
                               news.push(isObj);
                            });
                            setTimeout(() => {
                                resolve(news)
                            }, 2000)
                        }//else
                    });//parseString
                })//response
            }).catch((err) => {
                reject("Palvelimeen ei saatu yhteyttä");
            });
        });//promise

    const promises = [yle];
    return Promise.all(promises).then(values => {
        return values;
    });
}

module.exports = {
    "getAll" : (callback) => {
        let yle_url = "https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET";
        let hs_url = "https://www.hs.fi/rss/tuoreimmat.xml";
        let il_url = "https://www.iltalehti.fi/rss.xml";
        let is_url = "https://www.is.fi/rss/tuoreimmat.xml";
        getNews(yle_url, hs_url, il_url, is_url).then((response) => {
            console.log(response)
            callback(null, response);
        }).catch((err) => {
            callback(err, null);
        });     
    }
}