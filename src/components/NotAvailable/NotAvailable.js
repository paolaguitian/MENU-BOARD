import React from 'react';
import './NotAvailable.css'

const NotAvailable = (props) => {
  const { message } = props || '';

  return (
    <div className='no-items'>
      <div className="message">{message}</div>
      <img className="icon" src="/images/logo.png" alt="BK" />
    </div>
  )
}

export default NotAvailable;