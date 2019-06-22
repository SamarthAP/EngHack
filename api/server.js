//jshint esversion:6

const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const lib = require('lib');
const sms = lib.utils.sms['@1.0.11'];

const routes = require("./routes/routes");

app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', routes);

let port = 1111;

app.listen(port, () => {
    console.log('Server running on port ' + port);
});
