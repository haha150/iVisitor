import logo from '../../logo.svg';
import '../../App.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Visitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      company: '',
      date: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Namn</Form.Label>
              <Form.Control type="text" placeholder="Förnamn" value={this.state.first_name} onChange={e => { this.setState({ first_name: e.target.value }) }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLast" >
              <Form.Label>Efternamn</Form.Label>
              <Form.Control type="text" placeholder="Efternamn" value={this.state.last_name} onChange={e => { this.setState({ last_name: e.target.value }) }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCompany">
              <Form.Label>Företag</Form.Label>
              <Form.Control type="text" placeholder="Företag" value={this.state.company} onChange={e => { this.setState({ company: e.target.value }) }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Datum</Form.Label>
              <Form.Control type="date" placeholder="Datum" value={this.state.date} onChange={e => { this.setState({ date: e.target.value }) }} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Anmäl
            </Button>
          </Form>
        </header>
      </div>
    );
  }
}

export default Visitor;