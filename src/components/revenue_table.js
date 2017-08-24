import React from 'react';
import RevenueItem from './revenue_item';

const List = [
  {
    description: 'item one',
    revenue_one_time: '100',
    revenue_monthly: '50'
  },
  {
    description: 'item two',
    revenue_one_time: '10',
    revenue_monthly: '80'
  },
  {
    description: 'item three',
    revenue_one_time: '300',
    revenue_monthly: '25'
  }
]

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      revenue_items: List,
      expense_items: [],
      description: '',
      revenue_one_time: '0',
      revenue_monthly: '0'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderRevenueItems(items) {
    // console.log('revenueItems', List);
    return items.map((item) => {
     return <RevenueItem key={item.id} item={item} />
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let newArray = this.state.revenue_items;
    let newItem = {
      description: this.state.description,
      revenue_one_time: this.state.revenue_one_time,
      revenue_monthly: this.state.revenue_monthly
    }
    newArray.push(newItem);
    console.log(newArray);
    this.setState({
      revenue_items: newArray
    })
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
            {this.renderRevenueItems(this.state.revenue_items)}
          </tbody>
        </table>
        <form onSubmit={this.handleSubmit} >
          <label>
            description:
            <input
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            One-time:
            <input
              name="revenue_one_time"
              type="text"
              value={this.state.revenue_one_time}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            revenue_monthly:
            <input
              name="revenue_monthly"
              type="text"
              value={this.state.revenue_monthly}
              onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
};

export default Table;
