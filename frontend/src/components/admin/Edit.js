import '../../App.css';
import React from 'react';
import Edits from './Edits';
import Login from '../../components/login/Login';
import useToken from '../../components/app/useToken';

export default function Edit() {
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Editera</h1>
        <Edits />
      </header>
    </div>
  );
}