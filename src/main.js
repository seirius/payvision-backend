const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

const { getTransactions } = require("./transactions-route");

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "d24343ef-667e-49d2-9e9e-d5620964d324",
    name: "PayvisionChallengeSession",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30 //30 days
    }
}));

app.get("/transactions", getTransactions);

app.use('/', express.static(path.join(__dirname, "..", "web-dist")));
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "web-dist", "index.html"));
});

app.listen(port, () => console.log(`PayvisionBackendServer is running at ${port}`));