import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import {fetchItemSearch,fetchPhoneInfo,fetchPhoneFilter} from '../action'
import {fetchLaptopInfo} from '../action/laptop'
import MenuLaptop from './MenuLaptop'
import MenuPhone from './MenuPhone'
import data from '../JSONSERVER/db.json'
function Header() {
  useEffect(()=>{
      dispatch(fetchPhoneInfo())
      dispatch(fetchLaptopInfo())
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
 const [phoneData,setPhoneData] = useState(data.Phone);
 const [laptopData,setLaptopData] = useState(data.Laptop);
 const item = useSelector(state=>state.phone.menuListItem)
 const dispatch = useDispatch();
 const Count = useSelector(state=>state.phone.orderCount)
 
 const [togglesearch,setToggleSearch] = useState(false)
 const toggleSearch = () => {
  setToggleSearch(!togglesearch)
  
  if (search) {
    dispatch(fetchItemSearch(search))
    history.push('/Search')
  }
  document.getElementsByClassName('search')[0].classList.toggle('active')
}


    return (
        <>
         { toggle && <div className="menuList">
         <button className="Close" onClick={toggleChange}>X</button>
             <MenuPhone />
            <MenuLaptop />
          </div>
          } 
        
        <div className="Header" >
            <div className="menu" >
                <img width="60px" height="70px" src="https://goodmade.ru/upload/000/u1/101/39aadfae.png" alt="menu"  onClick={toggleChange}/>
               <h1 onClick={handleHomePage} className={togglesearch ? 'active': ""} id="logo">My Amazon Store</h1>
        </div>
           
            <form className="search" onSubmit={handleSubmit}>
              <input className={togglesearch ? 'active': ""} name="search" type="text" onChange={handleChange} />
              <input className={togglesearch ? 'active': ""} name="searchButton" type="submit" value=""/>
            </form>

         <div className="Order_Search">
              <button className="SearchButton" id="SearchButton" onClick={toggleSearch}></button>
            <div className="orderList" onClick={handleOrderPage}>
             <button className="order">
               {Count !== 0 &&<span className="orderCount">{Count}</span>}
             </button>
           </div>
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
