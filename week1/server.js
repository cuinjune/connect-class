const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Hello, thank you for connecting!");
});

app.listen(4080, () => {
    console.log("Listening to port 4080");
});