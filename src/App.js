import React, { Component } from "react";
import Table from "./components/table";
import Calculations from "./components/calculations"
import "./App.css";

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
      revenueEditIndex: false,
      expenseEditIndex: false
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

// ****************       CRUD       **************** //

  addItem(type) {
    let newItem = {
      description: this.state[`${type}_description`],
      oneTime: this.state[`${type}_oneTime`],
      monthly: this.state[`${type}_monthly`]
    }
    let newArray = this.state[`${type}_items`];
    let spliceStart = this.state[`${type}EditIndex`];

    if(this.state[`${type}EditIndex`] === false) {
      newArray.push(newItem);
    } else {
      newArray.splice(spliceStart, 1, newItem);
    }
    this.setState({ [type + "_items"]: newArray, [type + "EditIndex"]: false })
    this.clearInputState(type);
    this.switchButtons(type, "normal");
    this.clearEditHighlight(type);
  }

  editItem(itemIndex, type) {
    let itemForEditting = this.state[type + "_items"][itemIndex];
    this.setState({
      [type + "_description"]: itemForEditting.description,
      [type + "_oneTime"]: itemForEditting.oneTime,
      [type + "_monthly"]: itemForEditting.monthly,
      [type + "EditIndex"]: itemIndex
    })
    this.switchButtons(type, "edit");
  }

  removeItem(itemIndex, type) {
    let newArray = this.state[type + "_items"];
    newArray.splice(itemIndex, 1)  ;
    this.setState({
      [type + "_items"]: newArray
    })
  }

//  ****************      UI CHANGES      **************** //

  cancelEdit(type) {
    this.setState({
      [type + "_description"]: "",
      [type + "_oneTime"]: 0,
      [type + "_monthly"]: 0,
      [type + "EditIndex"]: false
    })
    this.switchButtons(type, "normal");
    this.clearEditHighlight(type);
  }

  InputStateChange(type, value, name) {
    let propertyName = `${type}_${name}`
    this.setState({
      [propertyName]: value
    });
  }

  clearInputState(type) {
    this.setState({
      [type + "_description"]: '',
      [type + "_oneTime"]: '',
      [type + "_monthly"]: ''
    })
  }

  switchButtons(type, mode) {
    let submit = document.getElementById(`${type}Submit`).classList;
    let update = document.getElementById(`${type}Update`).classList;
    let cancel = document.getElementById(`${type}Cancel`).classList;
    if(mode === "edit") {
      submit.add("hide");
      update.remove("hide");
      cancel.remove("hide");
    } else {
      submit.remove("hide");
      update.add("hide");
      cancel.add("hide");
    }
  }

  clearEditHighlight(type) {
    let highlights = document.querySelectorAll(".bg-warning");
    if(highlights.length > 0) {
      highlights.forEach( (element) => {
        if( element.classList.value.includes(type) ) {
          element.classList.remove("bg-warning")
        }
      })
    }
  }

  showAlert(type) {
    let alert = document.getElementById(type).classList;
    alert.remove("hide")
    setTimeout( () => {
      alert.add("hide")
    }, 4000);
  }

//  ****************   LOCAL STORAGE   **************** //

  saveData() {
    localStorage.setItem( "savedRevenueData", JSON.stringify( this.state.revenue_items ) )
    localStorage.setItem( "savedExpenseData", JSON.stringify( this.state.expense_items ) )
    this.showAlert("saveAlert")
  }

  clearData() {
    let confirmation = window.confirm("Are you sure you want to permenantly delete all of your data?")
    if(confirmation) {
      localStorage.removeItem("savedExpenseData");
      localStorage.removeItem("savedRevenueData");
      this.setState({
        revenue_items: [],
        expense_items: []
      })
      this.showAlert("clearAlert")
    }
  }

  //  ****************       VIEW       **************** //

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>ROI Calculator</h2>
          <p className="App-intro">Enter values below. Click SAVE to store your data to the browser"s localStorage</p>
        </div>
        <div className="container">
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
            <button onClick={ this.clearData } className="btn btn-danger" >DELETE ALL DATA</button>
            <div id="saveAlert" className="alert alert-success hide">Your data has been saved to your browser's localStorage.</div>
            <div id="clearAlert" className="alert alert-warning hide">Your data has been permenantly deleted.</div>
          </div>
          <Calculations revenue={this.state.revenue_items} expense={this.state.expense_items} />
        </div>
      </div>
    );
  }
}

export default App;
