import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Card } from 'antd';
import './ItemList.css';
import 'antd/dist/antd.css';
import isEmpty from 'lodash.isempty';

const ItemList = (props) => {

  const { data } = props;
  const { category } = useParams('');
  const items = category ? data[category].items : data;
  const values = Object.values(items);
  const { Meta } = Card;

  const renderNoItems = () => (
    <div className='no-items'>
      <div className="message">NO ITEMS AVALIBLE AT THE MOMENT</div>
      <img className="icon" src="/images/logo.png" alt="BK" />
    </div>
  )

  const renderItems = () => (
    <div className="items-list">
      {values.map(item => (
        <div className="card-row" key={`card-${item.name}-link`}>
          <NavLink
            className="tile"
            key={`${item.name}-link`}
            to={`/${item.routeId}`}
          >
            <Card
              hoverable
              bordered
              style={{ width: 220 }}
              cover={<img className="cardImage" alt="" src={`/images/${item.image}`} />}
            >
              <Meta title={item.name} />
            </Card>
          </NavLink>
        </div>
      ))}
    </div>
  )
  console.log(values)
  return (
    <div className="items-container">
      {isEmpty(items) ? renderNoItems() : renderItems()}
    </div>
  )

}

export default ItemList;