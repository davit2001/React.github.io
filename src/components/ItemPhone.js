import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory, useParams} from 'react-router-dom'
import {fetchItemOrder,fetchItemPhone} from '../action/index'
export default function ItemPhone() {
    const history = useHistory();
    const dispatch = useDispatch();

    let params = useParams();
    let itemId = params.itemId;
 
    useEffect(()=>{
        dispatch(fetchItemPhone(itemId))
        return () => {
           
        }
    },[itemId])
    
    let item = useSelector(state => state.phone.itemPhone);
   
    const [count,setCount] = useState(1);
    const ram =item.parameter.ram;
    const memory = item.parameter.memory;

   let [Price,setPrice] = useState();
   
  const AvailableColors = Object.values(item.parameter.AvailableColors);
  
   const increment = () => {
        setCount(count + 1)
        setPrice(Number(activeColor*50)+(Number(activeMemory*20)+Number(item.price[activeRam]))*(count+1))
    } 

    const decrement = () => {
        if (count > 1) {

            setCount(count - 1)
            setPrice(Number(activeColor*50)+(Number(activeMemory*20)+Number(item.price[activeRam]))*(count-1))
     
        }
        
    } 
   


   const handleOrderClick = () => {
       Color = Color === '' ? item.parameter.color : Color;
       Ram = Ram === '' ? ram[0] : Ram;
       Memory = Memory === '' ? memory[0] : Memory;
       Price = Price === undefined ? item.price[0] : Price;

    let itemInfo = {
        "id":item.id,
        "count":count,
        "name": item.name,
        "model": item.model,
        "img": item.Colors[Color],
        "color": Color,
        "ram": Ram,
        "memory":Memory,
        "price": Price
    }
    
   dispatch(fetchItemOrder(itemInfo))
     history.push('/Order')
   } 
   
  
let [Color,setColor] = useState("")
let [Ram,setRam] = useState("");
let [Memory,setMemory] = useState("");

const [activeRam,setActiveRam] = useState(0);
const [activeMemory,setActiveMemory] = useState(0);

const [activeColor,setActiveColor] = useState(0);

const handleSetRam = (elem,id) => {
    setRam(elem);
    setPrice(Number(activeColor*50)+Number(activeMemory*20)+Number(item.price[id])*count)
    setActiveRam(id)
}

const handleSetMemory = (elem,id) => {
    setMemory(elem);
    setActiveMemory(id)
    setPrice(Number(activeColor*50)+Number(id*20)+Number(item.price[activeRam])*count)
}

const handleSetColor = (elem,id) => {
    setColor(elem)
    setActiveColor(id)
    setPrice(Number(id*50)+Number(activeMemory*20)+Number(item.price[activeRam])*count)
}

 
    return (
        <div className="PhoneConatiner">
            <div className="PhoneConatinerCenter">
                <div className="PhoneImageNav">
                <img width="350px" height="400px" src={ Color? item.Colors[Color] : item.img}  alt="PhoneImg"/>
            </div> 
                <div className="PhoneConatinerParameter">
                    <div className="PhonePrice">
                <h1>{item.name}</h1>
                <h1>{item.model}</h1>
               <h1>Price: {Price == undefined ? item.price[0]: Price}$</h1>
               <button onClick={decrement}>-</button>
               {count}
               <button onClick={increment}>+</button>  
                </div>
               <hr />
               <div className="PhoneParameter">
               <h4 className= "PhoneRam"><span>Ram:</span> {ram.map((item,id)=> {
                  return(
                   <li key={id} className = {activeRam == id ? "active": ""} onClick={()=>handleSetRam(item,id)}>{item}</li>
                  )
              })}</h4>

              <h4 className="PhoneMemory"> <span>Memory:</span> {memory.map((item,id)=> {
                  return(
                  <li key={id} className = {activeMemory === id ? "active": ""} onClick={()=>handleSetMemory(item,id)}>{item}</li>
                  )
              })}</h4> 
               <h4>Announcement Year: {item.parameter.year}</h4>
               <h4>Color: {Color? Color : item.parameter.color}</h4>
            <h4 className="PhoneAvailableColors"><span>Available Color: </span>{AvailableColors.map((item,id)=> {
                return(
                    <li key={id} className={activeColor == id ? "active" : ""} onClick={()=>handleSetColor(item,id)} style={{backgroundColor:`${item}`}}></li>
                )
            })}</h4>
               </div>
              
               <button className="PhoneBuy" onClick={handleOrderClick}>
                  <span className="ico"></span> 
                  <p className="icoText">Buy</p>
              </button> 
              
             </div>
               
             </div>   
        </div>
    )
}
