import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory} from 'react-router-dom'
import { fetchItemLaptop } from '../action/laptop';

export default function Laptop() {
    // const location = useLocation()
    // console.log(location);
    const Laptop = useSelector(state => state.laptop.itemsLaptop);
    const dispatch = useDispatch();
  

    useEffect(() => {
        dispatch(fetchItemLaptop())
    }, [])
    
    let history = useHistory()
    const handleClick = (item) => {
      history.push(`/ItemLaptop/${item.id}`)
    }
    
    return (
        <div className="Laptop">
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
