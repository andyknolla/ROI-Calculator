import React, { Component } from 'react';
import Table from './components/table';
import Calculations from './components/calculations'
import './App.css';

// const RevenueList = [
//   {
//     description: 'item one',
//     one_time: '100',
//     monthly: '500'
//   },
//   {
//     description: 'item two',
//     one_time: '100',
//     monthly: '800'
//   },
//   {
//     description: 'item three',
//     one_time: '150',
//     monthly: '250'
//   }
// ]
// const ExpenseList = [
//   {
//     description: 'expense one',
//     one_time: '200',
//     monthly: '50'
//   },
//   {
//     description: 'expense two',
//     one_time: '600',
//     monthly: '100'
//   },
//   {
//     description: 'expense three',
//     one_time: '150',
//     monthly: '150'
//   }
// ]


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revenue_items: [],
      expense_items: [],
      revenue_description: '',
      revenue_one_time: '0',
      revenue_monthly: '0',
      expense_description: '',
      expense_one_time: '0',
      expense_monthly: '0'
    };

    this.InputStateChange = this.InputStateChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  componentWillMount() {
    // console.log('revenues should be 350, 1550, and 18950', 'expenses should be 950, 300, and 4550', 'Contribution Profit should be 1250 for monthly, and 14400 for total', 'Contribution Margin should be 0.75989...', 'ROI should be 0.48');
    let savedRevenueData = JSON.parse(
      localStorage.getItem( "savedRevenueData" )
    );
    let savedExpenseData = JSON.parse(
      localStorage.getItem( "savedExpenseData" )
    );
    this.setState({
      revenue_items: savedRevenueData,
      expense_items: savedExpenseData
    })
  }

  removeItem(itemIndex, type) {
    if(type === 'revenue') {
      let newArray = this.state.revenue_items;
      newArray.splice(itemIndex, 1)  ;
      this.setState({
        revenue_items: newArray
      })
    } else {
      let newArray = this.state.expense_items;
      newArray.splice(itemIndex, 1)  ;
      this.setState({
        expense_items: newArray
      })
    }
  }

  InputStateChange(type, value, name) {
    let propertyName = `${type}_${name}`
    this.setState({
      [propertyName]: value
    });
  }

  addItem(type) {
    if(type === 'revenue') {
      let newArray = this.state.revenue_items;
      let newItem = {
        description: this.state.revenue_description,
        one_time: this.state.revenue_one_time,
        monthly: this.state.revenue_monthly
      }
      newArray.push(newItem);
      this.setState({
        revenue_items: newArray,
        revenue_description: '',
        revenue_one_time: '0',
        revenue_monthly: '0'
      })
    } else {
      let newArray = this.state.expense_items;
      let newItem = {
        description: this.state.expense_description,
        one_time: this.state.expense_one_time,
        monthly: this.state.expense_monthly
      }
      newArray.push(newItem);
      this.setState({
        expense_items: newArray,
        expense_description: '',
        expense_one_time: '0',
        expense_monthly: '0'
      })
    }
  }

  saveData() {
    localStorage.setItem( "savedRevenueData", JSON.stringify( this.state.revenue_items ) )
    localStorage.setItem( "savedExpenseData", JSON.stringify( this.state.expense_items ) )
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
            addItem={this.addItem}
            InputStateChange={this.InputStateChange}
            type="revenue"
            inputDescription={this.state.revenue_description}
            inputOne_time={this.state.revenue_one_time}
            inputMonthly={this.state.revenue_monthly}
          />

          <Table
            items={this.state.expense_items}
            removeItem={this.removeItem}
            addItem={this.addItem}
            InputStateChange={this.InputStateChange}
            type="expense"
            inputDescription={this.state.expense_description}
            inputOne_time={this.state.expense_one_time}
            inputMonthly={this.state.expense_monthly}
          />
          <button onClick={ this.saveData } className="btn btn-primary" >SAVE</button>

          <Calculations revenue={this.state.revenue_items} expense={this.state.expense_items} />
        </div>
      </div>
    );
  }
}

export default App;
