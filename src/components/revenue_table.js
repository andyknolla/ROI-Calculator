import React from 'react';
import RevenueItem from './revenue_item';

const Table = (props) => {
  const revenueItems = props.items.map((item) => {
    return <RevenueItem key={item.id} item={item} />
  });

  return (
    <table>
      {revenueItems}
    </table>
  );
};

export default Table;
