import React, { Component } from 'react';
import Table from './components/table';
import Calculations from './components/calculations'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revenue_items: [],
      expense_items: [],
      revenue_description: '',
      revenue_oneTime: '',
      revenue_monthly: '',
      expense_description: '',
      expense_oneTime: '',
      expense_monthly: '',
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
    this.setState({ editIndex: itemIndex })

    if(type === 'revenue') {
    let itemForEditting = this.state.revenue_items[itemIndex]

    this.setState({
      revenue_description: itemForEditting.description,
      revenue_oneTime: itemForEditting.oneTime,
      revenue_monthly: itemForEditting.monthly
    })
    document.getElementById(`${type}Submit`).classList.add("hide");
    document.getElementById(`${type}Update`).classList.remove("hide");
    document.getElementById(`${type}Cancel`).classList.remove("hide");

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
  }

  cancelEdit(type) {
    this.setState({
      [type+"_description"]: "",
      [type+"_oneTime"]: 0,
      [type+"_monthly"]: 0,
    })
    document.getElementById(`${type}Submit`).classList.remove("hide");
    document.getElementById(`${type}Update`).classList.add("hide");
    document.getElementById(`${type}Cancel`).classList.add("hide");

    let highlights = document.querySelectorAll(".highlight");
    if(highlights.length > 0) {
      highlights.forEach( (element) => {
        if( element.classList.value.includes(type) ) {
          element.classList.remove("highlight")
        }
      })
    }
  }

  addItem(type) {
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
        revenue_oneTime: '',
        revenue_monthly: '',
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
        expense_oneTime: '',
        expense_monthly: ''
      })
    }
    document.getElementById(`${type}Submit`).classList.remove("hide");
    document.getElementById(`${type}Update`).classList.add("hide");
    document.getElementById(`${type}Cancel`).classList.add("hide");

    let highlights = document.querySelectorAll(".highlight");
    console.log('hightlights ', highlights);
    if(highlights.length > 0) {
      highlights.forEach( (element) => {
        if( element.classList.value.includes(type) ) {
          element.classList.remove("highlight")
        }
      })
    }
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
