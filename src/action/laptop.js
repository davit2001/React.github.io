import { MemoryRouter } from 'react-router-dom'
import data from '../JSONSERVER/db.json'
export function fetchItemLaptop() {
    return {
        type: 'FETCH_ITEM_LAPTOP',
        payload: {
          item:data.Laptop,
        } 
     }
 }
     export function fetchLaptopPage(itemId) {
    return {
      type: "FETCH_LAPTOP_PAGE",
      payload: {
        item: data.Laptop.find(elem=>elem.id === itemId.toString())
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

  export function fetchLaptopInfo() {
    return {
      type: "FETCH_LAPTOP_INFO",
      payload:data.LaptopInfo[0]
    }
  }

  export function fetchLaptopFilter(activeBrand,activeProcessor,activeRam,activeMemory) {
   
    let laptop = [];
     if (activeBrand.length != 0) {
      for (let brand of activeBrand) {
        let filterLaptop = data.Laptop.filter(elem=>elem.name.toLowerCase() === brand)
        laptop = [...laptop, ...filterLaptop]
      }
    
    } else {
      laptop = [...data.Laptop]
    }

    let laptopProcessor = []
    if (activeProcessor.length != 0 ) {
      for (let Processor of activeProcessor) {
        let filterProcessor = laptop.filter(elem=>elem.parameter.processor.indexOf(Processor) > -1)
        laptopProcessor = [...laptopProcessor,...filterProcessor]
      }
    } else {
      laptopProcessor = [...laptop]
    }

    let laptopRam = []
    if (activeRam.length != 0) {
      for (let Ram of activeRam) {
        let filterRam = laptop.filter(elem=>elem.parameter.ram.indexOf(Ram) > -1)
        laptopRam = [...laptopRam,...filterRam]
      }
    } else {
      laptopRam = [...laptopProcessor]
    }
    let laptopMemory = []
    if (activeMemory.length != 0) {
       for (let Memory of activeMemory) {
         let filterMemory = laptopRam.filter(elem=>elem.parameter.memory.indexOf(Memory) > -1)
         laptopMemory = [...laptopMemory, ...filterMemory]
       }
    } else {
      laptopMemory = [...laptopRam]
    }

    return {
      type: "FETCH_LAPTOP_FILTER",
      payload: activeBrand.length == 0 && activeProcessor.length == 0 && activeRam.length == 0 && activeMemory.length == 0 ? data.Laptop : laptopMemory
    }
  }

  export  function fetchPriceSort() {
   return {
      type:"FETCH_PRICE_SORT"
    }
  }
  export function fetchNameSort() {
  
    return {
      type:"FETCH_NAME_SORT",
    }
}

  
     
 