import React, { Component } from 'react'
import axios from 'axios';
import ErrorForm from './../../formError'
class AddProduct extends Component{
    constructor(props){
        super(props);
        this.state = {
          selectStatus: 'a',
          name: '',
          price: '',
          sale: '',
          company_profile: '',
          imgUpload: '',
          file: '',
          detail: '',
          brand: [],
          category: [],
          formError: {},
          categorySelect: '',
          brandSelect: '',
        }
       
    }
    Status_handleChange = (e) => {
      this.setState({ selectStatus: e.target.value })
    }
    renderStatus = (e) => {
      if(this.state.selectStatus === 'b')
      {
        return(
          <React.Fragment>
            <div>
              <input type="int" name="sale" placeholder="0" onChange={this.handleStatus} /> 
              <span>%</span>
            </div>
          </React.Fragment>
      )}
    }
    handleStatus = (e) => {
      this.setState(
        {sale: e.target.value}
      )
    } 
    componentDidMount = () => {
      axios.get('http://demo-api-local.com/api/category-brand')
      .then( res=> {
        let arrBrand = res.data.brand;
        let arrCategory = res.data.category
        this.setState({
          brand: arrBrand,
          category: arrCategory,
        })
      })
    }
    renderBrand = (e) => {
      let arrBrand = this.state.brand;
      //console.log(arrBrand)
      return Object.keys(arrBrand).map((key, index) => {
        return(
          <option key={index} value={arrBrand[key].id}>{arrBrand[key].brand}</option>
        )
      })
    }
    renderCategory = (e) => {
      let arrCategory = this.state.category;
      return Object.keys(arrCategory).map((key, index) => {
        return(
          <option key={index} value={arrCategory[key].id}>{arrCategory[key].category}</option>
        )
      })
    }
    handleInput = (e) =>{
      let nameInput = e.target.name;
      let value = e.target.value;
      this.setState(
        { [nameInput]:value }
      )
    }
    handleInputfile = (e) => {
      // this.setState({ file: [...this.state.file, ...e.target.files] })
      this.setState(
        {file: e.target.files}
      )
    }
    
    handleSubmit = (e) => {
      e.preventDefault()
      
      let flag = true;
      let name = this.state.name
      let price = this.state.price
      let selectStatus = this.state.selectStatus
      let sale = this.state.sale
      let company_profile = this.state.company_profile
      let detail = this.state.detail
      let brandSelect = this.state.brandSelect
      let categorySelect = this.state.categorySelect
      let file = this.state.file
      let Error  = this.state.formError
     
      if(!name){
        flag = false
        Error.name = 'Please Enter Name Product'
      }
      if(!price){
        flag = false
        Error.price = 'Please Enter Price Product'
      }
      if(selectStatus === 'b' && sale === ''){
        flag = false
        Error.sale = 'Please Enter sale Product'
      }
      if(!company_profile){
        flag = false
        Error.company_profile = 'Please Enter Company_profile'
      }
      if(!detail){
        flag = false
        Error.detail = 'Please Enter Detail'
      }
      if(brandSelect === ''){
        flag = false
        Error.brandSelect = 'Please Enter brand'
      }
      if(categorySelect === ''){
        flag = false
        Error.categorySelect = 'Please Enter category'
      }
      if(!file){
        flag = false
        Error.file = 'Please choose file'
      }
      else{
        
        if(Object.keys(file).length > 3) {
          flag = false
          Error.imgUpload = 'You only choose three pictures'

        } else {
        
          let file = this.state.file;
          let regex = ["png", "jpg", "jpeg"];
          let type = Object.keys(file).map((key, index) => {
              return file[key]['type']
          })
          let typeArr = type.map((value) => {
              return value.split('/')[1];
          })
          //console.log(typeArr)

          let abc = true;
          typeArr.map(value => {
            if(!regex.includes(value)) {
              abc = false;
            }
          })
          if(abc == false) {
            flag = false
            Error.imgUpload = 'NOT Picture'
          }
        }
      }
      if(!flag){
        this.setState(
          {formError: Error}
        )
      }
    
      else {
     
        const userData = JSON.parse(localStorage["appState"])
        console.log(userData)
        let accessToken = userData.user.auth_token;
        let config = {
          headers: {
          'Authorization': 'Bearer '+ accessToken,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
          }
        };
      
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('price', this.state.price);
        formData.append('company', this.state.company_profile);
        formData.append('detail', this.state.detail);
        formData.append('brand', this.state.brandSelect);
        formData.append('category',  this.state.categorySelect);
        formData.append('sale',  this.state.sale);
        
        Object.keys(file).map((item, i) => {

          formData.append("file[]", file[item]);
        });
      
        axios.post('http://demo-api-local.com/api/user/add-product', formData, config)
          .then( res =>{
            console.log(res)
            this.props.history.push('/account/product/list')
          })
         
      }
    }
    render() { 
     
        return (
            <section id="form">
            <div className="container">
              <div className="row">
                <div className="col-sm-4 col-sm-offset-1">
                </div>
                <div className="col-sm-1">
                </div>
                <div className="col-sm-4">
                  <div className="signup-form">
                    <ErrorForm Error = {this.state.formError} />
                    <form onSubmit={this.handleSubmit} >

                      <input type="text" 
                        placeholder="Name" 
                        name="name" 
                        onChange={this.handleInput}
                        value={this.state.name}
                       />
                      <input type="number" 
                        placeholder="Price" 
                        name="price" 
                        onChange={this.handleInput}
                      />
                      <select value={this.state.categorySelect} name="categorySelect" onChange={this.handleInput}>
                        <option >please choose category</option>
                        {this.renderCategory()}
                        
                      </select>
                      {/*  */}
                      <select value={this.state.brandSelect} name="brandSelect" onChange={this.handleInput}>
                        <option >please choose brand</option>
                        {this.renderBrand()}

                      </select>
                      
                      <select name="status"  
                        onChange={this.Status_handleChange}   
                        defaultValue={this.state.value}>
                        <option value="">Please choose status</option>
                        <option value="a">new</option>
                        <option value="b">sale</option>
                      </select>
                      {this.renderStatus()}
                      
                      <input type="text" 
                        placeholder="comapany profile" 
                        name="company_profile"
                        onChange={this.handleInput}
                      />
                      <input type="file" 
                        placeholder="choosefile" 
                        name="file[]" 
                        multiple
                        onChange={this.handleInputfile}
                      />
                      <input type="text" 
                        placeholder="Detail" 
                        name="detail"
                        onChange={this.handleInput}
                      />
                      <button type="submit" className="btn btn-default" name="submit">Signup</button>                     
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
    }
}
export default AddProduct;