import React, { Component } from 'react'
import StarRatings from 'react-star-ratings';
import Axios from 'axios';
class Rate extends Component{
    constructor(props){
        super(props);
        this.state ={
            rating: 0,
        }
    }
    changeRating = ( newRating, name ) => {
        const userData = JSON.parse(localStorage["appState"])
        let accessToken = userData.user.auth_token;
        //console.log(accessToken)
        let config = {
          headers: {
          'Authorization': 'Bearer '+ accessToken,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
          }
        };
        
        this.setState({
          rating: newRating
        });
        if(userData){

            const formData = new FormData();
            formData.append('blog_id', this.props.idBlog);
            formData.append('user_id', userData.user.auth.id);
            formData.append('rate', newRating);
    
            Axios.post('http://demo-api-local.com/api/blog/rate/' + this.props.idBlog, formData, config)
                .then( res=>{
                    console.log(res)
                })   
        }          
    }
    
    render () {
        return(
            <div className="rating-area">
              <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <ul>
                  <li><i className="fa fa-user" /> Mac Doe</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <span>
                <StarRatings
                      rating={this.state.rating}
                      starRatedColor="blue"
                      changeRating={this.changeRating}
                      numberOfStars={6}
                      name='rating'
                  />
                  </span>
                <li className="color">(6 votes)</li>
              </ul>
              <ul className="tag">
                <li>TAG:</li>
                <li><a className="color">Pink <span>/</span></a></li>
                <li><a className="color" >T-Shirt <span>/</span></a></li>
                <li><a className="color" >Girls</a></li>
              </ul>
          </div>
        );
    }
}
export default Rate;