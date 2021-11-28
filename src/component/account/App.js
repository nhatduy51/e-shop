import React, { Component } from 'react'
import SliderLeft from '../account/SliderLeft';
import SilderLeftMain from '../layout/silderLeft'
import {withRouter} from 'react-router-dom';
class App extends Component{
    constructor(props){
        super(props);
    }
    render() {

        return(
            <React.Fragment>
                <section id="form">
                    <div className="container">
                        <div className="row">
                            <SliderLeft/>
                            {this.props.children}
                        </div>
                    </div>
                </section>
           </React.Fragment>
        );
    }

}
export default withRouter(App)