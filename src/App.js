import React, { Component } from 'react';
import Head from'./component/layout/head';
import Footer from './component/layout/footer';
import SliderLeft from './component/layout/silderLeft';
import {withRouter} from 'react-router-dom';

import {MyContext} from './component/Mycontext'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: false,
      qtyProducts: '',
    }
    this.loginContext = this.loginContext.bind(this)
  }
  loginContext (a) { //callback login
    //console.log(a)
    localStorage.setItem('userLoggedin', JSON.stringify(a))
    const loggedin = JSON.parse(localStorage['userLoggedin'])
    this.setState(
      { login:loggedin }
    )
  }
  totalQuantityProducts = (total) => {
    localStorage.setItem('totalProdcts', JSON.stringify(total))
    let totals = JSON.parse(localStorage.getItem('totalProdcts'))
    this.setState({qtyProducts: totals})
  }
  render(){
    console.log(this.state.qtyProducts)
    let pathname = this.props.location.pathname
    return (
      <MyContext.Provider
        value = { 
          { 
            state: this.state,
            loginContext: this.loginContext,
            totalQuantityProducts: this.totalQuantityProducts,
          }
      } 
      >
          <Head  />
            <section>
              <div className="container">
                <div className="row">
                  {/* <SliderLeft /> */}
                  {(pathname.includes("login") || pathname.includes("logout") || pathname.includes("account")) || pathname.includes("Cart")  ? '' :<SliderLeft />}
                  {this.props.children}
                </div>
              </div>
            </section>
          <Footer />
      </MyContext.Provider>
    );
  }
}
export default withRouter(App)
