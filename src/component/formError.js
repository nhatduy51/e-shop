import React, { Component } from 'react'
import { fireEvent } from '@testing-library/react';
class ErrorForm extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let Error = this.props.Error;
     
        return (
            <div>
                {
                    Object.keys(Error).map((fielError, index) =>{
                        if( Error[fielError].length > 0){
                            return (
                                <p key ={index}>
                                        {Error[fielError]}
                                </p>
                            )
                        }
                        else{
                            return '';
                        }
                    } )
                }
            </div>
        );

    }
}
export default ErrorForm;