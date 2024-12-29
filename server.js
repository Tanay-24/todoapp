const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
//middleware to parse json bodies
app.use(bodyParser.json());

//connect to mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/todoapp", { useNewUrlParser: true, useUnifiedTopology: true });
const taskSchema = new mongoose.Schema({
    name:String,
    completed:{type:Boolean,default:false},
});
const Task = mongoose.model("Task",taskSchema)

//API route
app.post("/tasks",async(req,res)=>{
    const task = new Task(req.body);
    try{
        await task.save();
        res.status(201).send(task);
    }catch(err){
        res.status(400).send(err);
    }
});
app.get("/tasks",async(req,res)=>{
    try{
       const tasks = await Task.find();
        res.status(200).send(tasks);
    }catch(err){
        res.status(500).send(err);
    }
});
app.put("/tasks/:id",async(req,res)=>{
    try{
        const task = await task.Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(task);
    }catch(err){
        res.status(400).send(err);
    }
});
app.delete("/tasks/:id", async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: "Task deleted" });
    } catch (err) {
      res.status(400).send(err);
    }
  });

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });

