import React from 'react';



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
        <td>{this.props.item.description}</td>
        <td>{this.props.item.oneTime}</td>
        <td>{this.props.item.monthly}</td>
        <td><button onClick={this.removeItem} className="btn btn-danger">Delete</button></td>
      </tr>
    )
  }
}

export default RevenueItem;
