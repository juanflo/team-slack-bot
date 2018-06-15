require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const interactiveResponse = require('./interactiveResponse');
const mongoose = require('mongoose');
var request = require('request');
require('./model/SchedulingSession');

const SchedulingSession = mongoose.model('SchedulingSession');
const mongoose_id = process.env.MONGOOSE_USER_ID || '';
const mongoose_password = process.env.MONGOOSE_PASSWORD || '';
const mongoose_url = process.env.MONGOOSE_URL;
const verification_token = process.env.VERIFICATION_TOKEN || '';

const app = express();
const port = process.env.PORT || 3005;

mongoose.connect(`mongodb://${mongoose_id}:${mongoose_password}@${mongoose_url}`);

const API = '/slack';

const CALLBACK_ID = {
    FREQUENCY: 'randy_frequency',
    HOUR: 'randy_details_hour',
    MINUTE: 'randy_details_minute',
    AM_PM: 'randy_details_ampm'
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(API, (req, res) => res.status(200).send('Hello slack!'));

app.post(`${API}/random-facilitator`, (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(200).send(interactiveResponse.getFrequencyMessage());
});

app.post(`${API}/frequency`, (req, res) => {
    const payload = JSON.parse(req.body.payload);
    const callback_id = payload.callback_id;
    const channel_id = payload.channel.id;
    const user_id = payload.user.id;

    switch(callback_id) {
        case 'randy_frequency': _saveScheduling(user_id, channel_id, 'frequency', payload.actions[0].value);
    }

    if (callback_id === CALLBACK_ID.FREQUENCY) {
        if (payload.actions[0].value === 'one-minute'){
            _setupSchedule(user_id, channel_id);
            res.status(200).send('I will now randomly select a user every minute.');
        } else if (payload.actions[0].value === 'daily') {
            res.status(200).send(interactiveResponse.getDailyHourResponse());
        }
    } else {
        res.status(200);
    }
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(err.message);
});

app.listen(port, () => console.log(`bot listening on port ${port}`));

function _saveScheduling(user_id, channel_id, type, typeData) {
    console.log('save scheduling');
    SchedulingSession.findOne({'channel_id': 1234, 'user_id': 123434}, (err, data) => {
        console.log('data search ', data, err);
        let newData = data == null ? new SchedulingSession() : data;

        newData.user_id = user_id;
        newData.channel_id = channel_id;
        newData[type] = typeData;
        newData.save().then((err) => {
            if (err != null) {
                console.log(err);
            }
        });
    });
}

function _setupSchedule(user_id, channel_id, type) {
    SchedulingSession.findOne({'channel_id': 1234, 'user_id': 123434}, (err, data) => {
        if (data) {
            request.get(`https://slack.com/api/channels.info?token=${verification_token}&channel=${channel_id}&include_locale=true`, function (error, response, body) {
                console.log(response);
                console.log(body);
            });
        }
    });
}