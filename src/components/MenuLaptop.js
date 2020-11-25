import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {fetchLaptopFilter} from '../action/laptop'
export default function MenuLaptop() {
 const history = useHistory()
 const dispatch = useDispatch()
 const [laptop,setLaptop] = useState(false);

 const toggleLaptop = () => {
  setLaptop(!laptop)
  history.push("/Laptop")
}
const [toggleLaptopBrand,setToggleLaptopBrand] = useState(false);

const handleSetLaptopBrand = () => {
  setToggleLaptopBrand(!toggleLaptopBrand)
   
}
const [laptopParameter,setLaptopParameter] = useState(false);

const toggleLaptopParameter = () => {
  setLaptopParameter(!laptopParameter)
}

const laptopInfo = useSelector(state=>state.laptop.laptopInfo);
const laptopProcessor = laptopInfo.processor;
const laptopBrand = laptopInfo.brand;
const laptopRam = laptopInfo.ram;
const laptopMemory = laptopInfo.memory

const [activeBrand,setActiveBrand] = useState([])
const setBrand = (elem) => {
 let index  = activeBrand.indexOf(elem);
 let str = [...activeBrand];
 str.splice(index,1);
 index !== -1 ? setActiveBrand([...str]) : setActiveBrand([...activeBrand,elem])
 let newActiveBrand = index !== -1 ? [...str] : [...activeBrand,elem]
 dispatch(fetchLaptopFilter(newActiveBrand,activeProcessor,activeRam,activeMemory))

}

const [activeProcessor,setActiveProcessor] = useState([]);
const setProcssor = (elem) => {
 let index  = activeProcessor.indexOf(elem);
 let str = [...activeProcessor];
 str.splice(index,1);
 index !== -1 ? setActiveProcessor([...str]) : setActiveProcessor([...activeProcessor,elem]);
 let newActiveProcessor = index !== -1 ? [...str] : [...activeProcessor,elem];
 dispatch(fetchLaptopFilter(activeBrand,newActiveProcessor,activeRam,activeMemory))
}

const [activeRam,setActiveRam] = useState([])
const setRam = (elem) => {
  let index = activeRam.indexOf(elem);
  let str = [...activeRam];
  str.splice(index,1);
  index !== -1 ? setActiveRam([...str]) : setActiveRam([...activeRam,elem])
  let newActiveRam = index !== -1 ? [...str] : [...activeRam,elem]
  dispatch(fetchLaptopFilter(activeBrand,activeProcessor,newActiveRam,activeMemory))
}

const [activeMemory,setActiveMemory] = useState([])
 const setMemory = (elem) => {
   let index  = activeMemory.indexOf(elem);
   let str = [...activeMemory];
   str.splice(index,1);
   index !== -1 ? setActiveMemory([...str]) : setActiveMemory([...activeMemory,elem])
   let newActiveMemory = index !== -1 ? [...str] : [...activeMemory,elem]
   dispatch(fetchLaptopFilter(activeBrand,activeProcessor,activeRam,newActiveMemory))
 }
    return (
        <>
          <button  className="LaptopListButton">
                   <h1>Laptop</h1> 
                   <span onClick={toggleLaptop}>&#10097;</span> 
          </button>
             <div className="laptopListParameter">
               {laptop && 
               <h2 className="laptopBrandsTitle">
                <span>Brands</span><button onClick={handleSetLaptopBrand}>&#x21E8;</button>
               </h2>
              }
              { toggleLaptopBrand && laptop &&
               <div className="laptopBrands">
                <ul>
                 {Object.keys(laptopBrand).map((elem,id)=>{
                return(
                  <li key={id} className={activeBrand.indexOf(elem) !== -1 ? "active" : ""} onClick={()=>setBrand(elem)} >
                    <img src={laptopBrand[elem]} width="35px" height="25px" alt=""/>
                  </li>)   
                })}   
               </ul>
             </div>
            }
            {laptop && 
             <h2 className="laptopParameterTitle">
               <span>Parameter</span><button onClick={toggleLaptopParameter}>&#x21E8;</button>
            </h2>}
               {laptopParameter && laptop && <div className="laptopParameter">
               <h4>Processor:</h4>
                 <ul>
                   {laptopProcessor.map((elem,id)=>{
                     return(
                     <li key={id} className={activeProcessor.indexOf(elem) !== -1 ? "active" : ""} onClick={()=>setProcssor(elem)}>{elem}</li>
                     )
                   })}
                 </ul>
                <h4>Ram:</h4>
               <ul>
               {laptopRam.map((elem,id)=>{
                return(
                 <li key={id} className={activeRam.indexOf(elem) !== -1 ? "active" : ""} onClick={()=>setRam(elem)}>{elem}</li>
                )   
               })}   
              </ul>
              <h4>Memory:</h4>
              <ul>
               {laptopMemory.map((elem,id)=>{
                return(
                <li key={id} className={activeMemory.indexOf(elem) !== -1 ? "active" : ""} onClick={()=>setMemory(elem)}>{elem}</li>
                  )   
                 })}   
               </ul>
              </div>} 
            </div>  
        </>
    )
}
