import React, { Component } from 'react';

class Calculations extends React.Component {
  constructor(props) {
    super(props);

  }

  sumTotal(items, type) {
    return items.reduce( (sum, item) => {
        return type ? sum + parseInt(item[type]) : sum + parseInt(item.one_time) + parseInt(item.monthly);
    }, 0)
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>One-Time</th>
            <th>Monthly</th>
            <th>Total</th>
          </tr>
          <tr>
            <td>Revenue</td>
            <td>{this.sumTotal(this.props.revenue, 'one_time')}</td>
            <td>{this.sumTotal(this.props.revenue, 'monthly')}</td>
            <td>{this.sumTotal(this.props.revenue)}</td>
          </tr>
          <tr>
            <td>Expenses</td>
            <td>{this.sumTotal(this.props.expense, 'one_time')}</td>
            <td>{this.sumTotal(this.props.expense, 'monthly')}</td>
            <td>{this.sumTotal(this.props.expense)}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default Calculations;
