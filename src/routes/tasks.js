const express=require('express')
const router=express.Router();
const Task=require('../models/Task')

// get all
router.get('/',async (req,res)=>{
    try{

        const tasks=await Task.find()
        res.json(tasks)

    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get('/:id',getTask,(req,res)=>{
    res.send(res.task)
})

// update
router.patch('/:id',getTask,async (req,res)=>{
    if(req.body.taskName!=null){
        res.task.taskName=req.body.taskName;
    }
    if(req.body.taskDate!=null){
        res.task.taskDate=req.body.taskDate;
    }
    if(req.body.taskTime!=null){
        res.task.taskTime=req.body.taskTime;
    }

    try{
        const updatedTask=await res.task.save();
        res.json(updatedTask)
    }catch(err){
res.status(400).json({message:err.message})
    }
})

// creating

router.post('/',async(req,res)=>{
    
    const task=new Task({
        taskName:req.body.taskName,
        taskDate:req.body.taskDate,
        taskTime:req.body.taskTime
    })

    
    try{
        const newTask=await task.save();
        res.status(201).json(newTask);
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

// delete 

router.delete('/:id',getTask,async (req,res)=>{
    try{
        await res.task.remove()
        res.json({message:'Deleted task'})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})


async function getTask(req,res,next){
    let task;
    // console.log(req.params.id)
    try{
        task=await Task.findById(req.params.id)
        if(task==null){
            return res.status(404).json({message:'Cannot find task'})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    res.task=task;
    next()
}

module.exports=router;