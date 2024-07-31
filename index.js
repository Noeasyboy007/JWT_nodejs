const express = require("express");

const dotenv = require("dotenv");

const colors = require("colors");

const bcrypt = require("bcrypt");

const db = require("./config/db");

const router = require("./routes/userRoute");

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use("/api/users", router);

app.listen(PORT,async()=>{console.log(`Server Started ap PORT ${PORT}`.bgBlue);
    await db();
})


