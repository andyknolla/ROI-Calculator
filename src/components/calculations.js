import React from 'react';
import Numeral from 'numeral';

const CurrencyFormat = '$ 0,000.00';

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
        (
          this.sumTotal(this.props.revenue) -
          this.sumTotal(this.props.expense)
        ) /
        this.sumTotal(this.props.revenue)
      )
  }

  roi() {
    return (
      ( this.sumTotal(this.props.expense, 'oneTime') -
      this.sumTotal(this.props.revenue, 'oneTime') ) / this.contributionProfit('monthly')
      )
  }

  render() {
    return (
      <table className='calculations' >
        <tbody>
          <tr>
            <th></th>
            <th>One-Time</th>
            <th>Monthly</th>
            <th>Total</th>
          </tr>
          <tr className="total-calculations" >
            <td>Revenue</td>
            <td>{ Numeral( this.sumTotal(this.props.revenue, 'oneTime') ).format(CurrencyFormat) }</td>
            <td>{ Numeral( this.sumTotal(this.props.revenue, 'monthly') ).format(CurrencyFormat) }</td>
            <td>{ Numeral( this.sumTotal(this.props.revenue) ).format(CurrencyFormat) }</td>
          </tr>
          <tr>
            <td>Expenses</td>
            <td>{ Numeral( this.sumTotal(this.props.expense, 'oneTime') ).format(CurrencyFormat) }</td>
            <td>{ Numeral( this.sumTotal(this.props.expense, 'monthly') ).format(CurrencyFormat) }</td>
            <td>{ Numeral( this.sumTotal(this.props.expense) ).format(CurrencyFormat) }</td>
          </tr>
          <tr id="final-calculations" >
            <td>Contribution Profit</td>
            <td></td>
            <td>{ Numeral( this.contributionProfit('monthly') ).format(CurrencyFormat) }</td>
            <td>{ Numeral( this.contributionProfit() ).format(CurrencyFormat) }</td>
          </tr>
          <tr>
            <td></td>
            <td>Contribution Margin</td>
            <td>{ Numeral( this.contributionMargin() ).format('0%') }</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
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
