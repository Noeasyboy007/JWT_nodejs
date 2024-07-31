const express = require("express");

const dotenv = require("dotenv");

const colors = require("colors");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT,async()=>{console.log(`Server Started ap PORT ${PORT}`.bgBlue);})


