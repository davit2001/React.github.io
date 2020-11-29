import React, { useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory, useLocation} from "react-router-dom"
import {fetchItemsPhone,fetchPriceFilter,fetchFilterName,fetchPhoneFilter} from '../action'

export default function Item() {
  let param = useLocation();
  
  const phone = useSelector(state => state.phone.itemsPhone);
  const dispatch = useDispatch();
  const [mounted,setMounted] = useState(false);
  
 useEffect(() => {
   if (!mounted) {
    dispatch(fetchItemsPhone())
    setMounted(true)
   }
  (param.phone || param.ram || param.memory) && dispatch(fetchPhoneFilter(param.phone,param.ram,param.memory))
  },[mounted])

  const history = useHistory()
   const handleClick = (item) => {
    history.push(`/ItemPhone/${item.id}`)
   }  
   
  
 const [sortItem,setSortItem] = useState("");
   const handleSortItem = (e) => {
    if (e.target.value == "Price") {
       dispatch(fetchPriceFilter(e.target.value))
     } else if (e.target.value == "Name") {
       dispatch(fetchFilterName(e.target.value))
     } else if (e.target.value == "All") {
       dispatch(fetchItemsPhone())
     }
   }
    
   
   
    return (
       <div className="Phone">
         <div className="PhoneFilter">
           <select onChange={handleSortItem}>
             <option>Default</option>
             <option>All</option>
             <option>Price</option>
             <option>Name</option>
          </select>
         </div>
        <div className="PhoneCentre">
          {phone.map(item=> {
           
           return (
               <div className = "PhoneItem" key={item.id}>
                   
           <h1>{item.name} {item.model}</h1>
                   <img  onClick={()=>handleClick(item)} src={item.img} width="200px" height="200px" alt={`Phone Image ${item.id}`} />
                   <h1>{item.price[0]}$</h1>
                  
               </div>
               
           )
            })}
        </div>
    </div> 
     )
}
