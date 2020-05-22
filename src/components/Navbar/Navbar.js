import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {

  //TODO move logic to parent
  if (props.data === '') {
    return 'loading';
  }

  const { data } = props;
  const values = Object.values(data);

  return (
    <div className="navbar">
      <NavLink
        className="tile"
        to={`/`}
        activeStyle={{ color: "#EE1D23" }}
      >
        <img className="icon" src="/images/logo.png" alt="BK" />
        <div className="section">MENU</div>
      </NavLink>
      {values.map(item => (
        <NavLink
          className="tile"
          key={`${item.name}-link`}
          to={`/${item.routeId}`}
          activeStyle={{ color: "#EE1D23" }}
        >
          <img className="icon" src={`/images/${item.image}`} alt="" />
          <div className="section">{item.name}</div>
        </NavLink>
      ))
      }
    </div >
  )
}

export default Navbar;