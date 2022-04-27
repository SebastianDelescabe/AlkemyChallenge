import React from 'react';
import { Login, Home, Detail, Results } from './components'
import { Routes, Route } from 'react-router-dom'
import 'animate.css';

function App() {

  return (
    <div className='container mt-3'>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/detail' element={<Detail />} />
        <Route path='/results' element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
