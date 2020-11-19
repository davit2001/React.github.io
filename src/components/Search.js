import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function Search() {
    const item = useSelector(state=>state.searchItem)
    const history = useHistory();
    
  const handleClick = (item) => {
    (item.type === "phone") ? history.push(`/ItemPhone/${item.id}`) : history.push(`/ItemLaptop/`,item)
  }
    return (
       <>
       { (item.length !== 0 || item.length !== '') ?  <div className="SearchContainer">
         {item.map(item=> {
             return (
                 <div className = "SearchItem" key={item.id} onClick={()=>handleClick(item)}>
                     
             <h1>{item.name} {item.model}</h1>
                     <img src={item.img} width="200px" height="200px" alt={`Phone Image ${item.id}`} />
                     <h1>{item.price[0]}$</h1>
                    
               </div>
                 
             )
         })}
          

        </div> : <h1 className="SearchError">Not found Item</h1> }
    </>
    )
}

export default Search
