const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// handle data in a nice way
const urlEncodedBodyParser = bodyParser.urlencoded({extended: true});
app.use(bodyParser.json());

const chatdata = [];

app.use(urlEncodedBodyParser);
app.use(express.static("public"));

app.get("/chatdata", (req, res) => {
    res.send(chatdata);
});

app.post("/chatdata", (req, res) => {
    const data = {
        text: req.body.text
    };
    chatdata.push(data);
    res.send(chatdata);
});

app.listen(81, () => {
    console.log("Listening to port 81");
});