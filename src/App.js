import React, { Component } from 'react';
import Table from './components/revenue_table';

import './App.css';

const List = [
  {
    description: 'item one',
    revenue_one_time: '100',
    revenue_monthly: '50'
  },
  {
    description: 'item two',
    revenue_one_time: '10',
    revenue_monthly: '80'
  },
  {
    description: 'item three',
    revenue_one_time: '300',
    revenue_monthly: '25'
  }
]


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revenue_items: List,
      expense_items: [],
      description: '',
      revenue_one_time: '0',
      revenue_monthly: '0'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(itemIndex) {
    let newArray = this.state.revenue_items;
    newArray.splice(itemIndex, 1)  ;
    this.setState({
      revenue_items: newArray
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let newArray = this.state.revenue_items;
    let newItem = {
      description: this.state.description,
      revenue_one_time: this.state.revenue_one_time,
      revenue_monthly: this.state.revenue_monthly
    }
    newArray.push(newItem);
    this.setState({
      revenue_items: newArray,
      description: '',
      revenue_one_time: '0',
      revenue_monthly: '0'
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>ROI Calculator</h2>
        </div>
        <p className="App-intro"></p>
        <Table items={this.state.revenue_items} removeItem={this.removeItem} handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} type="revenue" description={this.state.description} one_time={this.state.revenue_one_time} monthly={this.state.revenue_monthly} />

        <Table items={this.state.expense_items} removeItem={this.removeItem} handleSubmit={this.handleSubmit} type="expense" />
      </div>
    );
  }
}

export default App;
