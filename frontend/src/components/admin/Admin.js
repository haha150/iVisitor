import '../../App.css';
import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Visitors from './Visitors';

export default function Admin() {
    return (
      <div className="App">
        <header className="App-header2">
          <h1>Admin</h1>
          <Tabs
            defaultActiveKey="visitors"
            id="visitors"
            className="mb-3">
            <Tab eventKey="visitors" title="Besökare">
              <Visitors />
            </Tab>
          </Tabs>
        </header>
      </div>
    );
}
