import React, { Component } from 'react';
import Table from './components/revenue_table';
import Calculations from './components/calculations'
import './App.css';

const RevenueList = [
  {
    description: 'item one',
    one_time: '100',
    monthly: '50'
  },
  {
    description: 'item two',
    one_time: '10',
    monthly: '80'
  },
  {
    description: 'item three',
    one_time: '300',
    monthly: '25'
  }
]
const ExpenseList = [
  {
    description: 'expense one',
    one_time: '200',
    monthly: '100'
  },
  {
    description: 'expense two',
    one_time: '600',
    monthly: '700'
  },
  {
    description: 'expense three',
    one_time: '140',
    monthly: '730'
  }
]


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revenue_items: RevenueList,
      expense_items: ExpenseList,
      revenue_description: '',
      revenue_one_time: '0',
      revenue_monthly: '0',
      expense_description: '',
      expense_one_time: '0',
      expense_monthly: '0'
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
        <p className="App-intro">         </p>
        <div className='container'>
          <Table
            items={this.state.revenue_items}
            removeItem={this.removeItem}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
            type="revenue"
            inputDescription={this.state.revenue_description}
            inputOne_time={this.state.revenue_one_time}
            inputMonthly={this.state.revenue_monthly}
          />

          <Table
            items={this.state.expense_items}
            removeItem={this.removeItem}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
            type="expense"
            inputDescription={this.state.expense_description}
            inputOne_time={this.state.expense_one_time}
            inputMonthly={this.state.expense_monthly}
          />

          <Calculations revenue={this.state.revenue_items} expense={this.state.expense_items} />
        </div>
      </div>
    );
  }
}

export default App;
