const mongoose=require('mongoose')

const task=new mongoose.Schema({
    taskName:{
        type:String,
        required:true
    },
    taskDate:{
        type:String,
        required:true
    },
    taskTime:{
        type:String,
        required:true
    }

})

const Task=mongoose.model('Task',task)
module.exports=Task