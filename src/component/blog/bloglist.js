import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Bloglist extends Component {

    constructor(props){
      super(props);
      this.state = {
        infProducts: []
      }
      this.renderData = this.renderData.bind(this)
    }
    componentDidMount () {
      axios.get('http://demo-api-local.com/api/blog')
        .then(res => {
          
          let infoProducts = res.data.blog.data;
        
          this.setState({
            infProducts: infoProducts
          });
        })
    }

    renderData() {
      
      let data = this.state.infProducts;
      //console.log(data)
      return data.map((value, key) => {
        return (
          <div key={key} className="single-blog-post">
              <h3>{value.title}</h3>
              <div className="post-meta">
                <ul>
                  <li><i className="fa fa-user" /> Mac Doe</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <span>
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-o" />
                </span>
              </div>
              <a >
                <img src={ "http://demo-api-local.com/upload/Blog/image/" + value.image} alt="" />
              </a>
              <p>{value.description}</p> 
							<Link className="btn btn-primary" to={ "/blog/detail/" + value.id} >Read More</Link>
        </div>
        )
      })
    }
    render() {
      return (
        <div className="col-sm-9">
          <div className="blog-post-area">
            <h2 className="title text-center">Latest From our Blog</h2>
           
            {this.renderData()}
           
           
            <div className="pagination-area">
              <ul className="pagination">
                <li><a  className="active">1</a></li>
                <li><a >2</a></li>
                <li><a >3</a></li>
                <li><a ><i className="fa fa-angle-double-right" /></a></li>
              </ul>
            </div>


          </div>
        </div>
      );
    }
  };
  export default Bloglist;