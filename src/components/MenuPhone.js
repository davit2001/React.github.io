import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {fetchPhoneFilter} from '../action'
export default function MenuPhone() {
    const [phone,setPhone] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory()
    
const togglePhone = () => {
    setPhone(!phone)
}

const [togglePhoneBrand,setTogglePhoneBrand] = useState(false);

const handleSetPhoneBrand = () => {
  setTogglePhoneBrand(!togglePhoneBrand)
   
}

const [phoneParameter,setPhoneParameter] = useState(false);

const togglePhoneParameter = () => {
  setPhoneParameter(!phoneParameter)
}

const phoneInfo = useSelector(state=>state.phone.phoneInfo);
 const phoneBrand = phoneInfo.brand;
const phoneRam = phoneInfo.ram;
const phoneMemory = phoneInfo.memory

const [activeBrand,setActiveBrand] = useState([]);
const [activeRam,setActiveRam] = useState([]);

const setBrand =  (id) => {
 let index = activeBrand.indexOf(id);
 let str = [...activeBrand];
  str.splice(index,1);
  
   index !== -1 ? setActiveBrand([...str]) : setActiveBrand([...activeBrand,id])
   let newActiveBrand = index !== -1 ? [...str] : [...activeBrand,id]
   
   dispatch(fetchPhoneFilter(newActiveBrand,activeRam,activeMemory))
   history.push({
     "pathname": '/Phone',
     "phone": newActiveBrand,
     "ram": activeRam,
     "memory": activeMemory  
   })
 }
 

const setRam =  (id) => {

  let index = activeRam.indexOf(id);
  let str = [...activeRam];
   str.splice(index,1);
  
  index != -1 ? setActiveRam([...str]) : setActiveRam([...activeRam,id])
  let newActiveRam = index !== -1 ? [...str] : [...activeRam,id];
  dispatch(fetchPhoneFilter(activeBrand,newActiveRam,activeMemory))
  history.push({
    "pathname": '/Phone',
     "phone": activeBrand,
     "ram": newActiveRam,
     "memory": activeMemory  
   })

 }

 const [activeMemory,setActiveMemory] = useState([])

 const setMemory =  (id) => {
  let index = activeMemory.indexOf(id);
  let str = [...activeMemory];
  str.splice(index,1);
   index !== -1 ? setActiveMemory([...str]) : setActiveMemory([...activeMemory,id])
 let newActiveMemory = index !== -1 ? [...str] : [...activeMemory,id];

  dispatch(fetchPhoneFilter(activeBrand,activeRam,newActiveMemory))
  history.push({
   "pathname": '/Phone',
    "phone": activeBrand,
    "ram": activeRam,
    "memory": newActiveMemory  
  })
 }
 
    return (
        <>
         <button  className="PhoneListButton">
                   <h1>Phone</h1> 
                   <span onClick={togglePhone}>&#10097;</span> 
             </button>  
              <div className="phoneListParameter">
               {phone && 
               <h2 className="phoneBrandsTitle">
                <span>Brands</span><button onClick={handleSetPhoneBrand}>&#x21E8;</button>
               </h2>
              }
              { togglePhoneBrand && phone &&
               <div className="phoneBrands">
                <ul>
                 {Object.keys(phoneBrand).map((elem,i)=>{
                return(
                  <li className={activeBrand.indexOf(elem) !== -1 ? "active" : ""} key={i} onClick={()=>setBrand(elem)}>
                    <img src={phoneBrand[elem]} width="25px" height="25px" alt=""/>
                  </li>)   
                })}   
               </ul>
             </div>
            }
            {phone && 
             <h2 className="phoneParameterTitle">
               <span>Parameter</span><button onClick={togglePhoneParameter}>&#x21E8;</button>
            </h2>}
               {phoneParameter && phone && <div className="phoneParameter">
                <h4>Ram:</h4>
               <ul>
               {phoneRam.map((elem,id)=>{
                return(
                <li key={id} className={activeRam.indexOf(elem) !== -1 ? "active" : ""}  onClick={()=>setRam(elem)}>{elem}</li>
                )   
               })}   
              </ul>
              <h4>Memory:</h4>
              <ul>
               {phoneMemory.map((elem,id)=>{
                return(
                <li key={id} className={activeMemory.indexOf(elem) !== -1 ? "active" : "" } onClick={()=>setMemory(elem)}>{elem}</li>
                )   
               })}   
              </ul>
              </div>} 
            </div>   
        </>
    )
}
