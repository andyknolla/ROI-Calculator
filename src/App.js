import React, { Component } from 'react';
import Table from './components/revenue_table';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>ROI Calculator</h2>
        </div>
        <p className="App-intro"></p>
        <Table />
        {/* <ItemInput items={List} /> */}
      </div>
    );
  }
}

export default App;
