import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
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
    console.log('submit in form.js');
    event.preventDefault();
    let type = this.props.type;
    if (!this.showFormErrors()) {
      console.log('form is invalid: do not submit');
    } else {
      this.props.addItem(type);
    }
  }

  cancelEdit(type) {
    this.props.cancelEdit(this.props.type);
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
      input.classList.remove('active');

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
      <div>
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
                  required
                  maxLength="30"
                />
              <div className="error" id={`${this.props.type}descriptionError`} />
            </div>
            <div className="form-group">
              <label>One-time: </label>
                <input
                  className="form-control"
                  name="oneTime"
                  ref="oneTime"
                  type="number"
                  value={this.props.inputOneTime}
                  onChange={this.handleInputChange}
                  required
                  max="999999999"
                 />
              <div className="error" id={ `${this.props.type}oneTimeError` } />
            </div>
            <div className="form-group">
              <label>revenue_monthly:</label>
                <input
                  className="form-control"
                  name="monthly"
                  ref="monthly"
                  type="number"
                  value={this.props.inputMonthly}
                  onChange={this.handleInputChange}
                  required
                 />
             <div className="error" id={ `${this.props.type}monthlyError` } />
            </div>
          <button id={`${this.props.type}Submit`} className="btn submit" >{`Add ${this.props.type} item`}</button>
          <button id={`${this.props.type}Update`} className="btn submit hide" >Update item</button>
          <button id={`${this.props.type}Cancel`} className="btn hide" onClick={this.cancelEdit}>Cancel</button>
        </form>
      </div>
    )
  }
}

export default Form;
