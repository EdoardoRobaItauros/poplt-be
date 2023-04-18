const express = require('express')
const client = require("./config/connection.js")
const users = require("./routes/users.js");
const challenges = require("./routes/challenges.js");
const contents = require("./routes/contents.js");
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 8050

app.listen(port, ()=>{
    console.log("Now listening on: ", port)
})
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
});

app.use("/api/users", users);
app.use("/api/challenges", challenges);
app.use("/api/contents", contents);

client.connect()