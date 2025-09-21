import React, { Component } from 'react';
import './App.css';
import { callapi } from './api';

class App extends Component {
    constructor(){
        super();
        this.signin = this.signin.bind(this);
    }
  
    showsignin(){   
        let popup =  document.getElementById("popup");
        popup.style.display = "block";
        let popupHeader = document.getElementById("popupheader");
        popupHeader.innerHTML = "Login";
        let signin = document.getElementById("signin");
        let signup = document.getElementById("signup");
        signin.style.display="block";
        signup.style.display="none";

        username.value = "";  // to clear the previous values which we have entered
        password.value = "";  // to clear the previous values
    }
    showSignup(){
        let popup =  document.getElementById("popup");
        popup.style.display = "block";
        let popupHeader = document.getElementById("popupheader");
        popupHeader.innerHTML = "Create New Account";
        let signin = document.getElementById("signin");
        let signup = document.getElementById("signup");
        signin.style.display="none";
        signup.style.display="block";
        let fullname = document.getElementById("fullName");
        let email = document.getElementById("email");
        let dob = document.getElementById("dateofbirth");
        let signuppassword = document.getElementById("signuppassword");
        let confirmpassword = document.getElementById("confirmPassword");
        fullname.value="";
        email.value="";
        dob.value="";
        signuppassword.value="";
        confirmpassword.value="";
    }
    closeSignIn(event){
        if(event.target.id=="popup"){
            let popup =  document.getElementById("popup");
            popup.style.display = "none";
        }
    }
     signin(){
        username.style.border = "";
        password.style.border = "";
        if(username.value === ""){
            username.style.border = "1px solid red";
            username.focus();
            ret;
        }
        if(password.value === ""){
            password.style.border = "1px solid yellow";
            password.focus();
            ret;
        }
        let data = JSON.stringify({
            email : username.value,
            password : password.value
        });
        callapi("POST","http://localhost:2006/banking/signup" ,data,this.signinResponse);
    }
    signinResponse(){
        window.location.replace("/dashboard");  // if provide credentaials are valid we want to render t another page -- other page name is dahsboard
    }
    // handleLoginSubmit = () => {
    //   // In real-world you'd validate here
    //   this.setState({ redirectToDashboard: true });
    // };
    render() {
        return (
            <div id='container'>
                <div id = 'popup'  onClick={this.closeSignIn}>
                    <div id='popupwindow'>
                        <div id='popupheader'><label> LOGIN </label></div>
                        <div id='signin'>
                        <label className='usernamelabel'>Username: </label>
                        <input type='text' id='username'/>
                        <label className='=passwordlabel'> Password: </label>
                        <input type='password' id='password'/>
                        <div className='forgetPassword'>Forget<label>Password?</label></div>
                        <button className='signinButton' onClick={this.signin}>SIGNIN</button>
                        <div className='div1'></div>
                        <div className='div2'>
                            Don't Have An Account?     
                            <label  onClick={(this.showSignup)}> Signup Now </label>
                        </div>
                    </div>
                    <div id='signup'>
                        <label className='fullName'>Fullname: </label>
                        <input type='text' id='fullname'/>
                        <label className='email'>Email: </label>
                        <input type='text' id='email'/>
                        <label className='dateofbirth'>Date Of Birth: </label>
                        <input type='date' id='dateofbirth'/>
                        <label className='gender'>Gender: </label>
                        <select id='gender'>
                            <option value=''></option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='None'>None</option>
                        </select>
                        <label > Password: </label>
                        <input type='password' id='signuppassword'/>
                        <label className='=confirmPassword'> Confirm Password: </label>
                        <input type='password' id='confirmPassword'/>
                        <button>Register</button>
                        <div>Already Have An Account <span onClick={this.showsignin}>Signin</span></div>
                    </div>
                    </div>
                </div>
                <div id='header'>
                    <h1> <center> Online Banking System </center></h1>
                </div>
                <div id='main'>
                    <div>   
                        <div className='text1'> <h3> Welcome to Online Banking System!!</h3></div>
                        <br/>
                        <label className='home'> Home </label>
                        <br/>
                        <label className='signintext'onClick={(this.showsignin)}> Signin </label>
                        <br/>
                        <label className='signupText' onClick={(this.showSignup)}> Signup </label>
                        <br/>
                        <label className='about'> About </label>
                    </div>
                </div>
                <div id='footer'>
                    <label className='copyrighttext'>copyright @2024, all rights are reserved</label>
                </div>  
            </div>
        );
    }
}
export default App;