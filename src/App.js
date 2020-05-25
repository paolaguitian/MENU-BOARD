import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import ItemList from './components/ItemList/ItemList';
import NotAvailable from './components/NotAvailable/NotAvailable';
import FullPageLoader from './components/FullPageLoader/FullPageLoader';
import isEmpty from 'lodash.isempty';
import fetchData from './services/fetchDataService';


const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData().then(allData => setData(allData));

  }, []);

  const renderApp = () => (
    <Router>
      <Switch>
        <>
          <Navbar data={data} />
          <Route exact path='/' render={() => <ItemList data={data} />} />
          <Route exact path='/:category' render={() => <ItemList data={data} />} />
          <Route exact path='/:category/comingsoon' render={() => <NotAvailable message='COMING SOON' />} />
        </>
      </Switch>
    </Router>
  )

  return (
    <div className="main">
      {isEmpty(data) ? <FullPageLoader /> : renderApp()}
    </div>
  )
}

export default App;
