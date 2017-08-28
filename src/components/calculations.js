import React from 'react';
import Numeral from 'numeral';

const CurrencyFormat = '$ 0,000.00';

class Calculations extends React.Component {

  sum(items, type) {
    return items.reduce( (sum, item) => {
        return type ? sum + parseFloat(item[type]): sum + parseFloat(item.oneTime) + ( parseFloat(item.monthly) * 12 );
    }, 0)
  }

  contributionProfit(type) {
    if(type) {
      return (
        this.sum(this.props.revenue, 'monthly') - this.sum(this.props.expense, 'monthly')
      )
    } else {
      return (
        this.sum(this.props.revenue) - this.sum(this.props.expense)
      )
    }
  }

  contributionMargin() {
      return (
        (
          this.sum(this.props.revenue) -
          this.sum(this.props.expense)
        ) /
        this.sum(this.props.revenue)
      )
  }

  roi() {
    return (
      ( this.sum(this.props.expense, 'oneTime') -
      this.sum(this.props.revenue, 'oneTime') ) /
      this.contributionProfit('monthly')
    )
  }

  total(type, frequency) {
    console.log('type ', type, 'props.type ', this.props[type]);
    return Numeral( this.sum(this.props[type], frequency) ).format(CurrencyFormat)
  }

  render() {
    return (
      <div>
        <table className='calculations' >
          <tbody>
            <tr className="col-titles">
              <th></th>
              <th>One-Time</th>
              <th>Monthly</th>
              <th>Total</th>
            </tr>
            <tr className="total-calculations" >
              <td>Revenue</td>
              <td>{ this.total("revenue", "oneTime") }</td>
              <td>{ this.total("revenue", "monthly") }</td>
              <td>{ this.total("revenue") }</td>
            </tr>
            <tr>
              <td>Expenses</td>
              <td>{ Numeral( this.sum(this.props.expense, 'oneTime') ).format(CurrencyFormat) }</td>
              <td>{ Numeral( this.sum(this.props.expense, 'monthly') ).format(CurrencyFormat) }</td>
              <td>{ Numeral( this.sum(this.props.expense) ).format(CurrencyFormat) }</td>
            </tr>
            <tr id="final-calculations" >
              <td>Contribution Profit</td>
              <td></td>
              <td>{ Numeral( this.contributionProfit('monthly') ).format(CurrencyFormat) }</td>
              <td>{ Numeral( this.contributionProfit() ).format(CurrencyFormat) }</td>
            </tr>

          </tbody>
        </table>

        <div className="margin-roi">
          <div className="margin">
            <span>Contribution Margin</span>
            <span className="margin-value">{ Numeral( this.contributionMargin() ).format('0%') }</span>
          </div>
          <div className="roi">
            <span>Capital ROI (Months)</span>
            <span className="roi-value"> { Numeral(this.roi() ).format('0.0') }</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Calculations;
