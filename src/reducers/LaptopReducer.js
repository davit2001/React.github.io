const inititalState = {
    itemsLaptop:[],
    itemLaptop:  {
      "id": "",
      "type":"",
      "name": "",
      "model": "",
      "img": "",
      "Colors": {},
      "parameter": {
        "ram": [],
        "memory": [],
        "processor": [],
        "year":"",
        "color": "",
        "AvailableColors": {}
      },
      "price": [],
      "Price": 0,
  },
  laptopInfo:[]
}

const laptopReducer = (state = inititalState, action) => {
  switch(action.type) {
    case 'FETCH_ITEM_LAPTOP': 
    return {
        ...state,
       itemsLaptop: action.payload.item
    }
    case "FETCH_LAPTOP_PAGE": 
    return {
      ...state,
       itemLaptop: action.payload.item
    }
    case "FETCH_LAPTOP_INFO":
      return {
        ...state,
        laptopInfo: action.payload
      }
    case "FETCH_LAPTOP_FILTER": 
    let newArray = []; 
		let uniqueObject = {}; 
        
        for (let i in action.payload ) { 
          let objTitle = action.payload[i]['id']; 
          uniqueObject[objTitle] = action.payload[i];
        } 
        
        for (let i in uniqueObject) { 
             newArray.push(uniqueObject[i]); 
        } 
     return {
       ...state,
       itemsLaptop: newArray
     }  
    default: return state; 
  }
}

export default laptopReducer