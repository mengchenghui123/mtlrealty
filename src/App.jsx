import React from 'react'
import {Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Rent from './pages/Rent';
import Contact from './pages/Contact'


function App() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rent' element={<Rent />} />
        <Route path = 'contact' element={<Contact />} />
    </Routes>
  );
}

export default App;
