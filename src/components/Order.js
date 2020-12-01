import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemRemove } from '../action';


export default function Order() {
   let dispatch = useDispatch();
   const items = useSelector(state=>state.phone.newPhoneItem);
   const Price = useSelector(state=>state.phone.orderPrice)
   const Count = useSelector(state=>state.phone.orderCount)
   const RemoveItem = (item) => {
      //console.log(item);
     dispatch(fetchItemRemove(item))
   }
   
   
   
   return (
        <div className="OrderContainer">
           <div className="OrderCenterContainer">
           <h1>Your Items {Count}</h1>
           <h1>{items.length === 0 && "No Items Found"}</h1>
           {
             items.map((item,id)=> {
               return(
                  <div className="OrderItem" key={id}>
                  <div className="OrderImg">
                     <img src={item.img} width="150px" height="170px" alt="Img" />
                  </div>
                 <div className="OrderParameter">
                 <h1>{item.name} {item.model}</h1>
                 <h3>Ram: {item.ram}</h3>
                 <h3>Memory:{item.memory}</h3>
                 <h3>Color: {item.color}</h3>
                  <h3>Price: {item.price}$</h3>
                  <h3>Count: {item.count} </h3>
           <div className="Buy_Delete">
                  <div className="Buy">
                 <button className="PhoneBuy" >
                  <span className="ico"></span> 
                  <p className="icoText">Buy</p>
                 </button>
              </div>
              <div className="Remove" onClick={()=>RemoveItem(item)}>
                 <button className="PhoneDelete" >
                  <span className="icoDelete"></span> 
                  <p className="icoDeleteText">Remove</p>
                 </button>
              </div>
         </div>
             </div>
             

              </div>
               )
             })
           }
            {items.length !== 0 && <h2>Total: ${Price}</h2> } 
           </div> 
        </div>
    )
}