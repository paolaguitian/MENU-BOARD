import React, { useEffect, useState } from 'react';
import axios from 'axios';


const App = () => {
  const [category, setCategory] = useState('');

  useEffect(() => {
    const menuReq = axios.get('/api/menu')
    const sectionReq = axios.get('/api/sections')

    const fetchData = async () => {
      await Promise.all([menuReq, sectionReq]).then(([res1, res2] = []) => {
        const menu = res1.data.options.map(({ _key } = {}) => _key)
        const sections = res2.data.reduce((acc, item) => {
          if (menu.includes(item._id)) {
            return [
              ...acc,
              {
                name: item.name.en,
                carouselImage: item.carouselImage,
                image: item.image,
                itemKey: item.options.map(({ _key }) => _key),
              }
            ]
          }
          return acc;
        }, [])
        setCategory(sections);
      })
    }

    fetchData();
  }, []);

  console.log(category);
  return (
    <div>
      hellooo
      testing

    </div>
  )
}

export default App;