import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {getAuth,sendPasswordResetEmail } from "firebase/auth"
import { toast } from "react-toastify";
import {ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
const ForgotPassword = () => {
  const [email,setemail]=useState();
  const Change=(e)=>{
    setemail(e.target.value);

  };

  const submit=async(e)=>{
    e.preventDefault();
    try{
      const auth=getAuth();
await sendPasswordResetEmail(auth,email);
toast.success('Email is being sent');
    }
    catch(err){
      toast.error('Email not being sent :(')

    }

  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot password?</p>
      </header>
      <main>
        <form action="" onSubmit={submit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="Email"
            value={email}
            onChange={Change}
          />
          <Link className="forgotPasswordLink" to="/signIn">
            SignIn
          </Link>
          <div className="signInBar">
            <div className="signInText">
              sendResetLink
            </div>
            <button className="signInButton"> <ArrowRightIcon fill="#f4f4f4" height="34px" width="34px" /></button>
          </div> 
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
