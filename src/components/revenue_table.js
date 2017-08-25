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
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(itemIndex) {
    let newArray = this.state.revenue_items;
    newArray.splice(itemIndex, 1)  ;
    this.setState({
      revenue_items: newArray
    })
  }

  renderRevenueItems(items) {
    // console.log('revenueItems', List);
    return items.map((item, index) => {
     return <RevenueItem key={index} item={item} index={index} removeItem={this.removeItem} revenue_items={this.state.revenue_items} />
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
      <div className="container">
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
        <form onSubmit={this.handleSubmit} className="form-inline" >
            <div className="form-group">
              <label for="description">
                {/* description: */}
                <input
                  className="form-control"
                  name="description"
                  type="text"
                  value={this.state.description}
                  onChange={this.handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label>
                {/* One-time: */}
                <input
                  className="form-control"
                  name="revenue_one_time"
                  type="text"
                  value={this.state.revenue_one_time}
                  onChange={this.handleInputChange} />
              </label>
            </div>
            <div className="form-group">
              <label>
                {/* revenue_monthly: */}
                <input
                  className="form-control"
                  name="revenue_monthly"
                  type="text"
                  value={this.state.revenue_monthly}
                  onChange={this.handleInputChange} />
              </label>
            </div>
          <input type="submit" value="Submit" className="btn" />
        </form>
      </div>
    );
  }
};

export default Table;
