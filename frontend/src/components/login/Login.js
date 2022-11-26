import logo from '../../logo.svg';
import '../../App.css';
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login({ setToken }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = async e => {
      e.preventDefault();
      const token = {
        username,
        password
      };
      setToken(token);
    }
 
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username: </Form.Label>
            <Form.Control type="text" placeholder="Username" onChange={e => {setUsername(e.target.value)}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword" >
            <Form.Label>Password: </Form.Label>
            <Form.Control type="text" placeholder="Password" onChange={e => {setPassword(e.target.value)}}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </header>
    </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};
