require('dotenv').config()
const express = require("express");
const connectDB = require("./src/backend/connection");
const cors=require('cors')

const app = express();

const PORT = process.env.PORT || 3002;

connectDB();

app.use(express.json())
app.use(cors())

const taskRouter=require('./src/routes/tasks')

app.use('/tasks',taskRouter);

app.listen(PORT, () => { 
  console.log(`Server listening on ${PORT}`);
});

