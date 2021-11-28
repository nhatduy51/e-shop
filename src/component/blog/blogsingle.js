import React, { Component } from 'react'
import axios from 'axios';
import StarRatings from 'react-star-ratings';

import Comment from '../blog/comment'
import Listcomment from '../blog/ListComment'
import Rate from '../blog/rating_item';
class BlogSingle extends Component{

  constructor(props){
    super(props);
    this.state = {
      infProducts: '',
      cmt:'',
      cmtId:'',
      Rate: 0,
    }
    this.getCmt = this.getCmt.bind(this)
    this.getId = this.getId.bind(this)
  }
  componentDidMount () {
    console.log(this.props.match.params.id)
    axios.get('http://demo-api-local.com/api/blog/detail/' + this.props.match.params.id)
      .then(res => {
        //console.log(res);
        let infoProducts = res.data.data;
        //console.log(infoProducts)
        this.setState({
          infProducts: infoProducts,
          cmt: infoProducts.comment
        });
        
    })

    axios.get('http://demo-api-local.com/api/blog/rate/' + this.props.match.params.id)
    .then( res =>{
      const data = res.data.data;
      let tong = 0;
      let dem = 0
      data.map((value, key) => {
        tong = tong + value.rate;
        dem ++;
      })
      this.setState({
        Rate: tong/dem
      })
    })
  }
  getCmt(a) {
    this.setState(
      { cmt: this.state.cmt.concat(a) }
    )
  }
  getId(id){
    this.setState(
      { cmtId: id }
    )
  }
  changeRating = ( newRating, name ) => {

  }
    render() {
      return (

        <div className="col-sm-9">
          <div className="blog-post-area">
            <h2 className="title text-center">Latest From our Blog</h2>
            <div className="single-blog-post">
              <h3>{this.state.infProducts.title}</h3>

              {/* <RateUpdate Rate ={this.state.Rate}  /> */}
              <StarRatings
                    rating={this.state.Rate}
                    starRatedColor="blue"
                    // changeRating={this.changeRating}
                    numberOfStars={6}
                    name='rating'
              />
              <a>
                <img src={"http://demo-api-local.com/upload/Blog/image/" + this.state.infProducts.image} alt="" />
              </a>
              <p>{this.state.infProducts.content}</p>
              <div className="pager-area">
                <ul className="pager pull-right">
                  <li><a >Pre</a></li>
                  <li><a>Next</a></li>
                </ul>
              </div>
            </div>
          </div>{/*/blog-post-area*/}

          <Rate  idBlog = {this.props.match.params.id} />

          <div className="socials-share">
            <a ><img src="/frontend/images/blog/socials.png" alt="" /></a>
          </div>{/*/socials-share*/}
          <div className="media commnets">
            <a className="pull-left">
              <img className="media-object" src="/frontend/images/blog/man-one.jpg" alt="" />
            </a>
            <div className="media-body">
              <h4 className="media-heading">Annie Davis</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <div className="blog-socials">
                <ul>
                  <li><a ><i className="fa fa-facebook" /></a></li>
                  <li><a ><i className="fa fa-twitter" /></a></li>
                  <li><a ><i className="fa fa-dribbble" /></a></li>
                  <li><a><i className="fa fa-google-plus" /></a></li>
                </ul>
                <a className="btn btn-primary" >Other Posts</a>
              </div>
            </div>
          </div>{/*Comments*/}

          <Listcomment getId={this.getId} cmt = {this.state.cmt} />
          <Comment getCmt={this.getCmt}  idBlog = {this.props.match.params.id}  getId={this.state.cmtId}  />
         
        </div>
      );
    }
  };
  export default BlogSingle;