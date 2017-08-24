import React from 'react';


const RevenueItem = ({item}) => (
    <tr>
      <td>{item.description}</td>
      <td>{item.revenue_one_time}</td>
      <td>{item.revenue_monthly}</td>
    </tr>
);

export default RevenueItem;
