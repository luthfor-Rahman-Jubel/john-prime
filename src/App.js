import  React from 'react';
import './App.css';
import Header from './components/Header/Header.js';
import Shop from './components/Shop/Shop.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Review from './components/Pages/Review/Review';
import Manage from './components/Pages/Manage/Manage';
import NotFound from './components/NotFount/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/inventory">
           <Manage></Manage>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
