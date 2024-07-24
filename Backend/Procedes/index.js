const express = require("express");
var mysql = require('mysql2');
const procedeRouter = require("./routes/procede");


const app = express();
const port = 5000;

const cors = require('cors');
const corsOptions = {
    origin: "http://localhost:2000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  };
app.use(cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/procede", procedeRouter); //Calls the routes


app.listen(port, () => {
  console.log("Express server listening on port : " + port);
});