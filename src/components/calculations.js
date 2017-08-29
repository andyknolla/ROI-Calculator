import React from 'react';
import Numeral from 'numeral';

const CurrencyFormat = '$ 0,000.00';

class Calculations extends React.Component {

  sum(items, frequency) {
    return items.reduce( (sum, item) => {
        return frequency ? sum + parseFloat(item[frequency]): sum + parseFloat(item.oneTime) + ( parseFloat(item.monthly) * 12 );
    }, 0)
  }

  total(type, frequency) {
    return Numeral( this.sum(this.props[type], frequency) ).format(CurrencyFormat)
  }

  contributionProfit(frequency) {
      return (
              this.sum(this.props.revenue, frequency) -
              this.sum(this.props.expense, frequency)
      )
  }

  contributionMargin() {
    if(this.sum(this.props.revenue) === 0) return "Unable to calculate margin (zero divisor)"
    return Numeral( ( this.sum(this.props.revenue) -
                    this.sum(this.props.expense) ) /
                    this.sum(this.props.revenue) ).format("0%")
  }

  roi() {
    // .toFixed(2));
    //********  test  *********** //
    // let firstPart = ( this.sum(this.props.expense, 'oneTime') -
    //   this.sum(this.props.revenue, 'oneTime') );
    // let secondPart = this.contributionProfit('monthly');
    //
    // console.log('first part ', firstPart, 'secondPart ', secondPart);
    // console.log( firstPart / secondPart );
    // ******** end test *********** //
    if(this.contributionProfit('monthly') === 0) return "Unable to calculate ROI (zero divisor)";
    return Numeral( ( this.sum(this.props.expense, 'oneTime') -
                    this.sum(this.props.revenue, 'oneTime') ) /
                    this.contributionProfit('monthly') )
                    .format("0.0")
  }

  render() {
    return (
      <div>
        <table className='calculations table' >
          <thead className="thead-default">
            <tr>
              <th></th>
              <th>One-Time</th>
              <th>Monthly</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="total-calculations" >
              <td>Revenue</td>
              <td>{ this.total("revenue", "oneTime") }</td>
              <td>{ this.total("revenue", "monthly") }</td>
              <td>{ this.total("revenue") }</td>
            </tr>
            <tr>
              <td>Expenses</td>
              <td>{ this.total("expense", "oneTime") }</td>
              <td>{ this.total("expense", "monthly") }</td>
              <td>{ this.total("expense") }</td>
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
            <span className="margin-value">{ this.contributionMargin()}</span>
          </div>
          <div className="roi">
            <span>Capital ROI (Months)</span>
            <span className="roi-value"> { this.roi() }</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Calculations;
