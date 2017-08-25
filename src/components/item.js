import React from 'react';



class RevenueItem extends React.Component {
  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(){
    console.log('remove item called in item', 'props ', this.props);
    let index = parseInt(this.props.index);
     this.props.removeItem(index);
  }

  render() {
    return (
      <tr>
        <td>{this.props.item.description}</td>
        <td>{this.props.item.one_time}</td>
        <td>{this.props.item.monthly}</td>
        <td><button onClick={this.removeItem} className="btn btn-danger">Delete</button></td>
      </tr>
    )
  }
}

export default RevenueItem;
