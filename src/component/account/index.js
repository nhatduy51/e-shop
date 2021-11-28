import React, { Component } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import App from '../account/App'
import Update from '../account/account'
import Product from '../account/MyProduct/MyProduct'
import Add_product from'../account/MyProduct/AddProduct'
import Update_Product from '../account/MyProduct/Update'
class Index extends Component {
  render () {
    return (
      <App>
        <Switch>
          <Route path='/account/member' component={Update} />
          <Route path='/account/product/list' component={Product} />
          <Route path='/account/add_Product' component={Add_product} />
          <Route path='/account/update_Product' component={Update_Product} />
        </Switch>
      </App>
    )
  }
}
export default Index;