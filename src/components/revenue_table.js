import React from 'react';
import Item from './item';


class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  renderItems(items) {
    // console.log('state from Table(monthly prop) :', this.props.monthly);
    return items.map((item, index) => {
     return <Item key={index} item={item} index={index} removeItem={this.props.removeItem} />
    });
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Item Description</th>
              <th>One-Time</th>
              <th>Monthly</th>
            </tr>
            {this.renderItems(this.props.items)}
          </tbody>
        </table>
        <form onSubmit={this.props.handleSubmit} className="form-inline" >
            <div className="form-group">
              <label>
                {/* description: */}
                <input
                  className="form-control"
                  name="description"
                  type="text"
                  value={this.props.description}
                  onChange={this.props.handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label>
                {/* One-time: */}
                <input
                  className="form-control"
                  name="one_time"
                  type="text"
                  value={this.props.one_time}
                  onChange={this.props.handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label>
                {/* revenue_monthly: */}
                <input
                  className="form-control"
                  name="monthly"
                  type="text"
                  value={this.props.monthly}
                  onChange={this.props.handleInputChange} />
              </label>
            </div>
          <input type="submit" value="Submit" className="btn" />
        </form>
      </div>
    );
  }
};

export default Table;
