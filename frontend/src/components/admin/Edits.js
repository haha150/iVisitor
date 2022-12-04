import '../../App.css';
import React from 'react';
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitor: {
        first_name: '',
        last_name: '',
        company: '',
        date: ''
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let { id } = this.props.params;
    fetch('http://localhost:5000/api/get/' + id)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ visitor: data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:5000/api/update/' + this.state.visitor.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.visitor)
    })
      .then((res) => res.status)
      .then((data) => {
        if (data === 200) {
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  render() {
    const { visitor } = this.state;
    return (
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Namn</Form.Label>
              <Form.Control type="text" placeholder="Förnamn" value={visitor.first_name} onChange={e => {
                this.setState(prevState => {
                  let visitor = Object.assign({}, prevState.visitor);
                  visitor.first_name = e.target.value;
                  return { visitor };
                })
              }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLast" >
              <Form.Label>Efternamn</Form.Label>
              <Form.Control type="text" placeholder="Efternamn" value={visitor.last_name} onChange={e => {
                this.setState(prevState => {
                  let visitor = Object.assign({}, prevState.visitor);
                  visitor.last_name = e.target.value;
                  return { visitor };
                })
              }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCompany">
              <Form.Label>Företag</Form.Label>
              <Form.Control type="text" placeholder="Företag" value={visitor.company} onChange={e => {
                this.setState(prevState => {
                  let visitor = Object.assign({}, prevState.visitor);
                  visitor.company = e.target.value;
                  return { visitor };
                })
              }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Datum</Form.Label>
              <Form.Control type="date" placeholder="Datum" value={visitor.date} onChange={e => {
                this.setState(prevState => {
                  let visitor = Object.assign({}, prevState.visitor);
                  visitor.date = e.target.value;
                  return { visitor };
                })
              }} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Uppdatera
            </Button>
          </Form>
    );
  }
}

export default withParams(Edit);