import { CheckCircle, Circle, Edit, Moon, Sun, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
 
function App() {
   const[darkMode,setDarkMode]=useState(true)
   const[text,setText]=useState("")
   const[todos,setTodos]=useState([])
   const[editing,setEditing]=useState(null)

   useEffect(() =>{
    axios.get("http://localhost:5000/todos").then((res) => setTodos(res.data))
   },[])

   const addTodo=() =>{
     if(!text) return;
     const newTodo={text,completed:false};
     axios.post("http://localhost:5000/todos",newTodo).then((res) =>{
    setTodos([...todos,res.data])
    setText("")
     })
   }

   const toggleC=(id,completed) =>{
    axios.put(`http://localhost:5000/todos/${id}`,{completed:!completed}).then((res) =>{
      setTodos(todos.map((todo) =>(todo._id === id ? res.data : todo)))
    })
   }

   const updateTodo=(id,updatedText)=>{
    axios.put(`http://localhost:5000/todos/${id}`,{text:updatedText}).then((res) =>{
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)))
      setEditing(null)
    })
   }

   const delteTodo=(id)=>{
    axios.delete(`http://localhost:5000/todos/${id}`).then(() =>{
      setTodos(todos.filter((todo) => todo._id !== id))
      
    })
   }
  return (
    <>
      <div className={`min-h-screen flex items-center justify-center transition-colors ${darkMode ? "bg-gray-900" :"bg-white"}`}>
        <div className={`w-full max-w-md p-5 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className='flex justify-between items-center mb-5'>
            <h1 className='text-2xl font-bold'>Todo-List</h1>
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun/> :<Moon/>}
              </button>
          </div>
          <div className='flex gap-2 mb-5'>
            <input 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`flex-1 p-2 border rounded-lg ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-200 border-gray-400"}`}></input>
           <button 
           onClick={ editing ? () => updateTodo(editing,text) :addTodo}
           className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg'>
           {editing ? "Update" :"Add"} 
            </button>
          </div>
          <ul className='space-y-2'>
            {todos.map((todo) => (
            <li key={todo._id} className={`flex justify-between items-center p-3 rounded-lg ${darkMode ? "bg-gray-700" :"bg-gray-200"}`}>
              <div className='flex items-center gap-2'>
                <button onClick={() => toggleC(todo._id,todo.completed)}>
                  {todo.completed ? <CheckCircle className='text-green-400'/>: <Circle className='text-gray-400'/>}
                  </button>
                <span className={`${todo.completed ? "line-through text-gray-500" :""}`}>{todo.text}</span>
              </div>
              <div className='flex gap-2'>
                <button onClick={() => setEditing(todo._id) || setText(todo.text)}><Edit className='text-yellow-400'/></button>
                <button onClick={() =>delteTodo(todo._id)}><Trash2 className='text-red-500'/></button>
              </div>
            </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
