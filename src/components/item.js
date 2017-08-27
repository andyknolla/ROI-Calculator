import React from 'react';
import Numeral from 'numeral';

const CurrencyFormat = "$ 0,000.00";

class RevenueItem extends React.Component {
  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(){
    let index = parseInt(this.props.index, 10);
     this.props.removeItem(index, this.props.type);
  }

  render() {
    let item = this.props.item;
    return (
      <tr>
        <td>{ item.description }</td>
        <td>{ Numeral( item.oneTime ).format(CurrencyFormat) }</td>
        <td>{ Numeral( item.monthly ).format(CurrencyFormat) }</td>
        <td><button onClick={this.removeItem} className="btn btn-danger item-button"><span className="glyphicon glyphicon-trash" ></span></button></td>
      </tr>
    )
  }
}

export default RevenueItem;
