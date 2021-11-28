import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import {MyContext} from './../../Mycontext'
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
class Myproducts extends Component {

    static contextType = MyContext;

    constructor(props) {
        super(props);
        this.state = {
            data: '',
        }
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount () {
        const userData = JSON.parse(localStorage["appState"])
        //console.log(userData)
        let accessToken = userData.user.auth_token;

        //console.log(accessToken)
        let config = {
            headers: {
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            }
        };
        axios.get('http://demo-api-local.com/api/user/my-product', config)
          .then( res =>{
            //console.log(res)
            if(res.data.response === "success") {
                this.setState(
                    { data: res.data.data }
                )
            }
            else {
                console.log('Error')
            }
          })
    }
    handleClick (e) {
        console.log(e.target.id)
        localStorage.setItem('id_prouct', e.target.id)
    }
    handleDeleteProduct = e => {
        const userData = JSON.parse(localStorage["appState"])
        let accessToken = userData.user.auth_token;
        let config = {
            headers: {
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            }
        };
        axios.get('http://demo-api-local.com/api/user/delete-product'+ '/' + e.target.id, config)
          .then( res =>{
            console.log(res)
            if(res.data.response === "success") {
                this.setState(
                    { data: res.data.data }
                )
            }
          })
    }
    renderProducts = () => {
        let data = this.state.data;
        return Object.keys(data).map((key, index) => {
            let img = JSON.parse(data[key]['image'])
            let idUser = JSON.parse(data[key]['id_user'])
            let id = JSON.parse(data[key]['id'])
            return (
                <tbody key={index}>
                    <tr>
                        <td className="cart_product">
                            {data[key]['id']}             
                        </td>
                        <td className="cart_description">
                            {data[key]['name']}           
                        </td>
                        <td className="cart_image">
                            <img className="media-object" src={"http://demo-api-local.com/upload/user/product/" + idUser + "/" + img[0]}  />             
                        </td>
                        <td className="cart_price">
                              {data[key]['price']}                  
                        </td>
                        <td className="cart_action cart_action-active">
                            <div className="action__wrap">
                                <Link to='/account/update_Product'  className="action__link">
                                    <SystemUpdateAltOutlinedIcon  onClick={this.handleClick} id={data[key]['id']} className='update_icon'/>
                                </Link>
                                <Link to="#" className="action__link" >
                                    <DeleteOutlinedIcon onClick={this.handleDeleteProduct} id={data[key]['id']} className="remove_icon" />
                                </Link>
                            </div>           
                        </td>
                    </tr>
                </tbody>
            )           
        })       
    }
    
    render () {
        return(
            <div className="col-sm-8">
                <section id="cart_items">

                        <div className="table-responsive cart_info">
                            <table className="table table-condensed">
                                <thead>
                                    <tr className="cart_menu">
                                        <td className="image">id</td>
                                        <td className="price">name</td>
                                        <td className="quantity">image</td>
                                        <td className="total">Price</td>
                                        <td className="description">action</td>
                                    </tr>
                                </thead>
                                
                                {this.renderProducts()} 
                                
                            </table>
                        </div>
                         <div className="add_New pull-right">
                            <Link to='/account/add_Product'> <h6> Add New</h6></Link>
                        </div>
    
                </ section>
            </div>
        );
    }
}
export default Myproducts;