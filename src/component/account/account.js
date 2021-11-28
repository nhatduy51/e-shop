import React, { Component } from 'react'
import axios from 'axios';
import ErrorForm from '../formError'
class Account extends Component {
    constructor(props){
        super(props);
        this.state = {
            Data: localStorage['appState'] ? JSON.parse(localStorage['appState']) : {},
            name: '',
            email: '',
            address: '',
            password: '',
            country: '',
            phone: '',
            file: '',
            avatar: '',
            formError: {},
            finish: '',
            thongbao:'',
        }
    }
    componentDidMount () {
      let isLogin = JSON.parse(localStorage.getItem('appState'));
      let isLoggedIn = isLogin['isLoggedIn'];
      //console.log(adc)
      if(isLoggedIn) {
        this.setState(
          {
              name: this.state.Data.user.auth.name,
              email: this.state.Data.user.auth.email,
              address: this.state.Data.user.auth.address,
              password: this.state.Data.user.auth.password,
              country: this.state.Data.user.auth.country,
              phone: this.state.Data.user.auth.phone,
              avatar: this.state.Data.user.auth.avatar,
          }
        )
      
      }
      else {
        this.props.history.push('/')
      
      }
    }
    handleInput = (e) =>{
        let nameInput = e.target.name;
        let value = e.target.value;
        this.setState(
          { [nameInput]:value }
        )
    }
    handleUserInputFile = (e) =>{
        const file = e.target.files;
        //console.log(file)
        // send file to api server
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({
                avatar: e.target.result, //cai nay de gui qua api
                file: file[0] //cai nay de toan bo thong file upload vao file de xuong check validate
            })
        };
        reader.readAsDataURL(file[0]);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let flag = true;
        let name = this.state.name;
        let email= this.state.email;
        let address = this.state.address;
        let country = this.state.country;
        let phone = this.state.phone;
        let file = this.state.file;
        let errorFormSubmit = this.state.formError
  
        if(!name){
          flag = false;
          errorFormSubmit.name = "enter your name";
        }
        if(!email){
          flag = false;
          errorFormSubmit.email = "enter your email";
        }
        if(!address){
          flag = false;
          errorFormSubmit.address = "enter your add";
        }
        if(!country){
          flag = false;
          errorFormSubmit.country = "enter your country";
        }
        if(!phone){
          flag = false;
          errorFormSubmit.phone = "enter your phone number";
        }
  
        if(file && file.name !== ''){
          let type = file.type.toLowerCase(); //lay ten file
          //console.log(type)
          let typeArr = type.split('/'); // lay duoi file
          let regex = ["png", "jpg", "jpeg"];
    
          if(file.size > 208292) {
            flag = false;
            errorFormSubmit.avatar = "is invalid size";
          } else if(!regex.includes(typeArr[1])) {
            flag = false;
            errorFormSubmit.avatar = "is invalid type image";
          }
        }
    
        if(!flag){
          this.setState(
            {formError : errorFormSubmit}
          )
        }
        else {
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
            const formData = new FormData();
      
            formData.append('email',this.state.email);
            formData.append('name',this.state.name);
            formData.append('address', this.state.address);
            formData.append('password',this.state.password ? this.state.password : '');
            formData.append('avatar',this.state.avatar);
            formData.append('country',this.state.country);
            formData.append('phone',this.state.phone);
            formData.append('level',0);

            axios.post('http://demo-api-local.com/api/user/update/'+ this.state.Data.user.auth.id, formData, config)
              .then(res =>{
                console.log(res)
                if(res.data.errors) {
                  this.setState({
                    formError: res.data.errors
                  })
                } else {
                  this.setState(
                    {thongbao: 'ban da update thanh cong'}
                  )
                }
                if (res.data.response === 'success'){
                  let userData = {
                    auth_token: res.data.success.token,
                    auth: res.data.Auth
                  };
                  //console.log(userData)
                  let appState = {
                    isLoggedIn: true,
                    user: userData,
                  };
                  console.log(appState)
                  localStorage.setItem('appState', JSON.stringify(appState));
                }
            })
        }
      }
    render(){
        return(
                <div className="col-sm-9">
                  <section id="form">
                      <div className="container">
                          <div className="row">
                              <div className="col-sm-1">
                              </div>
                              <div className="col-sm-4">
                                  <div className="signup-form">
                                      <h2>User Update</h2>
                                      <ErrorForm Error = {this.state.formError} />
                                      <form onSubmit={this.handleSubmit}>
                                              <input type="text" 
                                                  placeholder="Name" 
                                                  name="name" 
                                                  defaultValue={this.state.name} 
                                                  onChange={this.handleInput} 
                                              />
                                              <input type="email" 
                                                  placeholder="Email Address" 
                                                  name="email" 
                                                  defaultValue={this.state.email} 
                                                  onChange={this.handleInput} 
                                              />
                                              <input type="password" 
                                                  placeholder="Password" 
                                                  name="password" 
                                                  defaultValue={this.state.password} 
                                                  onChange={this.handleInput} 
                                              />
                                              <input type="text" 
                                                  placeholder="Address" 
                                                  name="address" 
                                                  defaultValue={this.state.address} 
                                                  onChange={this.handleInput} 
                                              />
                                              <input type="text" 
                                                  placeholder="Country" 
                                                  name="country" 
                                                  defaultValue={this.state.country} 
                                                  onChange={this.handleInput} />
                                              <input type="number" 
                                                  placeholder="Phone" 
                                                  name="phone" 
                                                  defaultValue={this.state.phone} 
                                                  onChange={this.handleInput} 
                                              />
                                              <input type="file" 
                                                  placeholder="choosefile" 
                                                  name="file" 
                                                  onChange={this.handleUserInputFile}
                                              />
                                              {/* <p>{this.state.thongbao}</p> */}
                                              <button type="submit" className="btn btn-default" name="submit">Signup</button>
                                      </form>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </section>
                </div>
        );
    }
}
export default Account;