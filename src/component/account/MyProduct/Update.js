import React, { Component } from 'react'
import axios from 'axios'
import ErrorForm from './../../formError'
import { LocalSeeOutlined } from '@material-ui/icons'
class Update extends Component {
    constructor(props) {
        super(props)
        this.state = {
          id_product: localStorage.getItem('id_prouct'),
          id_user: '',
          listBrand: [],
          listCategory: [],
          selectStatus: 'new',
          name: '',
          price: '',
          sale: '',
          company_profile: '',
          imgUpload: '',
          file: '',
          detail: '',
          formError: {},
          categorySelect: '',
          brandSelect: '',
          avatarCheckBox: [],
        }
    }
    
    componentDidMount () {
      const userData = JSON.parse(localStorage["appState"])
      let accessToken = userData.user.auth_token;
      let config = {
          headers: {
          'Authorization': 'Bearer '+ accessToken,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
          }
      };

        axios.get('http://demo-api-local.com/api/user/product/' + this.state.id_product, config)
          .then( res => {
            console.log(res)
            if(res.data.response === "success"){
              this.setState(
                {
                  company_profile: res.data.data.company_profile,
                  detail: res.data.data.detail,
                  brandSelect: res.data.data.id_brand,
                  categorySelect: res.data.data.id_category,
                  name: res.data.data.name,
                  price: res.data.data.price,
                  imgUpload: res.data.data.image,
                  id_user: res.data.data.id_user,
                }
              )
            }
          })
          axios.get('http://demo-api-local.com/api/category-brand')
            .then( res=> {
              //console.log(res)
              let arrBrand = res.data.brand;
              let arrCategory = res.data.category
              this.setState({
                listBrand: arrBrand,
                listCategory: arrCategory,
              })
            })
    }
    handleInput = (e) => {
      let nameInput = e.target.name;
      let value = e.target.value;
      this.setState(
        { [nameInput]:value }
      )
    }
    renderBrand = () => {
      let arrBrand = this.state.listBrand;
      return Object.keys(arrBrand).map((key, index) => {
        return(
          <option key={index} value={arrBrand[key].id}>{arrBrand[key].brand}</option>
        )
      })
    }
    renderCategory = () => {
      let arrCategory = this.state.listCategory;
      return Object.keys(arrCategory).map((key, index) => {
        return(
          <option key={index} value={arrCategory[key].id}>{arrCategory[key].category}</option>
        )
      })
    }
    Status_handleChange = (e) => {
      this.setState(
        {selectStatus: e.target.value}
      )
    }
    renderStatus = () => {
      if(this.state.selectStatus === 'sale')
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
    handleInputfile = (e) => {
     // let fileImg = this.state.imgUpload;
      let file = e.target.files;
      // console.log(file)
      // Object.keys(file).map((key) => {
      //   return fileImg.push(file[key]['name'])
      // })
      // this.setState(
      //   {file: fileImg}
      // )
    }
    renderFileUplaod = () => {
      let {imgUpload} = this.state
      return Object.keys(imgUpload).map((key, i)  => {
        return (
            <div key={i}>
              <img src= {imgUpload[key]} />
                {/* <img src={"http://demo-api-local.com/upload/user/product/" + this.state.id_user + "/" + this.state.imgUpload[0]}  /> */}
              <input type="checkbox" name="avatarCheckBox[]" value={imgUpload[key]} onChange={this.checkValueAvatar}/>
            </div>       
        )
      })
    }
    checkValueAvatar = (e) =>{
      let avatar = this.state.avatarCheckBox;
      avatar.push(e.target.value)
      this.setState({ avatarCheckBox: avatar })
      console.log(avatar)
     
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
      if(selectStatus === 'sale' && sale === ''){
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
  
      if(file !== ''){
        let file = this.state.file; // new file uplaode
        let {imgUpload} = this.state; // old file upload
        let imgToRemove = this.state.avatarCheckBox; // use check remove image

        const myArray = imgUpload.filter( ( el ) => !imgToRemove.includes( el ) );

        Object.keys(file).map((key) => {
            return myArray.push(file[key]['name'])
        })
        console.log(myArray)
        this.setState({file: myArray})

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
        formData.append('avartarCheckBox', this.state.avatarCheckBox);
        Object.keys(file).map((item, i) => {
          formData.append("file[]", file[item]);
        });
      
        axios.post('http://demo-api-local.com/api/user/edit-product/' + this.state.id_product, formData, config)
          .then( res =>{
            console.log(res)
            if(res.data.response === "success") {
              this.setState(
                  { data: res.data.data }
              )
            }
            this.props.history.push('/account/product/list')
          })
          
      }
    }
   
    render () {
      console.log(this.state.file)
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
                    <h2>Product Update</h2>
                    <ErrorForm Error = {this.state.formError} />
                    <form onSubmit={this.handleSubmit} >

                      <input type="text" 
                        placeholder="Name" 
                        name="name" 
                        defaultValue={this.state.name}
                        onChange={this.handleInput}
                       />
                      <input type="number" 
                        placeholder="Price" 
                        name="price" 
                        defaultValue={this.state.price}
                        onChange={this.handleInput}
                      />
                      <select  name="categorySelect" onChange={this.handleInput} defaultValue={this.state.categorySelect}>
                        <option >please choose category</option>
                        {this.renderCategory()}
                      </select>
        
                      <select  name="brandSelect" onChange={this.handleInput} defaultValue={this.state.brandSelect}>
                        <option >please choose brand</option>
                        {this.renderBrand()}
                      </select>
                      
                      <select name="status"  
                        onChange={this.Status_handleChange}   
                        >
                        <option value="">Please choose status</option>
                        <option value="new">new</option>
                        <option value="sale">sale</option>
                      </select>
                      {this.renderStatus()}
                      
                      <input type="text" 
                        placeholder="comapany profile" 
                        name="company_profile"
                        defaultValue={this.state.company_profile}
                        onChange={this.handleInput}
                      />
                      <input type="file" 
                        placeholder="choosefile" 
                        name="file[]" 
                        multiple
                        onChange={this.handleInputfile}
                      />
                      <div className="renderFileUload">
                        {this.renderFileUplaod()}
                      </div>
                      <input type="text" 
                        placeholder="Detail" 
                        name="detail"
                        defaultValue={this.state.detail}
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
export default Update;