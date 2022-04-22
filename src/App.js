import React from 'react';
import { Login, Home, Detail } from './components'
import { Routes, Route } from 'react-router-dom'
import 'animate.css';

function App() {

  return (
    <div className='container mt-3'>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='detail' element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
