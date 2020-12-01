import data from '../JSONSERVER/db.json'

const inititalState = {
    itemsPhone: [],
    itemPhone:  {
        "id": "",
        "name": "",
        "model": "",
        "img": "",
        "Colors": {},
        "parameter": {
          "ram": [],
          "memory": [],
          "year":"",
          "color": "",
          "AvailableColors": {}
        },
        "price": []
      },
    newPhoneItem:[],
    menuListItem:[],
    totalItem:[],
    searchItem:[],
    phoneInfo: {},
    orderPrice:0,
    orderCount:0,
}

const itemReducer = (state = inititalState,action) => {
    switch(action.type) {
        case 'FETCH_ITEM_BEGIN': {
            return {
                ...state,
                loading:true
            }
        }

        case 'FETCH_ITEMS_PHONE': 
        return {
            ...state,
            loading: false,
            itemsPhone: action.payload.item,
        }

        case "FETCH_ITEM_PHONE": 
        return {
            ...state,
            itemPhone: action.payload.item
        }
        
        case "FETCH_ITEM_ORDER": 
        let newState = state
        state.orderPrice += Number(action.payload.item.price)
       state.orderCount += action.payload.item.count
        let index = state.newPhoneItem.findIndex(elem=>elem.price == action.payload.item.price)
        if(index !== -1) {
            state.orderCount += Number(newState.newPhoneItem[index].count)
            newState.newPhoneItem[index].count++
         } else {
            newState.newPhoneItem.push(action.payload.item) 
        }  
         return {
            ...newState,
         }
        
        case "FETCH_TOTAL_ITEM":
         return {
             ...state,
             totalItem: action.payload
         }   
   case "FETCH_ITEM_REMOVE":
       state.orderPrice -= Number(action.payload.price)
       state.orderCount -= action.payload.count
   return {
       ...state,
       newPhoneItem:state.newPhoneItem.filter((x)=>  x.price  !== action.payload.price)
    }
    case "FETCH_ITEM_SEARCH": 
    return {
        ...state,
        searchItem: action.payload
    }
    case "FETCH_PHONE_INFO":
      return {
          ...state,
          phoneInfo:action.payload
      }  
    case "FETCH_PHONE_FILTER":
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
            itemsPhone: newArray
        }  
    
    case "FETCH_PHONE_MEMORY":
        let phoneMemory = [];
        let phoneItem = [...state.itemsPhone];
         action.payload.map(item=>{
            let filterMemory = state.itemsPhone.filter((elem)=>elem.parameter.memory.indexOf(item) > -1);
            
            phoneMemory = phoneMemory.concat(filterMemory);
         })
            
        return {
               ...state,
               itemsPhone: action.payload.length === 0 ? phoneItem : phoneMemory
           } 
            
    case "FETCH_MENU_LIST":
        return {
           ...state,
           menuListItem:action.payload.item 
        } 
    case "FETCH_PRICE_FILTER": 
    let dataPhone = [...state.itemsPhone]
    dataPhone.sort((a, b) => (a.Price > b.Price) ? 1 : -1)
       return {
        ...state,
          itemsPhone:  [...dataPhone]
       } 

    case "FETCH_NAME_FILTER":
        let dataPhoneName = [...state.itemsPhone];
        dataPhoneName.sort((a,b)=> (a.name > b.name) ? 1: -1) 
      return {
          ...state,
          itemsPhone: [...dataPhoneName]
      }  

      default: return state
    }
}
export default itemReducer