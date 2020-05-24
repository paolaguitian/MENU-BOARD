import React from 'react';
import './FullPageLoader.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const FullPageLoader = () => {

  const loadingIcon = <LoadingOutlined style={{ fontSize: 70 }} spin />;

  return (
    <div className="load-screen">
      <Spin indicator={loadingIcon} />
       LET'S EAT
      <img className="icon" src="/images/logo.png" alt="BK" />

    </div>
  )
}
export default FullPageLoader;