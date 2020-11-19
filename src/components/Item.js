import React from 'react'
import { useHistory } from 'react-router-dom'
export default function Item() {
   const history = useHistory();
   const handlePhoneClick = () => {
      history.push('/Phone')
   }
   const handleLaptopClick = () => {
      history.push('/Laptop')
   }
    return (
       <div className="Items">
        <div className="ItemPhone" onClick={handlePhoneClick}>
         <img src="https://www.newsytribune.com/wp-content/uploads/2020/07/Best-Budget-Phone-Under-200.jpg" width="400px" height="400px" alt="Phone item" />
        </div>

        <div className="ItemLaptop" onClick={handleLaptopClick}>
        <img src="https://api.time.com/wp-content/uploads/2017/05/laptops.jpg" width="400px" height="400px" alt="Laptop item" />
        </div>

        </div> 
     )
}
