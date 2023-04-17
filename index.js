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

app.use("/users", users);
app.use("/challenges", challenges);
app.use("/contents", contents);

client.connect()