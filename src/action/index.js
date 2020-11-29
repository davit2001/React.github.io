import data from '../JSONSERVER/db.json'


 export function fetchItemsPhone() {
    return {
        type: 'FETCH_ITEMS_PHONE',
        payload: {
          item:data.Phone
        } 
     }
 }

 export function fetchItemPhone(itemId) {
   return {
     type: "FETCH_ITEM_PHONE",
      payload: {
        item: data.Phone.find(elem=>elem.id === itemId.toString())
      } 
   }
 }

export function fetchMenuList(itemId) {
  return {
    type:"FETCH_MENU_LIST",
    payload: {
       item:data.Phone.find(elem=>elem.id === itemId)
    }
  }  
}
 export function fetchItemOrder(itemInfo) {
   return {
     type: "FETCH_ITEM_ORDER",
     payload: {
      item:itemInfo
     }
   }
 }

export function fetchItemRemove(item) {
 return {
   type: "FETCH_ITEM_REMOVE",
   payload: item
 }
}

export function fetchTotalItem() {
  const total = data.Phone.concat(data.Laptop)
  return {
    type:"FETCH_TOTAL_ITEM",
    payload: total
  }
}

export function fetchItemSearch(name) {
  return {
    type:"FETCH_ITEM_SEARCH",
    payload: data.Phone.concat(data.Laptop).filter(elem=>elem.name.toLowerCase() === name.toLowerCase())
  }
}
export function fetchPhoneInfo() {
  return {
    type:"FETCH_PHONE_INFO",
    payload: data.PhoneInfo[0]
  }
}



export function fetchPhoneFilter(activeBrands,activeRam,activeMemory) {
 
 let phone = [];

 if (activeBrands.length != 0) {
  for (let brand of activeBrands) {
    let filterPhone = data.Phone.filter((elem)=> elem.name.toLowerCase() === brand)
    phone = phone.concat(filterPhone);
   }
 } else {
   phone = [...data.Phone]  
 }

  
  let phoneRam = []
  if (activeRam.length != 0) {
  for (let Ram of activeRam) {
    let filterPhone = phone.filter((elem)=> elem.parameter.ram.indexOf(Ram) > -1 );
    phoneRam = phoneRam.concat(filterPhone);
 }
  } else {
    phoneRam = [...phone]
  }
 let phoneMemory = []
 if (activeMemory.length != 0) {
  for (let Memory of activeMemory) {
    let filterMemory = phoneRam.filter((elem)=>elem.parameter.memory.indexOf(Memory) > -1)
    phoneMemory = phoneMemory.concat(filterMemory)
   }
 } else {
  phoneMemory = [...phoneRam]
 }
 
 return {
    type:"FETCH_PHONE_FILTER",
    payload: activeBrands.length == 0 && activeRam.length == 0 && activeMemory.length == 0 ? data.Phone : phoneMemory
  }
}



export function fetchPhoneMemory(activeMemory) {
  return {
    type:"FETCH_PHONE_MEMORY",
    payload: activeMemory
  }
}


export function fetchPriceFilter() {
  return { 
    type:"FETCH_PRICE_FILTER"
  }
}

export function fetchFilterName() {
  return {
    type: "FETCH_NAME_FILTER"
  }
}

 export function fetchItemLaptop() {
    return {
        type: 'FETCH_ITEM_LAPTOP',
        payload: {
          item:data.Laptop,
        } 
     }
 }

 export function fetchItemBegin() {
     return {
         type:"FETCH_ITEM_BEGIN"
     }
 }

 