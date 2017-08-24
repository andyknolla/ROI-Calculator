import React, { Component } from 'react';
import Table from './components/revenue_table';

import './App.css';

const List = [
  {
    id: 1,
    description: 'item one',
    one_time: 100,
    monthly: 50
  },
  {
    id: 2,
    description: 'item two',
    one_time: 200,
    monthly: 80
  },
  {
    id: 3,
    description: 'item three',
    one_time: 300,
    monthly: 25
  }
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>ROI Calculator</h2>
        </div>
        <p className="App-intro"></p>
        <Table items={List} />
      </div>
    );
  }
}

export default App;
