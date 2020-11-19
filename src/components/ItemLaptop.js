import React,{useState} from 'react'
import { useLocation } from 'react-router-dom'

export default function ItemLaptop() {
    const location = useLocation()
    const item = location.state.item
    const [count,setCount] = useState(1);
    const price = parseInt(item.price) * count;

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    return (
        <div className="LaptopConatiner">
            <div className="LaptopConatinerCenter">
                <div className="LaptopImageNav">
                <img width="500px" height="450px" src={item.img}  alt="LaptopImg"/>
                </div>
                <div className="LaptopConatinerParameter">
                    <div className="LaptopPrice">
                <h1>{`${item.name} ${item.model}`}</h1>
                <h1>Price: {price}$</h1>
                <button onClick={increment}>+</button> {count} 
               <button onClick={decrement}>-</button>
               </div>
               <hr />
               <div className="LaptopParameter">
               <h4>Screen: {item.parameter.screen} inch</h4>
               <h4>Processor: {item.parameter.processor}</h4>
               <h4>Ram: {item.parameter.ram}</h4>
               <h4>Memory: {item.parameter.memory}</h4>
               <h4>Announcement Year: {item.parameter.year}</h4>
               <h4>Colors: {item.parameter.color}</h4>
               </div>
              
                </div>
               
             </div>   
        </div>
    )
}
