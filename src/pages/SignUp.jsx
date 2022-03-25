import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//getting the authentication functionalities from firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
//getting the firestore db
import { firestoreDb } from "../firebase.config.js";
//adding the datas to the firestore
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
//importing the Icons
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
const SignUp = () => {
  //state for showing the password functionilty
  const [showpassword, setshowpassword] = useState(false);
  //state for the form data
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formdata;
  //navigante fucntionality
  const navigate = useNavigate();
  //onchange functionalities
  const UserChange = (e) => {
    setformdata((prev) => ({
      ...prev,
      [e.target.id]: e.target.value, //adding the id of the user input and does not require any further functionality
    }));
  };

  //submit functionality
  const Submit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const usercredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = usercredentials.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      //adding the datas to the firestore database

      const newdata = { ...formdata };
      delete newdata.password;
      newdata.timestamp = serverTimestamp();
      await setDoc(doc(firestoreDb, "users", user.uid), {
        newdata,
      });

      //navigating to the home page
      navigate("/");
    } catch (error) {
      toast.error('Wrong inputs by the user')
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Hello Again!!</p>
        </header>
        <form onSubmit={Submit}>
          <input
            type="text"
            className="nameInput"
            placeholder="Enter your name"
            value={name}
            id="name"
            onChange={UserChange}
          />

          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            value={email}
            className="emailInput"
            onChange={UserChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showpassword ? "text" : "password"}
              className="passwordInput"
              placeholder="Enter your password"
              value={password}
              id="password"
              onChange={UserChange}
            />
            <image
              className="showPassword"
              src={visibilityIcon}
              alt="show the password"
              onClick={() => setshowpassword((prev) => !prev)}
            ></image>
          </div>
          <Link to="/forgotpassword" className="forgotPasswordLink">
            forgot password
          </Link>

          {/* signin functionalities */}

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#f4f4f4" width="34px" height="34px" />
            </button>
          </div>
        </form>
        {/*google oauth*/}
        <Link className="registerLink" to="/signin">
          Sign In
        </Link>
      </div>
    </>
  );
};

export default SignUp;
