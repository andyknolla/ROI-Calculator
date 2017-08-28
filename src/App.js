import React, { Component } from 'react';
import Table from './components/table';
import Calculations from './components/calculations'
import './App.css';

// const RevenueList = [
//   {
//     description: 'item one',
//     oneTime: '100',
//     monthly: '500'
//   },
//   {
//     description: 'item two',
//     oneTime: '100',
//     monthly: '800'
//   },
//   {
//     description: 'item three',
//     oneTime: '150',
//     monthly: '250'
//   }
// ]
// const ExpenseList = [
//   {
//     description: 'expense one',
//     oneTime: '200',
//     monthly: '50'
//   },
//   {
//     description: 'expense two',
//     oneTime: '600',
//     monthly: '100'
//   },
//   {
//     description: 'expense three',
//     oneTime: '150',
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
      revenue_oneTime: 0,
      revenue_monthly: 0,
      expense_description: '',
      expense_oneTime: 0,
      expense_monthly: 0,
      editIndex: false
    };

    this.InputStateChange = this.InputStateChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.saveData = this.saveData.bind(this);
    this.clearData = this.clearData.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentWillMount() {
    // console.log('revenues should be 350, 1550, and 18950', 'expenses should be 950, 300, and 4550', 'Contribution Profit should be 1250 for monthly, and 14400 for total', 'Contribution Margin should be 0.75989...', 'ROI should be 0.48');
    let savedRevenueData = JSON.parse(
      localStorage.getItem( "savedRevenueData" )
    );
    let savedExpenseData = JSON.parse(
      localStorage.getItem( "savedExpenseData" )
    );
    if(savedRevenueData)  this.setState({ revenue_items: savedRevenueData });
    if(savedExpenseData)  this.setState({ expense_items: savedExpenseData });
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

  editItem(itemIndex, type) {
    console.log(itemIndex);
    this.setState({ editIndex: itemIndex })

    if(type === 'revenue') {
    //grab the revenue array
    let itemForEditting = this.state.revenue_items[itemIndex]
    console.log(itemForEditting);
    // access the individual item based on index (an object)

    // set input state items equal to object property value
    this.setState({
      revenue_description: itemForEditting.description,
      revenue_oneTime: itemForEditting.oneTime,
      revenue_monthly: itemForEditting.monthly
    })
    document.getElementById(`${type}Submit`).classList.add("hide");
    document.getElementById(`${type}Update`).classList.remove("hide");
    document.getElementById(`${type}Cancel`).classList.remove("hide");

    // item being editted should be highlighted

    //...cancel just clears the form and returns submit button

    } else {
      let itemForEditting = this.state.expense_items[itemIndex]
      this.setState({
        expense_description: itemForEditting.description,
        expense_oneTime: itemForEditting.oneTime,
        expense_monthly: itemForEditting.monthly
      })
      document.getElementById(`${type}Submit`).classList.add("hide");
      document.getElementById(`${type}Update`).classList.remove("hide");
      document.getElementById(`${type}Cancel`).classList.remove("hide");
    }
    console.log(this.state);
  }

  cancelEdit(type) {
    // let propertyName = `${type}`
    this.setState({
      [type+"_description"]: "",
      [type+"_oneTime"]: 0,
      [type+"_monthly"]: 0,
    })
      document.getElementById(`${type}Submit`).classList.remove("hide");
      document.getElementById(`${type}Update`).classList.add("hide");
      document.getElementById(`${type}Cancel`).classList.add("hide");

  }

  addItem(type) {
console.log('add item');
    // if state "edit" item is true, then handle differently...

    // splice instead of pushing ...or splice differently- either with the edit index or, if it's a new item, use the existing array's length to splice onto the end


    if(type === 'revenue') {
      let newArray = this.state.revenue_items;
      let newItem = {
        description: this.state.revenue_description,
        oneTime: this.state.revenue_oneTime,
        monthly: this.state.revenue_monthly
      }

      if(this.state.editIndex === false) {
        newArray.push(newItem);
      } else {
        newArray.splice(this.state.editIndex, 1, newItem);
      }

      this.setState({
        revenue_items: newArray,
        revenue_description: '',
        revenue_oneTime: 0,
        revenue_monthly: 0,
        editIndex: false
      })
    } else {
      let newArray = this.state.expense_items;
      let newItem = {
        description: this.state.expense_description,
        oneTime: this.state.expense_oneTime,
        monthly: this.state.expense_monthly
      }

      if(this.state.editIndex === false) {
        newArray.push(newItem);
      } else {
        newArray.splice(this.state.editIndex, 1, newItem);
      }
        this.setState({
        expense_items: newArray,
        expense_description: '',
        expense_oneTime: 0,
        expense_monthly: 0
      })
    }
    document.getElementById(`${type}Submit`).classList.remove("hide");
    document.getElementById(`${type}Update`).classList.add("hide");
    let highlights = document.querySelector(".highlight");
    console.log('hightlights ', highlights);
    if(highlights) {
      document.querySelector(".highlight").classList.remove("highlight");
    }
    // highlights.forEach( (element) => {
    //   element.classList.remove("highlight");
    // })
  }

  showAlert(type) {
    let alert = document.getElementById(type).classList;
    alert.remove("hide")
    alert.add("show");
    setTimeout( () => {
      alert.remove("show")
      alert.add("hide")
    }, 2000);
  }

  saveData() {
    localStorage.setItem( "savedRevenueData", JSON.stringify( this.state.revenue_items ) )
    localStorage.setItem( "savedExpenseData", JSON.stringify( this.state.expense_items ) )

    this.showAlert('saveAlert')
  }

  clearData() {
    localStorage.removeItem('savedExpenseData');
    localStorage.removeItem('savedRevenueData');
    this.setState({
      revenue_items: [],
      expense_items: []
    })
    this.showAlert("clearAlert")
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
            editItem={this.editItem}
            cancelEdit={this.cancelEdit}
            InputStateChange={this.InputStateChange}
            type="revenue"
            inputDescription={this.state.revenue_description}
            inputOneTime={this.state.revenue_oneTime}
            inputMonthly={this.state.revenue_monthly}
          />

          <Table
            items={this.state.expense_items}
            removeItem={this.removeItem}
            addItem={this.addItem}
            editItem={this.editItem}
            cancelEdit={this.cancelEdit}
            InputStateChange={this.InputStateChange}
            type="expense"
            inputDescription={this.state.expense_description}
            inputOneTime={this.state.expense_oneTime}
            inputMonthly={this.state.expense_monthly}
          />
          <div className="buttons">
            <button onClick={ this.saveData } className="btn btn-primary" >SAVE</button>
            <button onClick={ this.clearData } className="btn btn-danger" >CLEAR ALL DATA</button>
            <div id="saveAlert" className="alert alert-success hide">Your data has been saved</div>
            <div id="clearAlert" className="alert alert-warning hide">Your data has been permenantly cleared</div>
          </div>

          <Calculations revenue={this.state.revenue_items} expense={this.state.expense_items} />
        </div>
      </div>
    );
  }
}

export default App;
