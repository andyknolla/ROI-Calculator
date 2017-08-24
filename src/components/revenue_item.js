import React from 'react';


const RevenueItem = ({item}) => (
    <tr>
      <td>{item.description}</td>
      <td>{item.one_time}</td>
      <td>{item.monthly}</td>
    </tr>
);

export default RevenueItem;
