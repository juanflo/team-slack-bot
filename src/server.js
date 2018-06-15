require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const url = require('url');
// const request = require('request');
const interactiveResponse = require('./interactiveResponse');
const mongoose = require('mongoose');
require('./model/SchedulingSession');
const SchedulingSession = mongoose.model('SchedulingSession');
const mongoose_id = process.env.MONGOOSE_USER_ID || '';
const mongoose_password = process.env.MONGOOSE_PASSWORD || '';
const mongoose_url = process.env.MONGOOSE_URL;

const app = express();
const port = process.env.PORT || 3005;
console.log(`mongodb://${mongoose_id}:${mongoose_password}@${mongoose_url}`);
mongoose.connect(`mongodb://${mongoose_id}:${mongoose_password}@${mongoose_url}`);

const API = '/slack';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(API, (req, res) => res.status(200).send('Hello slack!'));

app.post(`${API}/random-facilitator`, (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(200).send(interactiveResponse.getFrequencyMessage());
});

app.post(`${API}/frequency`, (req, res) => {
    // SchedulingSession.findOne({'channel_id': 1234, 'user_id': 123434}, (err, data) => {

    // });
    console.log(req.payload);
    res.send(interactiveResponse.getDailyTimeResponse());
});

app.post(`${API}/schedule`, (req, res) => {

});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(err.message);
});

app.listen(port, () => console.log(`bot listening on port ${port}`));