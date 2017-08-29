import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditCancelation = this.handleEditCancelation.bind(this);
  }

  //  ****************   EVENT HANDLERS   **************** //

  handleInputChange(event) {
    event.target.classList.add("active");

    let target = event.target;
    let value = target.value;
    let name = target.name;
    let type = this.props.type;

    this.props.InputStateChange(type, value, name);
    this.showInputError(event.target.name);
  }

  handleEditCancelation(type) {
    this.props.cancelEdit(this.props.type);
  }

  handleSubmit(event) {
    event.preventDefault();
    let type = this.props.type;

    if (this.showFormErrors()) {
      this.props.addItem(type);
    }
  }

//  ****************   VALIDATION   **************** //

  showFormErrors() {
    let inputs = document.querySelectorAll("input");
    let isFormValid = true;
    inputs.forEach(input => {
      input.classList.add("active");
      let isInputValid = this.showInputError(input.name);

      if (!isInputValid) {
        isFormValid = false;
      }
      input.classList.remove("active");
    });
    return isFormValid;
  }

  showInputError(refName) {
    const validity = this.refs[refName].validity;
    const error = document.getElementById(`${this.props.type}${refName}Error`);
    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = "required field";
      } else if (validity.patternMismatch) {
        error.textContent = "Enter a valid currency amount";
      }
      return false;
    }
    error.textContent = '';
    return true;
  }

  //  ****************       VIEW       **************** //

  render() {
    const CurrencyPattern1 = "^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?"
    return (
        <form onSubmit={this.handleSubmit} className="form-inline" >
          <div className="form-group">
            <label>description: </label>
              <input
                className="form-control"
                name="description"
                ref="description"
                type="text"
                value={this.props.inputDescription}
                onChange={this.handleInputChange}
                maxLength="30"
                required
              />
            <div className="error" id={`${this.props.type}descriptionError`}></div>
          </div>
          <div className="form-group">
            <label>One-time: </label>
              <input
                className="form-control"
                name="oneTime"
                ref="oneTime"
                type="text"
                value={this.props.inputOneTime}
                onChange={this.handleInputChange}
                maxLength="13"
                pattern={CurrencyPattern1}
                required
               />
            <div className="error" id={ `${this.props.type}oneTimeError` }></div>
          </div>
          <div className="form-group">
            <label>revenue_monthly:</label>
              <input
                className="form-control"
                name="monthly"
                ref="monthly"
                type="text"
                value={this.props.inputMonthly}
                onChange={this.handleInputChange}
                maxLength="13"
                pattern={CurrencyPattern1}
                required
               />
           <div className="error" id={ `${this.props.type}monthlyError` }></div>
          </div>
          <button id={`${this.props.type}Submit`} className="btn submit" >{`Add ${this.props.type} item`}</button>
          <button id={`${this.props.type}Update`} className="btn submit hide" >Update item</button>
          <button id={`${this.props.type}Cancel`} className="btn btn-default hide" onClick={this.handleEditCancelation}>Cancel</button>
        </form>
    )
  }
}

export default Form;
