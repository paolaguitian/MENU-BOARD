import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import MainMenu from './components/MainMenu';

const App = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [menuReq, sectionReq, itemReq] = await Promise.all([
        axios.get('/api/menu'),
        axios.get('/api/sections'),
        axios.get('/api/items')
      ]).catch(console.error)

      const menuIds = menuReq.data.options.map(({ _key } = {}) => _key);
      const allData = sectionReq.data.reduce((acc, item) => {
        //grab sections only on the given menu (BK)
        if (menuIds.includes(item._id)) { //refactor to .some
          const sectionName = item.name.en;
          const routeId = sectionName.split(' ').join('-'); //made for router id
          const sectionItemsId = item.options.map(({ _key }) => _key);

          //grab items from sections
          const sectionItems = itemReq.data.reduce((acc, item) => {
            if (sectionItemsId.includes(item._id)) { //refactor to .some
              acc[item._id] = {
                name: item.name.en,
                image: item.image.asset._ref,
              }
            }
            return acc;
          }, {})

          //Cleand/Needed Data: section name, section image, and items
          acc[routeId] = {
            name: sectionName,
            carouselImage: item.carouselImage,
            image: item.image,
            items: sectionItems
          }
        }

        return acc;
      }, {})
      setData(allData);
    }

    fetchData();
  }, []);

  console.log(data);
  return (
    <Router>
      <Switch>
        <div className="main">
          <Navbar
            items={data}
          />
          <Route exact path='/' component={MainMenu} />
          <Route exact path='/menu/:section' component={MainMenu} />
        </div>
      </Switch>

    </Router>
  )
}



export default App;