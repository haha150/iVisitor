import logo from '../../logo.svg';
import '../../App.css';
import React from 'react';
import { useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Edit extends React.Component {
  componentDidMount() {
    let { id } = this.props.params;
    this.setState({ id: id });
  }
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      name: '',
      last: '',
      company: '',
      date: ''
    };
    console.log(props);
    console.log(this.state);
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
          <h1>Edit</h1>
        </header>
      </div>
    );
  }
}

export default withParams(Edit);