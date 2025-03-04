import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
const Manage = () => {
    const[students,setStudents]=useState([])
    const[searchTerm,setSearchTerm]=useState("")
    const navigate=useNavigate()

    useEffect(() =>{
        fetchStudent()
    },[])

    const fetchStudent=async()=>{
       try{
        const res= await axios.get("http://localhost:5000/students")
        setStudents(res.data)
       } catch(error){
        console.error("Error")
       }
    }

    const deleteStudent= async(id)=>{       
            await axios.delete(`http://localhost:5000/students/${id}`)
            fetchStudent()
        
    }

    const filterData=students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.batchYear.toString().includes(searchTerm)
)
  return (
    <div className='flex h-screen bg-gray-900 text-white'>
       <Sidebar/>
       <div className='flex-1 p-6 ml-64'>
        <h2 className='text-xl mb-4'>Manage Students</h2>
       
       <input 
       value={searchTerm}
       onChange={(e)=> setSearchTerm(e.target.value)}
       placeholder="Search by Name,class or batch year.."></input>
      <table className='w-full'>
        <thead>
            <tr className='text-left border-b border-gray-700'>
                <th className='p-2'>Name</th>
                <th className='p-2'>Class</th>
                <th className='p-2'>Batch</th>
                <th className='p-2'>Actions</th>
            </tr>
        </thead>
        <tbody>
            {filterData.length > 0 ? (
                filterData.map((student) =>(
                  <tr key={student._id} className='border-b bprder-gray-700'>
                    <td className='p-2'>{student.name}</td>
                    <td className='p-2'>{student.class}</td>
                    <td className='p-2'>{student.batchYear}</td>
                    <td className='p-2 flex space-x-2'>
                        <button onClick={() => navigate(`/add?id=${student._id}`)}className='text-yellow-500'><FaEdit/></button>
                        <button onClick={()=> deleteStudent(student._id)}className='text-red-500'><FaTrash/></button>
                    </td>
                  </tr>
                ))
            ):(
                <tr>
                    <td>No students found</td>
                </tr>
            )}
        </tbody>
      </table>



       </div>
    </div>
  )
}

export default Manage
