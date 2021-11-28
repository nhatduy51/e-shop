import { common } from '@material-ui/core/colors';
import React, { Component } from 'react'
class ProductCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.item,
            qty: this.props.item.qty,
            price: this.props.item.price,
        }
    }
    increment = (e) => {
        this.setState(
            prevState => ({
                qty: Number(prevState.qty) + 1
            })
        );

        let cart = JSON.parse(localStorage.getItem('cart'))
        Object.keys(cart).map((key) => {
            console.log(cart[key])
            if(e.target.id == key) {
               cart[key] += 1;
               console.log(cart[key])

            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        console.log(cart)    
    }
    decrement = (e) => {
        if (this.state.value <= 1) {
              return this.state.value;
        } else {
            let cart = JSON.parse(localStorage.getItem('cart'))
            Object.keys(cart).map((key) => {
                console.log(cart[key])
                if(e.target.id == key) {
                   cart[key] -= 1;
                   console.log(cart[key])
    
                }
            })
            localStorage.setItem("cart", JSON.stringify(cart))
            this.setState(
                prevState => ({
                    qty: Number(prevState.qty) - 1
                })
            );
        }
    }
    render () {
        return(
            <tr style={{display: 'flex'}}>
                <td className="cart_product">
                    <a ><img src="images/cart/one.png" alt="" /></a>
                </td>
                <td className="cart_description">
                    <h4><a>{this.props.item.name}</a></h4>
                    <p>Web ID:{this.props.item.id} </p>
                </td>
                <td className="cart_price">
                    <p>${this.state.price}</p>
                </td>
                <td className="cart_quantity">
                <div className="cart_quantity_button">
                    <a className="cart_quantity_up" id={this.props.item.id} onClick={this.increment}> + </a>
                        <input className="cart_quantity_input" type="text" name="quantity" value={this.state.qty} />
                    <a className="cart_quantity_down" id={this.props.item.id} onClick={this.decrement}> - </a>
                </div>
                </td>
                <td className="cart_total">
                    <p className="cart_total_price">{this.state.qty * this.state.price}</p>
                </td>
                <td className="cart_delete">
                    <a className="cart_quantity_delete"><i className="fa fa-times" /></a>
                </td>
            </tr>    
        );
    }
}
export default ProductCart;