import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import {Link,useNavigate} from 'react-router-dom'
//sign in functionalities for the user
import  {signInWithEmailAndPassword,getAuth} from "firebase/auth";
//importing the Icons
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg' 
import GoogleOauth from "../components/GoogleOauth";
const SignIn = () => {
  //state for showing the password functionilty 
  const [showpassword,setshowpassword]=useState(false);
  //state for the form data
  const [formdata,setformdata]=useState({
    email:'',
    password:''
  })
  const {email,password}=formdata;
  //navigate fucntionality
  const navigate=useNavigate();
//onchange functionalities
const UserChange=(e)=>{
setformdata((prev)=>(
  {
    ...prev,
    [e.target.id]:e.target.value//adding the id of the user input and does not require any further functionality
  }
));
}

//submit functionlatites
const Submit=async(e)=>{
e.preventDefault();
try{
  const auth=getAuth();
  const cred=await signInWithEmailAndPassword(
    auth,email,password
  );
  if(cred.user){
    navigate("/");
  }
  
  }
  catch(e){
    toast.error('User Credentials are wrong')
  }
}



  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Hello Again!!
          </p>

        </header>
        <form onSubmit={Submit}>
      <input type="email" placeholder="Enter your email" id="email" value={email} className="emailInput" onChange={UserChange}/>
<div className="passwordInputDiv">
  <input type={showpassword?'text':'password'} className="passwordInput" placeholder="Enter your password" id="password" value={password} onChange={UserChange} />
<image className="showPassword" src={visibilityIcon} alt="show the password" onClick={()=>setshowpassword((prev)=>!prev)}></image>
</div>
<Link to="/forgotpassword" className="forgotPasswordLink">forgot password</Link>

{/* signin functionalities */}

<div className="signInBar">
  <p className="signInText">
    Sign In
  </p>
  <button className="signInButton">
    <ArrowRightIcon fill='#f4f4f4' width="34px" height="34px"/>
  </button>
</div>

        </form>
        {/* google oauth functionality*/}
        <GoogleOauth/>




        <Link className="registerLink" to='/signup'>Sign Up</Link>
      </div>
    </>
  );
};

export default SignIn;
