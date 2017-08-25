import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let type = this.props.type;
    this.props.addItem(type);
  }

  handleInputChange(event) {
    console.log('change handler');
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let type = this.props.type;
    this.props.InputStateChange(type, value, name);
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
                type="text"
                value={this.props.inputDescription}
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div className="form-group">
            <label>
              {/* One-time: */}
              <input
                className="form-control"
                name="one_time"
                type="text"
                value={this.props.inputOne_time}
                onChange={this.handleInputChange} />
            </label>
          </div>
          <div className="form-group">
            <label>
              {/* revenue_monthly: */}
              <input
                className="form-control"
                name="monthly"
                type="text"
                value={this.props.inputMonthly}
                onChange={this.handleInputChange} />
            </label>
          </div>
        <input type="submit" value="Submit" className="btn" />
      </form>
    )
  }
}

export default Form;
