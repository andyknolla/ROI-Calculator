import React from 'react';
import Numeral from 'numeral';

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
    return (
      <tr>
        <td>{ this.props.item.description }</td>
        <td>{ Numeral( this.props.item.oneTime ).format("$ 0.00") }</td>
        <td>{ Numeral( this.props.item.monthly ).format("$ 0.00") }</td>
        <td><button onClick={this.removeItem} className="btn btn-danger">Delete</button></td>
      </tr>
    )
  }
}

export default RevenueItem;
