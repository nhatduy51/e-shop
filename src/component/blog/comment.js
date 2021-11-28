import React, { Component } from 'react'
import axios from 'axios';

class Comment extends Component {
  constructor(props){
    super(props);
    this.state ={
      comment: '',
      errorComment: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
    handleInput = (e) => {
      this.setState({
        comment: e.target.value
      })
     
    }
    
    handleSubmit(e) {
      e.preventDefault();

      let isLoggedIn = false
      //console.log(localStorage["appState"]);


      // let getApp = JSON.parse(localStorage["appState"]);

      
      if(localStorage["appState"] !== undefined) {
        let getIsLoggedIn = JSON.parse(localStorage["appState"])
        isLoggedIn = getIsLoggedIn.isLoggedIn
      }
      //console.log(isLoggedIn)
      if (!isLoggedIn){
       this.setState({
        errorComment: 'Please login to comment!'
       })
      } else{
      
      const userData = JSON.parse(localStorage["appState"])
      
      let url = '/blog/comment/' + this.props.idBlog
      
      let accessToken = userData.user.auth_token;
      let config = {
               headers: {
               'Authorization': 'Bearer '+ accessToken,
               'Content-Type': 'application/x-www-form-urlencoded',
               'Accept': 'application/json'
               }
           };

      let {comment} = this.state;

      if(comment) {
           const formData = new FormData();
             formData.append('id_blog', this.props.idBlog);
             formData.append('id_user', userData.user.auth.id);
             formData.append('id_comment', this.props.getId != 0 ? this.props.getId : 0);
         
             formData.append('comment', this.state.comment);
             formData.append('image_user', userData.user.auth.avatar);
             formData.append('name_user', userData.user.auth.name);

             //console.log(this.props.getId)
             axios.post('http://demo-api-local.com/api/blog/comment/' + this.props.idBlog, formData , config)
             .then(res =>{
               console.log("11111111")
               this.props.getCmt(res.data.data)//callback
               //this.props.getId()
              console.log(res)
             })
      } 
      else {
        this.setState(
          {errorComment: ' please enter your comment'}
        )
      }

    }
  }

    render () {
        return(
            <div className="replay-box">
            <div className="row">
              <div className="col-sm-4">
                {/* <h2>Leave a replay</h2> */}
                {/* <form> 
                  <div className="blank-arrow">
                    <label>Your Name</label>
                  </div>
                  <span>*</span>
                  <input type="text" placeholder="write your name..." />
                  <div className="blank-arrow">
                    <label>Email Address</label>
                  </div>
                  <span>*</span>
                  <input type="email" placeholder="your email address..." />
                  <div className="blank-arrow">
                    <label>Web Site</label>
                  </div>
                  <input type="email" placeholder="current city..." />
                </form> */}
              </div>
              <div className="col-sm-8">
                <div className="text-area">
                    <form onSubmit={this.handleSubmit}>
                        <div className="blank-arrow">
                            <label>Your Name</label>
                        </div>
                        <span>*</span>
                        <textarea id="reply" name="comment" rows={11}
                        type='text' 
                        value={this.state.comment} 
                        onChange={this.handleInput}
                        />
                        <p>{this.state.errorComment}</p>
                        <button type="submit" name="submit" className="btn btn-primary" >post comment</button>
                    </form>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
export default Comment;