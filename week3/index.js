const datastore = require("nedb");
const db = new datastore({ filename: "database.json", autoload: true });

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    const dataToSave = {
        text: req.body.data,
        color: req.body.color,
        longtext: req.body.longtext
    }

    db.insert(dataToSave, (err, newDoc) => {
        db.find({}, (err, docs) => {
            const dataWrapper = { data: docs };
            res.render("outputtemplate.ejs", dataWrapper);
        });
    });
});

app.get("/displayrecord", (req, res) => {
    db.find({ _id: req.query._id }, (err, docs) => {
        const dataWrapper = { data: docs[0] };
        res.render("individual.ejs", dataWrapper);
    });
});

app.get("/search", (req, res) => {
    const query = new RegExp(req.query.q, "i");
    db.find({ text: query }, (err, docs) => {
        const dataWrapper = { data: docs };
        res.render("outputtemplate.ejs", dataWrapper);
    });
});

app.post("/formdata", function (req, res) {
    const dataToSave = {
        text: req.body.data,
        color: req.body.color,
        longtext: req.body.longtext
    }

    db.insert(dataToSave, (err, newDoc) => {
        db.find({}, (err, docs) => {
            const dataWrapper = { data: docs };
            res.render("outputtemplate.ejs", dataWrapper);
        });
    });
});

app.listen(4082, () => {
    console.log("Server listening on port 4082");
})