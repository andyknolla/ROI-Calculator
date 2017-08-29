import React from 'react';
import Item from './item';
import Form from './form';


class Table extends React.Component {

  renderItems(items) {
    return items.map((item, index) => {
     return <Item key={index} item={item} type={this.props.type} index={index} removeItem={this.props.removeItem} editItem={this.props.editItem} />
    });
  }

  render() {
    return (
      <div className="input-group">
        <table className="table-sm dataTable" >
          <thead className="thead-default">
            <tr>
              <th>Item Description</th>
              <th>One-Time</th>
              <th>Monthly</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>

            {this.renderItems(this.props.items)}
          </tbody>
        </table>
        <Form
          addItem={this.props.addItem}
          cancelEdit={this.props.cancelEdit}
          type={this.props.type}
          InputStateChange={this.props.InputStateChange}
          inputDescription={this.props.inputDescription}
          inputOneTime={this.props.inputOneTime}
          inputMonthly={this.props.inputMonthly}
        />
      </div>
    );
  }
};

export default Table;
