import axios from 'axios';

const reduceItemResponse = (itemRes, itemsIds) => {
  return itemRes.data.reduce((acc, item) => {

    //grab items only on the given section
    if (itemsIds.some(id => id === item._id)) {
      acc[item._id] = {
        name: item.name.en,
        cardImage: item.image.asset._ref,
      }
    }

    return acc;
  }, {})
}

//Reduces all 3 Request responses to 1 Object with all needed data
// Object sturcture: section(routeId): {name, image, routeId, cardImage, carouselImage, items: {}}
const reduceData = (sectionRes, itemRes, sectionIds) => {
  return sectionRes.data.reduce((acc, section) => {

    //grab sections only on the given menu (BK)
    if (sectionIds.some(id => id === section._id)) {
      const sectionName = section.name.en;
      const routeId = sectionName.split(' ').join('-').toLowerCase(); //made for router param
      const itemsIds = section.options.map(({ _key }) => _key); //item IDs from sections
      const sectionItems = reduceItemResponse(itemRes, itemsIds)

      // Composed Data Object
      acc[routeId] = {
        id: section._id, //not needed but added it for future reference
        name: sectionName,
        routeId: routeId,
        cardImage: section.image.asset._ref,
        carouselImage: section.carouselImage.asset._ref,
        items: sectionItems
      }
    }

    return acc;
  }, {})
}

const fetchData = async () => {
  const [menuRes, sectionRes, itemRes] = await Promise.all([
    axios.get('/api/menu'),
    axios.get('/api/sections'),
    axios.get('/api/items')
  ]).catch(console.error)

  const sectionIds = menuRes.data.options.map(({ _key } = {}) => _key); //sectionIds for sections
  return reduceData(sectionRes, itemRes, sectionIds)

}

export default fetchData;