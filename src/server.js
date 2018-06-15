const express = require('express');
const bodyParser = require('body-parser');
// const url = require('url');
// const request = require('request');
const interactiveResponse = require('./interactiveResponse');


const app = express();
const port = process.env.PORT || 3005;

const API = '/slack';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(API, (req, res) => res.status(200).send('Hello slack!'));

app.post(`${API}/random-facilitator`, (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(200).send(interactiveResponse.getFrequencyMessage());
});

app.post(`${API}/frequency`, (req, res) => {
    console.log(req);
    res.status(200).send(interactiveResponse.getDailyResponse());
});

app.post(`${API}/schedule`, (req, res) => {

});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(err.message);
});

app.listen(port, () => console.log(`bot listening on port ${port}`));