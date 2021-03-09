const https = require("https");
const fs = require("fs");

const credentials = {
  key: fs.readFileSync("privkey.pem"),
  cert: fs.readFileSync("fullchain.pem")
};

const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!!!");
});

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(4084, () => {
    console.log("Listening on port 4084");
});