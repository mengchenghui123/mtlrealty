import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Rent from './pages/Rent';


function App() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rent' element={<Rent />} />
    </Routes>
  );
}

export default App;
