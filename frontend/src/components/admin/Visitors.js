import '../../App.css';
import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';





class Visitors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitors: []
    };
    this.del = this.del.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/list')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ visitors: data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  del(id) {
    fetch('http://localhost:5000/api/delete/' + id, {
      method: 'POST'
    })
      .then((res) => res.status)
      .then((data) => {
        console.log(data);
        if (data === 200) {
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  update(id) {
    window.location.href = '/admin/visitor/edit/' + id;
  };

  render() {
    const { visitors } = this.state;
    const del = this.del;
    const update = this.update;
    var vs = visitors.map(function (v) {
      return (
        <tr key={v.id}>
          <td>{v.id}</td>
          <td>{v.first_name}</td>
          <td>{v.last_name}</td>
          <td>{v.company}</td>
          <td>{v.date}</td>
          <td>
            <Button variant="warning" onClick={() => update(v.id)}>Editera</Button>
            {' '}
            <Button variant="danger" onClick={() => del(v.id)}>Ta bort</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App">
        <header className="App-header">
          <Table striped bordered hover size="sm" variant="light">
            <thead>
              <tr>
                <th>id</th>
                <th>Namn</th>
                <th>Efternamn</th>
                <th>Företag</th>
                <th>Datum</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vs}
            </tbody>
          </Table>
        </header>
      </div>
    );
  }
}

export default Visitors;