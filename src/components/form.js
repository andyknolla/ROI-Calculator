import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    event.target.classList.add('active');

    const target = event.target;
    let value;

    if(target.name === 'description') {
      value = target.value;
    } else value = Number(target.value);

    const name = target.name;
    let type = this.props.type;
    this.props.InputStateChange(type, value, name);

    this.showInputError(event.target.name);
  }

  handleSubmit(event) {
    event.preventDefault();
    let type = this.props.type;
    if (!this.showFormErrors()) {
      console.log('form is invalid: do not submit');
    } else {
      this.props.addItem(type);
    }
  }

  showFormErrors() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;
    inputs.forEach(input => {
      input.classList.add('active');

      const isInputValid = this.showInputError(input.name);

      if (!isInputValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  showInputError(refName) {
    const validity = this.refs[refName].validity;
    const error = document.getElementById(`${this.props.type}${refName}Error`);
    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `required field`;
      }

      // add my validity rules *********

      return false;
    }

    error.textContent = '';
    return true;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-inline" >
          <div className="form-group">
            <label>
              {/* description: */}
              <input
                className="form-control"
                name="description"
                ref="description"
                type="text"
                value={this.props.inputDescription}
                onChange={this.handleInputChange}
                required
              />
            </label>
            <div className="error" id={`${this.props.type}descriptionError`} />
          </div>
          <div className="form-group">
            <label>
              {/* One-time: */}
              <input
                className="form-control"
                name="oneTime"
                ref="oneTime"
                type="number"
                // pattern=""
                value={this.props.inputOneTime}
                onChange={this.handleInputChange}
                required
               />
            </label>
            <div className="error" id={ `${this.props.type}oneTimeError` } />
          </div>
          <div className="form-group">
            <label>
              {/* revenue_monthly: */}
              <input
                className="form-control"
                name="monthly"
                ref="monthly"
                type="number"
                // pattern=""
                value={this.props.inputMonthly}
                onChange={this.handleInputChange}
                required
               />
            </label>
           <div className="error" id={ `${this.props.type}monthlyError` } />
          </div>
        <button className="btn btn-success submit" >Submit</button>
      </form>
    )
  }
}

export default Form;
