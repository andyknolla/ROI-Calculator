import React from 'react';
import Item from './item';
import Form from './form';


class Table extends React.Component {

  renderItems(items) {
    return items.map((item, index) => {
     return <Item key={index} item={item} type={this.props.type} index={index} removeItem={this.props.removeItem} />
    });
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Item Description</th>
              <th>One-Time</th>
              <th>Monthly</th>
            </tr>
            {this.renderItems(this.props.items)}
          </tbody>
        </table>
        <Form
          addItem={this.props.addItem}
          type={this.props.type}
          InputStateChange={this.props.InputStateChange}
          inputDescription={this.props.inputDescription}
          inputOne_time={this.props.inputOne_time}
          inputMonthly={this.props.inputMonthly}
        />
      </div>
    );
  }
};

export default Table;