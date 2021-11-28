import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {MyContext} from './Mycontext'
import { keys } from '@material-ui/core/styles/createBreakpoints';
class Home extends Component{
  static contextType = MyContext;

  constructor(props) {
    super(props)
    this.state ={
      dataProduct: '',
    }
  }
  componentDidMount () {
    axios.get('http://demo-api-local.com/api/product') 
      .then ( res => {
        //console.log(res)
        if(res.data.response === "success") {
          this.setState(
              { dataProduct: res.data.data,}
          )
        }
        else {
          console.log('Error')
        }
      } )
  }
  handleClickGetId_product = (e) => {
    localStorage.setItem('id_productDetail', e.target.id)
  }
  renderProduct = () => {
    let {dataProduct} = this.state;
    return Object.keys(dataProduct).map((key, index) => {
      let id_user = dataProduct[key]['id_user']
      let imgUpload = JSON.parse( dataProduct[key]['image']);
      let id_product = JSON.parse( dataProduct[key]['id']);
      return (
          <div key={index} className="col-sm-4">           
            <div className="product-image-wrapper">
              <div className="single-products">
                <div className="productinfo text-center">
                  <img src={"http://demo-api-local.com/upload/user/product/" + id_user + "/" + imgUpload[0]} />
                  <h2>{dataProduct[key]['price']}</h2>
                  <p>{dataProduct[key]['name']}</p>
                  <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                </div>
                <div className="product-overlay">
                  <div className="overlay-content">
                    <h2>${dataProduct[key]['price']}</h2>
                    <p>{dataProduct[key]['name']}</p>
                    <a className="btn btn-default add-to-cart" id={id_product} onClick={this.addToCart}><i className="fa fa-shopping-cart" />Add to cart</a>
                  </div>
                </div>
              </div>
              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li><a><i className="fa fa-plus-square" />Add to wishlist</a></li>
                  <li><Link to="/detail" id={id_product} onClick={this.handleClickGetId_product}><i className="fa fa-plus-square" />Detail</Link></li>
                </ul>
              </div>
            </div>
          </div>
      );
    })
  }
  addToCart = (e) => {

    if(localStorage.getItem('appState')) {
      let infProduct = {};
      let getLocal = localStorage.getItem("cart")
      let isCarted = true;

      if(getLocal) {
        infProduct = JSON.parse(getLocal);
        Object.keys(infProduct).map((key, index) => {
          if (e.target.id == key  ) {
            infProduct[key] += 1
            isCarted = false
          }        
        });
      }
      if(isCarted) {
        infProduct[e.target.id] = 1;
      }
     
      localStorage.setItem('cart', JSON.stringify(infProduct))
      let getCart =JSON.parse(localStorage.getItem('cart')) 
      console.log(getCart)

      const totalCart = Object.values(getCart).reduce((t, n) => t + n)
      console.log(totalCart)
      this.context.totalQuantityProducts(totalCart)
     
    }
    else {
      this.props.history.push('/login')
    }
  }
  // 
  render() {
      return (
        <div className="col-sm-9 padding-right">
          <div className="features_items">{/*features_items*/}
            <h2 className="title text-center">Features Items</h2>
            {this.renderProduct()}
           
          </div>{/*features_items*/}
          <div className="category-tab">{/*category-tab*/}
            <div className="col-sm-12">
              <ul className="nav nav-tabs">
                <li className="active"><a href="#tshirt" data-toggle="tab">T-Shirt</a></li>
                <li><a href="#blazers" data-toggle="tab">Blazers</a></li>
                <li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
                <li><a href="#kids" data-toggle="tab">Kids</a></li>
                <li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
              </ul>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade active in" id="tshirt">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="blazers">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="sunglass">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="kids">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="poloshirt">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/frontend/images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{/*/category-tab*/}
          <div className="recommended_items">{/*recommended_items*/}
            <h2 className="title text-center">recommended items</h2>
            <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="item active">	
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="/frontend/images/home/recommend1.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="/frontend/images/home/recommend2.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="/frontend/images/home/recommend3.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">	
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="/frontend/images/home/recommend1.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="/frontend/images/home/recommend2.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="/frontend/images/home/recommend3.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <a  className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                <i className="fa fa-angle-left" />
              </a>
              <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                <i className="fa fa-angle-right" />
              </a>			
            </div>
          </div>{/*/recommended_items*/}
        </div>
      );
    }
  };
export default Home;