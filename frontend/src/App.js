import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Visitor from './components/visitor/Visitor';
import Admin from './components/admin/Admin';
import Edit from './components/admin/Edit';
import Fourohfour from './components/fourohfour/Fourohfour';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Visitor />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/visitor/edit/:id' element={<Edit />} />
          <Route path='*' exact={true} element={<Fourohfour />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
