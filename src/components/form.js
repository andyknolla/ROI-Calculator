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
    const value = target.value;
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
    // console.log('inputs ', inputs);
    inputs.forEach(input => {
      console.log('input ', input);
      input.classList.add('active');

      const isInputValid = this.showInputError(input.name);

      if (!isInputValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  showInputError(refName) {
    // console.log('refs ', this.refs);
    const validity = this.refs[refName].validity;
    // const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
    // const isPassword = refName.indexOf('password') !== -1;
    // const isPasswordConfirm = refName === 'passwordConfirm';

    // if (isPasswordConfirm) {
    //   if (this.refs.password.value !== this.refs.passwordConfirm.value) {
    //     this.refs.passwordConfirm.setCustomValidity('Passwords do not match');
    //   } else {
    //     this.refs.passwordConfirm.setCustomValidity('');
    //   }
    // }

    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `required field`;
      }

      // add my validity rules *********

      //   else if (validity.typeMismatch) {
      //   error.textContent = `Must be anumber`;
      // } else if (isPassword && validity.patternMismatch) {
      //   error.textContent = `required`;
      // } else if (isPasswordConfirm && validity.customError) {
      //   error.textContent = 'Passwords do not match';
      // }
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
                onChange={this.handleInputChange} required
              />
            </label>
            <div className="error" id="descriptionError" />
          </div>
          <div className="form-group">
            <label>
              {/* One-time: */}
              <input
                className="form-control"
                name="oneTime"
                ref="oneTime"
                type="text"
                // pattern=""
                value={this.props.inputOneTime}
                onChange={this.handleInputChange}
                required
               />
            </label>
            <div className="error" id="oneTimeError" />
          </div>
          <div className="form-group">
            <label>
              {/* revenue_monthly: */}
              <input
                className="form-control"
                name="monthly"
                ref="monthly"
                type="text"
                // pattern=""
                value={this.props.inputMonthly}
                onChange={this.handleInputChange}
                required
               />
            </label>
           <div className="error" id="monthlyError" />
          </div>
        <button className="btn" >Submit</button>
      </form>
    )
  }
}

export default Form;
