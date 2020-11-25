import React, { useEffect } from 'react';
import Header from './components/Header'
import Item from './components/Item'
import Laptop from './components/Laptop'
import Phone from './components/Phone'
import ItemPhone from './components/ItemPhone'
import ItemLaptop from './components/ItemLaptop'
import Order from './components/Order'
import Search from './components/Search'
import { BrowserRouter as Router,Route} from 'react-router-dom'
import {fetchTotalItem} from './action'
import './App.css';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTotalItem())
  }, [])
  return (
    <div className="App">
   
    <Router>
    <Header />
     <div>
       <Route exact path="/" component={Item}/>
       {/* <Route exact path="/davit2001.github.io/Store/" component={Item}/> */}
       <Route path="/Phone" component={Phone}/>
       <Route path="/Item" component={Item}/>
       <Route  path="/Laptop" component={Laptop}/>
       <Route path="/ItemPhone/:itemId" component={ItemPhone}/>
       <Route path="/ItemLaptop/:itemId" component={ItemLaptop}/>
       <Route path="/Order" component={Order}/>
       <Route path="/Search" component={Search} />
     </div>
      </Router>

    </div>
  );
}

export default App;
