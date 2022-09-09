const mongoose = require("mongoose");
const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const UserRouter = require("./routes/User");



dotenv.config();


mongoose.connect(process.env.MONGO)
.then(() => console.log(`DATABASE CONNECTED`))
.catch((error) => console.log(error));

app.use(express.json());
app.use(cors());


app.use(UserRouter)

const PORT = process.env.PORT;

app.listen(PORT,() => {
  console.log(`PORT AT ${PORT}`);
})