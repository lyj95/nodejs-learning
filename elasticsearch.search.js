'use strict';

const express = require('express');
const app = express();
const port = 3000;

const { Client } = require('elasticsearch');
const bodyParser = require('body-parser');
const client = new Client({ node: 'http://localhost:9200' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let querySet = {index : 'temp08'};

const result = client.search({
    index: 'temp08',
    body: {
        "query": {
            "bool": {
                "must": [
                    {
                        "query_string": {
                            "fields": ['TITLE.kobrick'],
                            "query": '시사교양'
                        }
                    }
                ]
            }
        }
    }, 
}, (err, result) => {
    if (err) console.log(err)
})




app.get('/', (req, res) => {
    res.send('<h1>HiHiHi</h1>'); 
})

app.get('/search/title', (req, res) => {

    result.then((message) => {
        // console.log(message.hits.hits);
        res.send(JSON.stringify(message));  
    })
    .catch((error) => {
        console.log(error);
    }) 
})

// post parameter 받아오기 -> bady-parser를 이용해 데이터를 json으로 받아옴
app.post('/search/query', (req, res) => {

    querySet.body = {
        "query": {
            "bool": {
                "must": [
                    {
                        "query_string": {
                            "fields": ["TITLE.kobrick", "EDT_KEYWORD_LINE01", "EDT_KEYWORD_LINE02",
                                        "EDT_TXT_LINE01",
                                        "EDT_TXT_LINE02",
                                        "SUBTITLE"],
                            "query": req.body.query
                        }
                    }
                ]
            }
        }
    }
    
    let search = client.search(querySet);
    search.then((message) => {
        
        const hits = message.hits.hits;
        console.log(hits);

        if(hits[0] == null){
            res.send('검색 결과가 없습니다.');
        }else{
            let result = '------ ' + req.body.query + '(으)로 검색한 결과 ------ <br/>';
    
            for(let i = 0; i < hits.length; i++){
                
                const sources = hits[i]._source;
    
                result += '<div>'+(i+1)+'번째 결과<br/>';
                result += '<br/>VIDEO_ID : ' + sources.VIDEO_ID;
                result += '<br/>SECTION_ID : ' + sources.SECTION_ID;
                result += '<br/>TITLE :' + sources.TITLE;
                result += '<br/>SUBTITLE : ' + sources.SUBTITLE;
                result += '<br/>EDT_TXT_LINE01 : ' + sources.EDT_TXT_LINE01;
                result += '<br/>EDT_TXT_LINE02 : ' + sources.EDT_TXT_LINE02;
                result += '<br/>EDT_KEYWORD_LINE01 : ' + sources.EDT_KEYWORD_LINE01;
                result += '<br/>EDT_KEYWORD_LINE02 : ' + sources.EDT_KEYWORD_LINE02;
                result += '<br/>START_FRAME_INDEX : ' + sources.START_FRAME_INDEX;
                result += '<br/>END_FRAME_INDEX : ' + sources.END_FRAME_INDEX;
                result += '<br/>REG_DATE : ' + sources.REG_DATE;
                result += '<br/><br/></div>';
            
            }
    
            res.send(result);  
        }
    })
    .catch((error) => {
        console.log(error);
    }) 

})


// get paramter 받아오기 : /search/[param] -> req.params.[param]
app.get('/search/:field/:query', (req, res) => {
    querySet.body = {
        "query": {
            "bool": {
                "must": [
                    {
                        "query_string": {
                            "fields": [req.params.field],
                            "query": req.params.query
                        }
                    }
                ]
            }
        }
    }
    
    let search = client.search(querySet);
    search.then((message) => {
        
        const hits = message.hits.hits;
        console.log(hits);

        // if(hits == null) -> false ?? why?
        if(hits[0] == null){
            res.send('검색 결과가 없습니다.');
        }else{
            let result = '------ ' + req.params.query + '(으)로 검색한 결과 ------ <br/>';
    
            for(let i = 0; i < hits.length; i++){
                
                const sources = hits[i]._source;
    
                result += '<div>'+(i+1)+'번째 결과<br/>';
                result += '<br/>VIDEO_ID : ' + sources.VIDEO_ID;
                result += '<br/>SECTION_ID : ' + sources.SECTION_ID;
                result += '<br/>TITLE :' + sources.TITLE;
                result += '<br/>SUBTITLE : ' + sources.SUBTITLE;
                result += '<br/>EDT_TXT_LINE01 : ' + sources.EDT_TXT_LINE01;
                result += '<br/>EDT_TXT_LINE02 : ' + sources.EDT_TXT_LINE02;
                result += '<br/>EDT_KEYWORD_LINE01 : ' + sources.EDT_KEYWORD_LINE01;
                result += '<br/>EDT_KEYWORD_LINE02 : ' + sources.EDT_KEYWORD_LINE02;
                result += '<br/>START_FRAME_INDEX : ' + sources.START_FRAME_INDEX;
                result += '<br/>END_FRAME_INDEX : ' + sources.END_FRAME_INDEX;
                result += '<br/>REG_DATE : ' + sources.REG_DATE;
                result += '<br/><br/></div>';
            
            }
            res.send(result);  
        }

    })
    .catch((error) => {
        console.log(error);
    }) 
})
    
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

client.ping({
    requestTimeout: 1000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
})





