import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const[username,setUsername]=useState("")
    const[password,setPassword]=useState("")
    const[error,setError]=useState("")
    const navigate=useNavigate()

    const handleLogin=async(e)=>{
        e.preventDefault();
      try{
        const res=await axios.post("http://localhost:5000/login",{username,password})
        if(res.data.token){
            localStorage.setItem("token",res.data.token);
           
            navigate("/dash")
        }else{
            setError("Invalid Credentials")
        }
      }catch(err){
        setError("Invalid username or password")
      }
    }
  return (
    <div className='flex items-center justify-center h-screen bg-gray-900 text-white'>
      <div className='bg-gray-800 p-8 rounded shadow-lg w-96'>
        <h2 className='text-2xl mb-4 text-center'>Admin Login</h2>
       <form onSubmit={handleLogin}>
        <input type="text"placeholder="Username" className='w-full p-2 mb-3 bg-gray-700 text-white rounded' value={username} onChange={(e)=> setUsername(e.target.value)}></input>
        <input type="password" placeholder="Password" className='w-full p-2 mb-3 bg-gray-700 text-white rounded' value={password} onChange={(e)=> setPassword(e.target.value)}></input>
       <button type="submit" className='w-full p-2 bg-blue-500 rounded'>Login</button>
       </form>
       
        </div>      
    </div>
  )
}

export default Login
