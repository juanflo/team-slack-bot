const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3005;

app.use(bodyParser.json());
app.get('/', (req, res) => res.status(200).send('Hello slack!'));

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(err.message);
});

app.listen(port, () => console.log(`bot listening on port ${port}`));