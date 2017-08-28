import React from 'react';
import Numeral from 'numeral';

const CurrencyFormat = "$ 0,000.00";

class RevenueItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }

    this.removeItem = this.removeItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  editItem() {
    let index = parseInt(this.props.index, 10);
    this.props.editItem(index, this.props.type);
    // add highlight class to specific className, built from type + index...ie ${type}${index}


    let highlights = document.querySelector(".highlight");
    console.log('hightlights ', highlights);
    if(highlights) {
      document.querySelector(".highlight").classList.remove("highlight");
    }
    console.log(document.querySelector(`.${this.props.type}${index}`));
    console.log(`.${this.props.type}${index}`);

    document.querySelector(`.${this.props.type}${index}`).classList.add("highlight")
  }

  removeItem(){
    let index = parseInt(this.props.index, 10);
    let confirmation = window.confirm("Are you sure you want to delete the item?")
    if(confirmation) this.props.removeItem(index, this.props.type);
  }

  render() {
    let item = this.props.item;
    return (
      <tr className={`${this.props.type}${this.props.index}`}>
        <td>{ item.description }</td>
        <td>{ Numeral( item.oneTime ).format(CurrencyFormat) }</td>
        <td>{ Numeral( item.monthly ).format(CurrencyFormat) }</td>
        <td>
          <button className="btn btn-warning item-button" onClick={this.editItem}>
            <span className="glyphicon glyphicon-pencil" ></span>
          </button>

          <button onClick={this.removeItem} className="btn btn-danger item-button">
            <span className="glyphicon glyphicon-trash" ></span>
          </button>
        </td>
      </tr>
    )
  }
}

export default RevenueItem;
