import React from "react";
import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
//importing the Icons
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg' 
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
))


}
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">
            Hello Again!!
          </p>

        </header>
        <form>
      <input type="email" placeholder="Enter your email" id="email" value={email} className="emailInput" onChange={UserChange}/>
<div className="passwordInputDiv">
  <input type={showpassword?'text':'password'} className="passwordInput" placeholder="Enter your password" value={password} onChange={UserChange} />
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
        {
          /*google oauth*/ 
        }
        <Link className="registerLink" to='/signup'>Sign Up</Link>
      </div>
    </>
  );
};

export default SignIn;
