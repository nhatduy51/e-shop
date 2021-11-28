import React, { Component } from 'react'
class Listcomment extends Component {
    constructor(props){
        super(props);
        this.renderComment = this.renderComment.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
    }
    //callback->blogsingle
    handleClick (e) {
      console.log(e.target.id)
      this.props.getId(e.target.id)
    }
    
    renderComment () {
      let comment = this.props.cmt;
      //console.log(comment)

      return Object.keys(comment).map(( key, index) => {
        if(comment[key]['id_comment'] == 0){
          return (
            <React.Fragment key={index}>
                  <li key={index} className="media ">
                    <a className="pull-left">
                      <img className="media-object" src={ "http://demo-api-local.com/upload/user/avatar/" + comment[key].image_user} alt="" />
                    </a>
                    <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />{comment[key].name_user}</li>
                      <li><i className="fa fa-clock-o" />{comment[key].created_at}</li>
                      <li><i className="fa fa-calendar" />{comment[key].updated_at}</li>
                    </ul>
                    <p>{comment[key].id_comment}</p>
                    <a onClick={this.handleClick} id={comment[key].id} className="btn btn-primary" href="#reply" ><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>

                  {Object.keys(comment).map((key2, index)=>{
                        if(comment[key]['id'] == comment[key2]['id_comment']){
                              return(
                                <li key={index} className="media second-media">
                                  <a className="pull-left" >
                                    <img className="media-object" src={ "http://demo-api-local.com/upload/user/avatar/" + comment[key2].image_user} alt="" />
                                  </a>
                                  <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                      <li><i className="fa fa-user" />{comment[key2].name_user}</li>
                                      <li><i className="fa fa-clock-o" /> {comment[key2].created_at}</li>
                                      <li><i className="fa fa-calendar" />{comment[key2].updated_at}</li>
                                    </ul>
                                    <p>{comment[key2].id_comment}</p>
                                    <a className="btn btn-primary" ><i className="fa fa-reply" />Replay</a>
                                  </div>
                                </li>
                              );
                        }
                  })}
                 
            </React.Fragment>         
          );}
      })
    }

    render() {
        return (
            <div className="response-area">
            <h2>3 RESPONSES</h2>
            <ul className="media-list">

              {this.renderComment()}
              
            </ul>					
          </div>
        );
    }
}
export default Listcomment;