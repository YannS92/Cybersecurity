const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const cors = require('cors');
const corsOptions = {
    origin: "http://localhost:8081",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  };
app.use(cors(corsOptions));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

require('dotenv').config();


require('./routes/auth')(app);
//require('./routes/authUser')(app);

const PORT = process.env.PORT || 2000;


const procedeRouter = require('./routes/procede');
const freezbeRouter = require('./routes/freezbe');
const ingredientRouter = require('./routes/ingredient');

app.use('/freezbe', freezbeRouter);
app.use('/ingredient', ingredientRouter);
app.use('/procede', procedeRouter);


app.listen(PORT, () => {
    console.log(`API is running on ${PORT}`);
});
