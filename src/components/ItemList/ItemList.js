import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './ItemList.css';
import 'antd/dist/antd.css';
import isEmpty from 'lodash.isempty';
import NotAvailable from '../NotAvailable/NotAvailable';

const ItemList = (props) => {

  const { data } = props;
  const { category } = useParams();
  const items = category ? data[category].items : data;
  const values = Object.values(items);


  const renderItems = () => (
    <>
      {values.map(item => (

        <div className="parent" key={`card-${item.name}-link`}>
          <div className="child">
            <NavLink
              className='card'
              key={`${item.name}-link`}
              to={item.routeId ? `/${item.routeId}` : `${category}/comingsoon`}
            >
              <img className="head" alt="" src={`/images/${item.cardImage}`} />
              <div className="body">{item.name}</div>
            </NavLink>
          </div>
        </div>
      ))}
    </>
  )

  return (
    <div className="items-container">
      {isEmpty(items) ? <NotAvailable message='NO ITEMS AVAILBALE AT THE MOMENT' /> : renderItems()}
    </div>
  )

}

export default ItemList;