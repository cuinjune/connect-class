const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const datastore = require("nedb");
const db = new datastore({ filename: "database.json", autoload: true });

// handle data in a nice way
const urlEncodedBodyParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

app.use(urlEncodedBodyParser);
app.use(express.static("public"));

app.get("/chatdata", (req, res) => {
    db.find({}, (err, docs) => {
        res.send(docs);
    });
});

app.post("/chatdata", (req, res) => {
    const data = {
        name: req.body.name,
        message: req.body.message
    };
    db.insert(data, (err, newDoc) => {
        db.find({}, (err, docs) => {
            res.send(docs);
        });
    });
});

app.listen(83, () => {
    console.log("Listening to port 83");
});