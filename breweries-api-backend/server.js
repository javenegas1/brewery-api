require("dotenv").config();
require('./config/db.connection')

const express = require("express");
const cors = require("cors")
const morgan = require("morgan")

const userController = require('./controllers/auth-controller')

const app = express();

app.use(express.json()); 
app.use(cors()); 
app.use(morgan("dev")); 

app.use('/auth', userController)


app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(4000, () => console.log(`listening on PORT ${PORT}`));