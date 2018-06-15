const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const request = require('request');


const app = express();
const port = process.env.PORT || 3005;

const API = '/slack';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(API, (req, res) => res.status(200).send('Hello slack!'));

app.post(`${API}/random-facilitator`, (req, res) => {
    console.log(req);
    res.set('Content-Type', 'application/json');
    res.status(200).send(getFrequencyMessage());
});

app.post(`${API}/schedule`, (req, res) => {

});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(err.message);
});

function getFrequencyMessage() {
    return {
        'text': 'Lets schedule a facilitator!',
        'attachments': [
            {
                'text': 'How frequent do you want to me to choose someone?',
                'fallback': 'You are unable to schedule a facilitator',
                'callback_id': 'wopr_game',
                'color': '#3AA3E3',
                'attachment_type': 'default',
                'actions': [
                    {
                        'name': 'frequncy',
                        'text': '1 minute',
                        'type': 'button',
                        'value': 'one-minute'
                    },
                    {
                        'name': 'frequncy',
                        'text': 'Daily',
                        'type': 'button',
                        'value': 'daily'
                    },
                    {
                        'name': 'frequncy',
                        'text': 'Weekly',
                        'type': 'button',
                        'value': 'weekly'
                    },
                                    {
                        'name': 'frequncy',
                        'text': 'Cancel',
                        'type': 'button',
                        'value': 'cancel',
                        'style': 'danger'
                    }
                ]
            }
        ]
    };
}

app.listen(port, () => console.log(`bot listening on port ${port}`));