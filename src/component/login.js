import React, { Component } from 'react'
import ErrorForm from '../component/formError'
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {MyContext} from '../component/Mycontext'
class Login extends Component {

    static contextType = MyContext;

    constructor(props){
        super(props);
        this.state= {
          name: '',
          email: '',
          address: '',
          password: '',
          country: '',
          phone: '',
          file: '',
          avatar: '',
          errorRegiter: {},
          finish: '',
          thongbao:'',
          errorLogin:{}
         
        }
      //this.handleUserInputFile = this.handleUserInputFile.bind(this)  
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
      console.log(file)
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
      let password = this.state.password;
      let country = this.state.country;
      let phone = this.state.phone;
      let file = this.state.file;
      let errorFormSubmit = this.state.errorRegiter

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
      }if(!password){
        flag = false;
        errorFormSubmit.password = "enter your password";
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
        let type = file.type; //lay ten file
        console.log(type)
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
          {errorRegiter : errorFormSubmit}
        )
      }
      else {
        const user = {
          name: this.state.name,
          email: this.state.email,
          address:this.state.address,
          password: this.state.password,
          country: this.state.country,
          phone: this.state.phone,
          avatar: this.state.avatar,
          level: 0
        };

        axios.post('http://demo-api-local.com/api/register', user)
          .then( res =>{
            //console.log(res)
            if(res.data.errors) {
              this.setState({
                errorRegiter: res.data.errors,
              })
            } else {
              this.setState({
                thongbao: 'ban da dang ky thanh cong'
              })
            }
            console.log(res);
          })
      }
    }
    // Login-------------------------+---------------------------
    handleInputLogin = (e) => {
      let nameInput = e.target.name;
      let value = e.target.value;
      this.setState(
        { [nameInput]:value }
      )
    }
    // 
    handleUserLogin = (e) => {
      e.preventDefault();
      let flag = true;
      let password = this.state.password;
      let email = this.state.email;
      //console.log(password);
      let formUserLogin = this.state.errorLogin

      if(!password){
        flag = false;
        formUserLogin.password = "enter your password";
      }
      if(!email){
        flag = false;
        formUserLogin.email = "enter your email";
      }
      if(!flag){
        this.setState(
          {errorLogin : formUserLogin}
        )
      }
      else {
        const userLogin = {
          password: this.state.password,
          email: this.state.email,
          level : 0
        }
        //console.log(userLogin)
        axios.post('http://demo-api-local.com/api/login', userLogin)
          .then(res =>{
        
           if (res.data.response === 'success') {
              
              let userData = {
                auth_token: res.data.success.token,
                auth: res.data.Auth
                
              };
              //console.log(userData)
              let appState = {
                isLoggedIn: true,
                user: userData,
              };
              //console.log(appState)
              // save app state with user date in local storage
              localStorage.setItem('appState', JSON.stringify(appState));
              // set state to context(App.js)
              this.context.loginContext(true)
              
              this.props.history.push('/')
          } else {
            this.setState(
              { errorLogin:  res.data.errors }
            )
          }
        })
          
      }
    }
    
    render() {
        return (
            <section id="form">{/*form*/}
              <div className="container">
                <div className="row">
                  <div className="col-sm-4 col-sm-offset-1">
                    <div className="login-form">
                      <h2>Login to your account</h2>
                      <ErrorForm Error = {this.state.errorLogin} />
                      <form onSubmit={this.handleUserLogin} >
                        <input type="email" placeholder="Email Addresse" name="email" valua ={this.state.email} onChange={this.handleInputLogin}/>
                        <input type="password" placeholder="password" name="password" value ={this.state.password} onChange={this.handleInputLogin} />
                        <span>
                          <input type="checkbox" className="checkbox" /> 
                          Keep me signed in
                        </span>
       
                        <button type="submit" className="btn btn-default">Login</button>
                      </form>
                    </div> 
                  </div>
                  <div className="col-sm-1">
                    <h2 className="or">OR</h2>
                  </div>
                  <div className="col-sm-4">
                    <div className="signup-form">{/*sign up form*/}
                      <h2>New User Signup!</h2>
                      <ErrorForm Error = {this.state.errorRegiter} />
                      <form onSubmit={this.handleSubmit} >

                        <input type="text" placeholder="Name" name="name" 
                        value={this.state.name}
                        onChange={this.handleInput}
                         />
                        <input type="email" placeholder="Email Address" name="email" 
                        value={this.state.email} 
                        onChange={this.handleInput}
                        />
                        <input type="password" placeholder="Password" name="password"
                        value={this.state.password}
                        onChange={this.handleInput}
                         />
                        <input type="text" placeholder="Address" name="address"
                        value={this.state.address}
                        onChange={this.handleInput}
                        />
                        <input type="text" placeholder="Country" name="country" 
                        value={this.state.country}
                        onChange={this.handleInput}
                        />
                        <input type="number" placeholder="Phone" name="phone"
                        value={this.state.phone}
                        onChange={this.handleInput}
                        />
                        
                        <input type="file" placeholder="choosefile" name="file"
                        onChange={this.handleUserInputFile}
                        />
                        <p>{this.state.thongbao}</p>
                        <button type="submit" className="btn btn-default" name="submit">Signup</button>
                        
                      </form>
                    </div>{/*/sign up form*/}
                  </div>
                </div>
              </div>
            </section>
          );
    }
}
export default withRouter(Login)