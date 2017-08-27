import React from 'react';
import Item from './item';
import Form from './form';


class Table extends React.Component {

  componentWillUnmount() {
    console.log('unmount');
  }
  renderItems(items) {
    return items.map((item, index) => {
     return <Item key={index} item={item} type={this.props.type} index={index} removeItem={this.props.removeItem} />
    });
  }

  render() {
    return (
      <div>
        <table className="dataTable" >
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
          inputOneTime={this.props.inputOneTime}
          inputMonthly={this.props.inputMonthly}
        />
      </div>
    );
  }
};

export default Table;
