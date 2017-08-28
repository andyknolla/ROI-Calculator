import React from 'react';
import Numeral from 'numeral';

const CurrencyFormat = '$ 0,000.00';

class Calculations extends React.Component {

  sumTotal(items, type) {
    return items.reduce( (sum, item) => {
      // console.log('item ', item, 'type ', typeof(item.oneTime));
        return type ? sum + parseFloat(item[type]): sum + parseFloat(item.oneTime) + ( parseFloat(item.monthly) * 12 );
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
      this.sumTotal(this.props.revenue, 'oneTime') ) /
      this.contributionProfit('monthly')
    )
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
