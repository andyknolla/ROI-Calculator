import React from 'react';
import Numeral from 'numeral';

class Calculations extends React.Component {

  sumTotal(items, type) {
    return items.reduce( (sum, item) => {
        return type ? sum + item[type]: sum + item.oneTime + ( item.monthly * 12 );
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
      ( this.sumTotal(this.props.expense, 'oneTime') -
      this.sumTotal(this.props.revenue, 'oneTime') ) / this.contributionProfit('monthly')
      )
  }

  render() {
    let test = Numeral(100).format('$.00');
    // console.log(typeof(this.props.revenue));
    // console.log(test, this.sumTotal(this.props.revenue, 'oneTime'));

    let test2 = Numeral( this.sumTotal(this.props.revenue, 'oneTime') ).format('$ 0.00')
    // console.log(typeof(test2));

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
            <td>{ Numeral( this.sumTotal(this.props.revenue, 'oneTime') ).format('$ 0.00') }</td>
            <td>{ Numeral( this.sumTotal(this.props.revenue, 'monthly') ).format('$ 0.00') }</td>
            <td>{ Numeral( this.sumTotal(this.props.revenue) ).format('$ 0.00') }</td>
          </tr>
          <tr>
            <td>Expenses</td>
            <td>{ Numeral( this.sumTotal(this.props.expense, 'oneTime') ).format('$ 0.00') }</td>
            <td>{ Numeral( this.sumTotal(this.props.expense, 'monthly') ).format('$ 0.00') }</td>
            <td>{ Numeral( this.sumTotal(this.props.expense) ).format('$ 0.00') }</td>
          </tr>
          <br />
          <tr>
            <td>Contribution Profit</td>
            <td></td>
            <td>{ Numeral( this.contributionProfit('monthly') ).format('$ 0.00') }</td>
            <td>{ Numeral( this.contributionProfit() ).format('$ 0.00') }</td>
          </tr>
          <tr>
            <td>Contribution Margin</td>
            <td>{ Numeral( this.contributionMargin() ).format('0%') }</td>
            <td></td>
          </tr>
          <tr>
            <td>Capital ROI (Months)</td>
            <td>{ Numeral(this.roi() ).format('0.0') }</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default Calculations;
