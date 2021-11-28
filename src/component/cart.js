import React, { Component } from 'react'
import axios from 'axios'
import Product from './productCart'
import { Link } from "react-router-dom";
import {withRouter} from 'react-router-dom';
class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
          dataCart: '',
        }
    }
    componentDidMount () {
      let cart = localStorage.getItem('cart')
      axios.post('http://demo-api-local.com/api/product/cart', cart)
        .then( res => {
          console.log(res)
          if(res.data.response === "success") {

              this.setState(
                { dataCart: res.data.data, })
          }
        })
    }
    renderCart = () => {
      let dataCart = this.state.dataCart;
      return Object.keys(dataCart).map((item, index) => {
        return (
          <Product key={index} item={dataCart[item]}/>  
        );
      })
    }
    render () {
      console.log(this.state.dataCart)
        return (
            <section id="cart_items">
              <div className="container">
                <div className="breadcrumbs">
                  <ol className="breadcrumb">
                    <li><Link to="/">Home</Link></li>
                    <li className="active">Shopping Cart</li>
                  </ol>
                </div>
                <div className="table-responsive cart_info">
                  <table className="table table-condensed">
                    <thead>
                      <tr className="cart_menu">
                        <td className="image">Item</td>
                        <td className="description">Name</td>
                        <td className="price">Price</td>
                        <td className="quantity">Quantity</td>
                        <td className="total">Total</td>
                        <td />
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderCart()}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            
          );
    }
}
export default withRouter(Cart);