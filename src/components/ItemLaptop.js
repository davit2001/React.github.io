import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MemoryRouter, useHistory, useParams } from 'react-router-dom'
import {fetchLaptopPage,fetchItemOrder} from '../action/laptop'

export default function ItemLaptop() {
   
    let param = useParams()
    let itemId = param.itemId
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(()=>{
        dispatch(fetchLaptopPage(itemId))
        
    },[itemId])
    
    let item = useSelector(state => state.laptop.itemLaptop);
    
    const [count,setCount] = useState(1);
    const price = parseInt(item.price) * count;
    const [Price,setPrice] = useState()
    const increment = () => {
        setCount(count + 1)
       setPrice((Number(activeMemory*150) + Number(activeRam*100) + Number(activeColor*50) + Number(item.price[activeProcessor]))*(count+1))
    }

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1)
            setPrice(Number(activeMemory*150) + Number(activeRam*100) + Number(activeColor*50) + Number(item.price[activeProcessor]*(count-1)))
        }
    }
    let processor = item.parameter.processor
    let ram = item.parameter.ram
    let memory = item.parameter.memory
    let availableColors = Object.values(item.parameter.AvailableColors)
    let [Color,setColor] = useState()
    let [activeProcessor,setActiveProcessor] = useState(0)
    let [activeRam,setActiveRam] = useState(0)
    let [activeMemory,setActiveMemory] = useState(0)
    let [activeColor,setActiveColor] = useState(0);
    let [Processor,setProcessor] = useState("");
    let [Ram,setRam] = useState("");
    let [Memory,setMemory] = useState("")

    const handleSetProcessor = (elem,id) => {
        setActiveProcessor(id)
        setPrice((Number(activeMemory*150)+Number(activeRam*100)+Number(activeColor*50)+Number(item.price[id]))*count)
    }

   const handleSetRam = (elem,id) => {
       setActiveRam(id)
       setPrice((Number(id*100) + Number(item.price[activeProcessor]) + Number(activeMemory*150) + Number(activeColor*50))*count)
    }

   const handleSetMemory = (elem,id) => {
       setActiveMemory(id)
       setPrice((Number(id*150) + Number(activeRam*100) + Number(activeColor*50) + Number(item.price[activeProcessor]))*count)
    }
 /*
 
  gimarman jamanak color - i gin@ chi ashxatum
  
  */
   const handleSetColor = (elem,id) =>{
       setColor(elem)
       setActiveColor(id)
       setPrice((Number(id*50) + Number(activeRam*100) + Number(activeMemory*150) + Number(item.price[activeProcessor]))*count)
    }

   const handleOrderClick = ()=>{
       console.log();
      
       let itemInfo = {
          "id":item.id,
           "count":count,
           "name": item.name,
           "img": item.Colors[Color] == undefined ? item.img : item.Colors[Color],
           "color": Color == undefined ? item.parameter.color: Color,
           "processor": Processor == '' ? processor[0] : Processor,
           "ram": Ram == '' ? ram[0]: Ram,
           "memory": Memory == '' ? memory[0]: Memory,
           "price": Price == undefined ? price : Price  
       }
     dispatch(fetchItemOrder(itemInfo))
     history.push('/Order')
   }
    return (
        <div className="LaptopConatiner">
            <div className="LaptopConatinerCenter">
                <div className="LaptopImageNav">
                <img width="500px" height="450px" src={Color? item.Colors[Color] : item.img}  alt="LaptopImg"/>
                </div>
                <div className="LaptopConatinerParameter">
                  <h1>{`${item.name} ${item.model}`}</h1>
               <div className="LaptopPrice">
                 <h1>Price: {Price == undefined ? price : Price}$</h1>
                 <button onClick={decrement}>-</button>
                 {count}
                 <button onClick={increment}>+</button>  
               </div>
               <hr />
               <div className="LaptopParameter">
                   <div className="LaptopProcessor">
                   <h4> <span>Processor:</span>  {processor.map((elem,id)=>{
                           return(
                           <li key={id} className={activeProcessor == id ? "active" : ""} onClick={()=>handleSetProcessor(elem,id)}>{elem}</li>
                           )
                         })}
                      </h4>  
                   </div>
                   <div className="LaptopRam">
                       <h4> <span>Ram:</span>  {ram.map((elem,id)=>{
                           return(
                           <li key={id} className={activeRam == id ? "active" : ""} onClick={()=>handleSetRam(elem,id)}>{elem}</li>
                           )
                         })}
                      </h4>
                   </div>

                   <div className="LaptopMemory">
                       <h4> <span>Memory:</span>  {memory.map((elem,id)=>{
                           return(
                           <li key={id} className={activeMemory == id ? "active" : ""} onClick={()=>handleSetMemory(elem,id)}>{elem}</li>
                           )
                         })}
                      </h4>
                   </div>
              <h4 className="Year">Announcement Year: {item.parameter.year}</h4>
              <h4 className="Color">Color: {Color ? Color :item.parameter.color}</h4>
              <h4 className="PhoneAvailableColors"><span>Available Color: </span>{availableColors.map((item,id)=> {
                return(
                    <li className={activeColor == id ? "active" : ""} key={id} style={{backgroundColor:`${item}`}} onClick={()=>handleSetColor(item,id)}></li>
                  )
                })}</h4>
              </div>
               <button className="LaptopBuy">
                  <span className="ico"></span> 
                  <p className="icoText" onClick={handleOrderClick}>Buy</p>
              </button>
                </div>
               
             </div>   
        </div>
    )
}
