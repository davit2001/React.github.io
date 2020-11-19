import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import {fetchItemSearch,fetchPhoneInfo,fetchPhoneFilter,fetchPhoneMemory} from '../action'
import data from '../JSONSERVER/db.json'
function Header() {
  useEffect(()=>{
      dispatch(fetchPhoneInfo())
    })

const [search,setSearch] = useState()
const handleChange = (e) => {
    setSearch(e.target.value)
}

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchItemSearch(search))
    history.push('/Search')
}

const history =  useHistory();
const handlGoBack = () => {
 history.goBack()
}
const location = useLocation();
const locationPathName = location.pathname

const handleHomePage = () => {
    history.push('/')
}

const handleOrderPage = () => {
    history.push('/order')
}

const toggleChange = () => {
  setToggle(!toggle)
}
 const [toggle,setToggle] = useState(false);

 
const [phone,setPhone] = useState(false);

const togglePhone = () => {
    setPhone(!phone)
    history.push("/Phone")
}

const [togglebrand,setToggleBrand] = useState(false);

const toggleBrand = () => {
    setToggleBrand(!togglebrand)
   
}

const [phoneParameter,setPhoneParameter] = useState(false);

const togglePhoneParameter = () => {
  setPhoneParameter(!phoneParameter)
}
 const [phoneData,setPhoneData] = useState(data.Phone);
 const [laptopData,setLaptopData] = useState(data.Laptop);
 
 const item = useSelector(state=>state.menuListItem)
 const phoneInfo = useSelector(state=>state.phoneInfo);
 const phoneBrand = phoneInfo.brand;
const phoneRam = phoneInfo.ram;
const phoneMemory = phoneInfo.memory
//  const phoneBrandImg = phoneInfo.map(elem=>{
//    return Object.values(elem.brand)
//  })
// const Img = phoneBrandImg.map(elem=>{
//   return elem
// })
// console.log(Img[0]);
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
    pathname: '/Phone',
    phone:  newActiveBrand, 
    ram: activeRam
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
  pathname: '/Phone',
  state: {
    phone:  activeBrand, 
    ram: newActiveRam
   }
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
 //   history.push("/Phone")
}
 const dispatch = useDispatch();

 //const [phoneItem,setPhoneItem] = useState([]);
//  const handleSetPhoneId = (id) => {
//      let index = phoneItem.indexOf(id)
     
//     let str = [...phoneItem] 
//     str.splice(index, 1)
//     dispatch(fetchMenuList(id))
//     index !== -1 ? setPhoneItem([...str]): setPhoneItem([...phoneItem,id])

//  }
//  {phoneData.map((item,id)=>{
//     return(
//      <div  className="PhoneBrands" key={id}>   
//     <h3><span>{item.name}</span><button onClick={()=>handleSetPhoneId(item.id)}></button></h3>
//     {phoneItem.indexOf(item.id) !== -1  && <li><span>Model:</span> {item.model}<button onClick={toggleParameter}></button></li> }
//   {toggleParam &&  <ul className="PhoneBrandsParameter">
//    <li>Ram:{item.parameter.ram.map(elem=>{return(
//        <span>{elem}</span>
//    )})} 
//    </li>
//    <li>Memory:{item.parameter.memory.map(elem=>{return(
//       <span>{elem}</span>
//    )})}
//    </li>
//    </ul> }
//  </div>
//     )
// })}

 const itemCount = useSelector(state=>state.newPhoneItem.length)
 
    return (
        <>
         { toggle && <div className="menuList">
         <button className="Close" onClick={toggleChange}>X</button>
            
              {/* <h4>Laptop</h4>  */}
              <button  className="menuListButton">
                   <h1>Phone</h1> 
                   <span onClick={togglePhone}>&#10097;</span> 
             </button>  
              <div className="menuListParameter">
               {phone && 
               <h2 className="phoneBrandsTitle">
                <span>Brands</span><button onClick={toggleBrand}>&#x21E8;</button>
               </h2>
              }
              { togglebrand && 
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
               {phoneParameter && <div className="phoneParameter">
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
              
            
           </div>
        } 
        
        <div className="Header" >
            <div className="menu" >
                <img width="60px" height="70px" src="https://goodmade.ru/upload/000/u1/101/39aadfae.png" alt="menu"  onClick={toggleChange}/>
               <h1 onClick={handleHomePage}>My Amazon Store</h1>
            </div>
            <form className="search" onSubmit={handleSubmit}>
              <input name="search" type="text" onChange={handleChange} />
              <input type="submit" value=""/>
            
            </form>
            
            <div className="orderList" onClick={handleOrderPage}>
    <button>
        {itemCount !== 0 &&<span className="orderCount">{itemCount}</span>}
        </button>
            </div>
        </div>
      {
      locationPathName !== '/' && <div className="goBack" onClick={handlGoBack}>
        <button></button>
      </div>
      }
        
          
        </>
    )
}

export default Header

