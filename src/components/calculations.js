import React from 'react';

class Calculations extends React.Component {

  sumTotal(items, type) {
    return items.reduce( (sum, item) => {
        return type ? sum + parseInt(item[type], 10) : sum + parseInt(item.one_time, 10) + ( parseInt(item.monthly, 10) * 12 );
    }, 0)
  }

  contributionProfit(type) {
    if(type) {
      return (
        this.sumTotal(this.props.revenue, 'monthly') - this.sumTotal(this.props.expense, 'monthly')
      )
    } else {
      return (
        this.sumTotal(this.props.revenue) - this.sumTotal(this.props.expense)
      )
    }
  }

  contributionMargin() {
      return (
        ( this.sumTotal(this.props.revenue) - this.sumTotal(this.props.expense) ) / this.sumTotal(this.props.revenue)
      )
  }

  roi() {
    return (
      ( this.sumTotal(this.props.expense, 'one_time') -
      this.sumTotal(this.props.revenue, 'one_time') ) / this.contributionProfit('monthly')
      )
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
            <td>{ this.sumTotal(this.props.expense, 'one_time') }</td>
            <td>{ this.sumTotal(this.props.expense, 'monthly') }</td>
            <td>{ this.sumTotal(this.props.expense) }</td>
          </tr>
          <br />
          <tr>
            <td>Contribution Profit</td>
            <td></td>
            <td>{ this.contributionProfit('monthly') }</td>
            <td>{ this.contributionProfit() }</td>
          </tr>
          <tr>
            <td>Contribution Margin</td>
            <td>{ this.contributionMargin() }</td>
            <td></td>
          </tr>
          <tr>
            <td>Capital ROI (Months)</td>
            <td>{ this.roi() }</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default Calculations;
