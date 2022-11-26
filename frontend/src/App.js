import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Visitor from './components/visitor/Visitor';
import Admin from './components/admin/Admin';
import Edit from './components/admin/Edit';
import useToken from './components/app/useToken';
import Fourohfour from './components/fourohfour/Fourohfour';

//https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications#prerequisites
function App() {
  const { token, setToken } = useToken();
  // if(!token) {
  //   return <Login setToken={setToken}/>
  // }
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
