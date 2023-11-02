import React, { userEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Dashboard from './views/Dashboard'
// import Project from './views/Project'

function App() {
  return (
    <main className='flex'>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          {/* <Route path='/project' element={<Project />} /> */}
        </Routes>
      </Router>
    </main>
  )
}

export default App;
