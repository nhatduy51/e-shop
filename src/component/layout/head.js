import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {MyContext} from '../Mycontext';
import {withRouter} from 'react-router-dom';
class Head extends Component{
    static contextType = MyContext;
    constructor(props) {
        super(props)

    }
    renderLogin = () => {
        let isLogin = false
        if(localStorage["userLoggedin"] !== undefined) {
            let getIsLoggedIn = JSON.parse(localStorage["userLoggedin"])
            isLogin = getIsLoggedIn
        }
        if(isLogin){
            return(
                <li><a onClick={this.handleLogout} >Logout</a></li> 
            );
        }
        else{
            return(
                <li><Link to="/login" >Login</Link></li> 
            );
        }
    }
    renderAccount = () => {
        let isLogin = false
        if(localStorage["userLoggedin"] !== undefined) {
            let getIsLoggedIn = JSON.parse(localStorage["userLoggedin"])
            //console.log(getIsLoggedIn)
            isLogin = getIsLoggedIn
        }
        if(isLogin){
            return(
                <React.Fragment>
                    <li><Link to="/account/member" >Account</Link></li>
                    <li><Link to="#"><i className="fa fa-star" /> Wishlist</Link></li>
                </React.Fragment>
            );
        }
        else{
            return(
                <React.Fragment>
                </React.Fragment>
            );
        }
    }
    handleLogout = () => {
        this.context.loginContext(false)
        localStorage.setItem('appState', '')
        localStorage.removeItem('totalProdcts')
        this.props.history.push('/login')
    }
    renderQTY = () => {
        let totalCart = '';
        if(localStorage["totalProdcts"] !== undefined) {
            let getCart = JSON.parse(localStorage["totalProdcts"])
            totalCart = getCart
        }
        if(totalCart) {
            return (
                <MyContext.Consumer>
                    {(context) => (
                         <React.Fragment>
                         <span className="cart_qty">{totalCart}</span>
                     </React.Fragment>
                    )}
                </MyContext.Consumer>
            );
        }
        else{
            return(
                <React.Fragment></React.Fragment>
            )
        }
    }
    render () {
        //console.log(this.context.state)
        return(
            <header id="header">{/*header*/}
                <div className="header_top">{/*header_top*/}
                <div className="container">
                    <div className="row">
                    <div className="col-sm-6">
                        <div className="contactinfo">
                        <ul className="nav nav-pills">
                            <li><a ><i className="fa fa-phone" /> +2 95 01 88 821</a></li>
                            <li><a ><i className="fa fa-envelope" /> info@domain.com</a></li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="social-icons pull-right">
                        <ul className="nav navbar-nav" >
                            <li><a ><i className="fa fa-facebook" /></a></li>
                            <li><a ><i className="fa fa-twitter" /></a></li>
                            <li><a ><i className="fa fa-linkedin" /></a></li>
                            <li><a ><i className="fa fa-dribbble" /></a></li>
                            <li><a ><i className="fa fa-google-plus" /></a></li>
                        </ul>
                        </div>
                    </div>
                    </div> 
                </div>
                </div>{/*/header_top*/}
                <div className="header-middle">{/*header-middle*/}
                <div className="container">
                    <div className="row">
                    <div className="col-md-4 clearfix">
                        <div className="logo pull-left">
                        <a ><img src="images/home/logo.png" alt="" /></a>
                        </div>
                        <div className="btn-group pull-right clearfix">
                        <div className="btn-group">
                            <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                            USA
                            </button>
                            <ul className="dropdown-menu">
                            <li><a >Canada</a></li>
                            <li><a >UK</a></li>
                            </ul>
                        </div>
                        <div className="btn-group">
                            <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                            DOLLAR

                            </button>
                            <ul className="dropdown-menu">
                            <li><a>Canadian Dollar</a></li>
                            <li><a>Pound</a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-8 clearfix">
                        <div className="shop-menu clearfix pull-right">
                        <ul className="nav navbar-nav">
                            {this.renderAccount()}
                            <li><a ><i className="fa fa-crosshairs" /> Checkout</a></li>
                            <li>
                                <Link to="/Cart"><i className="fa fa-shopping-cart" /> Cart</Link>
                                {this.renderQTY()}
                               
                            </li>
                            {this.renderLogin()}
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>{/*/header-middle*/}
                <div className="header-bottom">{/*header-bottom*/}
                <div className="container">
                    <div className="row">
                    <div className="col-sm-9">
                        <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                        </div>
                        <div className="mainmenu pull-left">
                        <ul className="nav navbar-nav collapse navbar-collapse">
                            <li><Link to="/">Home</Link></li>
                            <li className="dropdown"><a >Shop<i className="fa fa-angle-down" /></a>
                            <ul role="menu" className="sub-menu">
                                <li><Link to="/product">Product</Link></li>
                                <li><a >Checkout</a></li> 
                                <li className="sub-menu__cart">
                                    <Link to="/Cart" >Cart</Link>
                                    
                                </li> 
                                <li><Link to="/login" >Login</Link></li> 
                            </ul>
                            </li> 
                            <li className="dropdown"><a href="#">Blog<i className="fa fa-angle-down" /></a>
                            <ul role="menu" className="sub-menu">
                                <li><Link to="/blog/list">Blog list</Link></li>
                                <li><Link to="/blog/detail">Blog Single</Link></li>
                            </ul>
                            </li> 
                            <li><a >404</a></li>
                            <li><a >Contact</a></li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="search_box pull-right">
                        <input type="text" placeholder="Search" />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </header>
    );
  }
}
export default withRouter(Head);