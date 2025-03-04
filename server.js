const express= require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bodyParser=require("body-parser")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const app=express()

app.use(cors())
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/stu3",{
 useNewUrlParser:true,
 useUnifiedTopology:true
})
.then(()=> console.log("Connected"))
.catch((err)=> console.log(err))

const studentSchema=new mongoose.Schema({
    name:String,
    class:String,
    gender:String,
    batchYear:Number
})

const Student= mongoose.model("Student",studentSchema)

app.post("/student",async(req,res) =>{
    const{name,class:studentClass,batchYear,gender}=req.body;
    const newStudent= new Student({name,class:studentClass,batchYear,gender})
    await newStudent.save()
    res.json(newStudent)
})

app.get("/students",async(req,res)=>{
    try{
        const students= await Student.find()
        res.json(students)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

app.get("/students/:id",async(req,res) =>{
    try{
        const student= await Student.findById(req.params.id)
        if(!student) return res.status(404).json({message:"Student not found"})
            res.json(student)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

app.delete("/students/:id",async(req,res)=>{
    try{
        await Student.findByIdAndDelete(req.params.id);
        res.json({message:"Student deleted"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

const AdminSchema= new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})
const Admin=mongoose.model("Admin",AdminSchema)

app.post("/login",async(req,res) =>{
    const {username,password}=req.body;
    try{
        const admin= await Admin.findOne({username})
        if(!admin) return res.status(404).json({message:"Admin not found"})

            const isMatch= await bcrypt.compare(password,admin.password)
            if(!isMatch) return res.status(400).json({message:"Invalid credentials"})

                const token=jwt.sign({id:admin._id},"SECRET_KEY",{expiresIn:"1h"})
                console.log(token)
                res.json({token})
    }catch(error){
        res.status(500).json({message:error.message})
    }
})






const PORT=5000;
app.listen(PORT,() => console.log("Server running"))