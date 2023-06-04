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

if(process.env.NODE_ENV=="production"){
  app.use(express.static('./build'))
  const path=require('path')
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'build','index.html'))
  })
}

app.listen(PORT, () => { 
  console.log(`Server listening on ${PORT}`);
});

