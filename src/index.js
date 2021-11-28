import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import Bloglist from './component/blog/bloglist';
import BlogSingle from './component/blog/blogsingle';
import Home from './component/Home';
import Product from './component/Product/product'
import ProductDetail from './component/Product/productdetail';
import Login from './component/login';
import Cart from './component/cart'
import Account from './component/account/index';
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component = {Home} />
          <Route path="/blog/list" component = {Bloglist} />
          <Route path="/blog/detail/:id" component = {BlogSingle} />
          <Route path="/product" component = {Product} />
          <Route path="/detail" component = {ProductDetail} />
          <Route path="/login" component = {Login} />
          <Route path="/Cart" component = {Cart} />
          <Route component ={Account} />
        </Switch>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();