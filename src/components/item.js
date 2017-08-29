import React from 'react';
import Numeral from 'numeral';

const CurrencyFormat = "$ 0,000.00";

class RevenueItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  highlightEditItem(index) {
    let highlights = document.querySelectorAll(".bg-warning");
      if(highlights.length > 0) {
        highlights.forEach( (element) => {
          if( element.classList.value.includes(this.props.type) ) {
            element.classList.remove("bg-warning")
          }
        })
    }
    document.querySelector(`.${this.props.type}${index}`).classList.add("bg-warning")
  }

  handleEdit() {
    let index = parseInt(this.props.index, 10);
    this.props.editItem(index, this.props.type);
    this.highlightEditItem(index);
  }

  handleDelete(){
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
          <button className="btn btn-warning item-button" onClick={this.handleEdit}>
            <span className="glyphicon glyphicon-pencil" ></span>
          </button>

          <button onClick={this.handleDelete} className="btn btn-danger item-button">
            <span className="glyphicon glyphicon-trash" ></span>
          </button>
        </td>
      </tr>
    )
  }
}

export default RevenueItem;
