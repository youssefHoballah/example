const express = require("express");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const auth = require("./authMiddleware");
const jsonServer = require("json-server");
const router = jsonServer.router("serverdata.json");
const history = require("connect-history-api-fallback");
const enableHttps = true;
const ssloptions = {};
const cors = require('cors');

if (enableHttps) {
    ssloptions.cert = fs.readFileSync(path.join(__dirname, "cert", "cert.pem"));
    ssloptions.key = fs.readFileSync(path.join(__dirname, "cert", "key.pem"));
}
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(auth);
app.use("/api", router);
app.use(history());

app.use("/", express.static("./dist/example"));

app.listen(80, () => {
    console.log("HTTP Server runnign on port 80")
});

if (enableHttps) {
    https.createServer(ssloptions, app).listen(443, () => {
        console.log("HTTPS server running on port 443")
    });
}
else {
    console.log("HTTPS disabled");
}