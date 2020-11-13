const express = require('express');
const app = express();
const port = 3000;

const { Client } = require('elasticsearch');
const bodyParser = require('body-parser');
const client = new Client({ node: 'http://localhost:9200' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1>Learning Elastic API</h1>'); 
})

app.post('/index/init', (req, res) => {

    const result = client.indices.exists({
        index: req.body.index
    }).then((message) => {
        // index 존재하면 true / index 없으면 false
        console.log(message);   
    }).catch((error) => {
        console.log(error);
    })
    res.send(result);   // {}

    // client.indices.create({
    //     index: req.body.index
    // }).then((message) => {
    //     res.send(req.body.index + '생성');
    // }).catch((error) => {
    //     console.log(error);
    // })
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
