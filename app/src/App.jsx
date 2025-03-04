import { useState } from 'react'

import Add from './Add'
import Manage from './Manage'
import Dashboard from './Dashboard'
import Login from './Login'
import PR from './PR'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          

        <Route element={<PR/>}>
          <Route path="/dash" element={<Dashboard/>}></Route>
         </Route>

          <Route path="/add" element={<Add/>}></Route>
          <Route path="/manage" element={<Manage/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
