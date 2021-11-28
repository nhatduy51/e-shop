import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {withRouter} from 'react-router-dom';
class SliderLeft extends Component {
    render () {
        return(

			        <div className="col-sm-3">
                <div className="left-sidebar">
                    <h2>Account</h2>
                    <div className="panel-group category-products" id="accordian">
					            <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                              <span className="badge pull-right"><i className="fa fa-plus" /></span>
                              <Link to="/account/member" >Account</Link>
                          </h4>
                        </div>
                      </div>
					            <div className="panel panel-default">
                        <div className="panel-heading">
                          <h4 className="panel-title">
                            {/* <a data-toggle="collapse" data-parent="#accordian" href="#sportswear"> */}
                              <span className="badge pull-right"><i className="fa fa-plus" /></span>
                              <Link to='/account/product/list' >My Products</Link>
                            {/* </a> */}
                          </h4>
                        </div>
                      </div>
					        </div>
				        </div>
			        </div>
        );
    }
}
export default withRouter(SliderLeft);