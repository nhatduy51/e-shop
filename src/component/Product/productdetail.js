import React, { Component } from 'react'
import axios from 'axios';
class ProductDetail extends Component{
    constructor(props) {
      super(props);
        this.state = {
          id_product: localStorage.getItem('id_productDetail'),
          dataProduct: '',
          imgUpload: '',
          id: '',
          id_user: '',
          brand: '',
          price: '',
          }
    }
    componentDidMount () {
      axios.get('http://demo-api-local.com/api/product/detail/' + this.state.id_product)
        .then ( res => {
          //console.log(res)
          if(res.data.response === "success") {
            this.setState(
                { dataProduct: res.data.data,
                  imgUpload: JSON.parse(res.data.data.image),
                  name: (res.data.data.name),
                  price: (res.data.data.price),
                  id: res.data.data.id,
                  id_user: res.data.data.id_user,
                  brand: res.data.data.id_brand,
                }
            )
          }
        })
    }

    render () {
      console.log(this.state.dataProduct)
      return (
          <div className="col-sm-9 padding-right">
             <div className="product-details">
              <div className="col-sm-5">
              <div className="view-product">
                <img src={"http://demo-api-local.com/upload/user/product/" + this.state.id_user + "/" + this.state.imgUpload[0]} alt="" />
                <a rel="prettyPhoto"><h3>ZOOM</h3></a>
              </div>
              <div id="similar-product" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="item next left">
                    <a ><img src={"http://demo-api-local.com/upload/user/product/" + this.state.id_user + "/" + this.state.imgUpload[0]} alt="" /></a>
                    <a ><img src={"http://demo-api-local.com/upload/user/product/" + this.state.id_user + "/" + this.state.imgUpload[1]} alt="" /></a>
                    <a ><img src={"http://demo-api-local.com/upload/user/product/" + this.state.id_user + "/" + this.state.imgUpload[2]} alt="" /></a>
                  </div>
                  <div className="item">
                    <a ><img src={"http://demo-api-local.com/upload/user/product/" + this.state.id_user + "/" + this.state.imgUpload[0]} alt="" /></a>
                    <a ><img src={"http://demo-api-local.com/upload/user/product/" + this.state.id_user + "/" + this.state.imgUpload[1]} alt="" /></a>
                    <a ><img src={"http://demo-api-local.com/upload/user/product/" + this.state.id_user + "/" + this.state.imgUpload[2]} alt="" /></a>
                  </div>
                  <div className="item active left">
                    <a ><img src={"http://demo-api-local.com/upload/user/product/" + this.state.id_user + "/" + this.state.imgUpload[0]} alt="" /></a>
                    <a ><img src={"http://demo-api-local.com/upload/user/product/" + this.state.id_user + "/" + this.state.imgUpload[1]} alt="" /></a>
                    <a ><img src={"http://demo-api-local.com/upload/user/product/" + this.state.id_user + "/" + this.state.imgUpload[2]} alt="" /></a>
                  </div>
                </div>
                <a className="left item-control" data-slide="prev">
                  <i className="fa fa-angle-left" />
                </a>
                <a className="right item-control"data-slide="next">
                  <i className="fa fa-angle-right" />
                </a>
              </div>
            </div>
            <div className="col-sm-7">
              <div className="product-information">
                <h2>{this.state.name}</h2>
                <p>{this.state.price}</p>
               
                <span>
                  <span></span>
                  <label>Quantity:</label>
                  <input type="text" defaultValue={0} />
                  <button type="button" className="btn btn-fefault cart">
                    <i className="fa fa-shopping-cart" />
                    Add to cart
                  </button>
                </span>
                <p><b>Availability:</b> In Stock</p>
                <p><b>Condition:</b> New</p>
                <p><b>Brand:</b>{this.state.brand}</p>
              </div>
            </div>
          </div>
        
            <div className="category-tab shop-details-tab">{/*category-tab*/}
              <div className="col-sm-12">
                <ul className="nav nav-tabs">
                  <li><a data-toggle="tab">Details</a></li>
                  <li><a data-toggle="tab">Company Profile</a></li>
                  <li><a  data-toggle="tab">Tag</a></li>
                  <li className="active"><a data-toggle="tab">Reviews (5)</a></li>
                </ul>
              </div>
              <div className="tab-content">
                <div className="tab-pane fade" id="details">
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="/frontend/images/home/gallery1.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="companyprofile">
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="/frontend/images/home/gallery1.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="tag">
                  <div className="col-sm-3">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="/frontend/images/home/gallery1.jpg" alt="" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                          <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade active in" id="reviews">
                  <div className="col-sm-12">
                    <ul>
                      <li><a ><i className="fa fa-user" />EUGEN</a></li>
                      <li><a ><i className="fa fa-clock-o" />12:41 PM</a></li>
                      <li><a ><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <p><b>Write Your Review</b></p>

                    <form action="#">
                      <span>
                        <input type="text" placeholder="Your Name" />
                        <input type="email" placeholder="Email Address" />
                      </span>
                      <textarea  />
                      <b>Rating: </b> <img src="/frontend/images/product-details/rating.png" alt="" />
                      <button type="button" className="btn btn-default pull-right">
                        Submit
                      </button>
                    </form>
                    
                  </div>
                </div>
              </div>
            </div>{/*/category-tab*/}
            <div className="recommended_items">{/*recommended_items*/}
              <h2 className="title text-center">recommended items</h2>
              <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="item active left">	
                    <div className="col-sm-4">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="/frontend/images/home/recommend1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item next left">	
                    <div className="col-sm-4">
                      <div className="product-image-wrapper">
                        <div className="single-products">
                          <div className="productinfo text-center">
                            <img src="/frontend/images/home/recommend1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
                            <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
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
  export default ProductDetail;