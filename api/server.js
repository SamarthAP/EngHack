const express = require("express")
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require("./routes/routes");

app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})) // Check what urlencoded does
app.use('/api', routes)

let port = 1111;

app.listen(port, () => {
    console.log('Server running on port ' + port);
})