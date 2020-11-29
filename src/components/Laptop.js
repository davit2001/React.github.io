import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation} from 'react-router-dom'
import { fetchItemLaptop,fetchPriceSort,fetchNameSort,fetchLaptopFilter } from '../action/laptop';

export default function Laptop() {
    // const location = useLocation()
    // console.log(location);
    const Laptop = useSelector(state => state.laptop.itemsLaptop);
    const dispatch = useDispatch();
    const param = useLocation()
    let [mounted,setMounted] = useState()

    useEffect(() => {
      if (!mounted) {
        dispatch(fetchItemLaptop())
      }
       (param.laptop || param.processor || param.ram || param.memory) && dispatch(fetchLaptopFilter(param.laptop,param.processor,param.ram,param.memory))
    }, [])
    
    let history = useHistory()
    const handleClick = (item) => {
      history.push(`/ItemLaptop/${item.id}`)
    }
    const handleSort = (e) => {
      if (e.target.value == 'Price') {
        dispatch(fetchPriceSort())
      } else if (e.target.value == 'Name') {
        dispatch(fetchNameSort())
      } else if (e.target.value == 'All') {
        dispatch(fetchItemLaptop())
      }
    }
    return (
        <div className="Laptop">
            <div className="LaptopSort">
                <select onClick={handleSort}>
                    <option>Default</option>
                    <option>All</option>
                    <option>Name</option>
                    <option>Price</option>
                </select>
            </div>
           {Laptop.map(item=> {
            return (
                <div className="LaptopItem" key={item.id} onClick={()=>handleClick(item)}>
                    <h1>{item.name} {item.model}</h1>
                     <img src={item.img} width="200px" height="200px" alt={`Phone Image ${item.id}`} />
                </div>   
            )
          })}
        
          
        </div>
    )
}
