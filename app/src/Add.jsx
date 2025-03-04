import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useNavigate,useSearchParams } from 'react-router-dom'
import axios from 'axios'
const Add = () => {
    const[studentData,setStudentData]=useState({name:"",class:"",batchYear:"",gender:""})
    const navigate=useNavigate();
    const[searchParams,setSearchParams]=useSearchParams()
    const studentId= searchParams.get("id")
    useEffect(() =>{
      if(studentId){
        fetchStudentData(studentId)
      }
    },[studentId])

    const fetchStudentData=async(id)=>{
      try{
        const res= await axios.get(`http://localhost:5000/students/${id}`)
        setStudentData(res.data)
      }catch(error){
        console.log(error)
      }
    }
    

    const handleSubmit=async(e)=>{
        e.preventDefault()
        await axios.post("http://localhost:5000/student",studentData);
        navigate("/manage")
    }
  return (
    <div className='flex h-screen bg-gray-900 text-white'>
       <Sidebar/>
       <div className='flex-1 p-6 ml-64'>
        <h2 className='text-lg mb-4'>{studentId ? "Edit Student" :"Add Students"}</h2>
       
       <form  onSubmit={handleSubmit}className='space-y-3'>
        <input 
        value={studentData.name} 
        onChange={(e)=> setStudentData({...studentData,name:e.target.value})}
       
        placeholder="Name" className='w-full p-2 rounded bg-gray-700 text-white' required></input>
        <input
        value={studentData.class} 
        onChange={(e)=> setStudentData({...studentData,class:e.target.value})}
        placeholder="Class" className='w-full p-2 rounded bg-gray-700 text-white' required></input>
       
        <input 
        value={studentData.batchYear} 
        onChange={(e)=> setStudentData({...studentData,batchYear:e.target.value})}
       
        placeholder="Batch Year" className='w-full p-2 rounded bg-gray-700 text-white' required></input>
        <select value={studentData.gender}
        onChange={(e)=> setStudentData({...studentData,gender:e.target.value})}
        className='w-full p-2 rounded bg-gray-700 text-white'>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>

        <button type="submit" className='bg-blue-500 p-2 rounded '>{studentId ? "Update Student":"Add Student"}</button>
       </form>
      
      
       </div>
    </div>
  )
}

export default Add
