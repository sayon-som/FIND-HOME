import React, { useState } from "react";
import { useEffect } from "react";
import { getAuth, signOut,  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { updateDoc} from "firebase/firestore";
import { firestoreDb } from "../firebase.config";
const Profile = () => {
  const auth=getAuth();
  
//state for the change in the details
const [change,setchange]=useState(false);


  const [formdata,setformdata]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email,
  })

  const {name,email}=formdata;

const navigate=useNavigate();
 //submittinng the changes functionalities and submitting data into the firestre

 const Submit=()=>{
   try{
     if(auth.currentUser.displayName!==)
   }
 }

 //creating the change form functionality

 const OnChange=(e)=>{
   setformdata((prev) => ({
     ...prev,
     [e.target.id]: e.target.value, //adding the id of the user input and does not require any further functionality
   }));
 }
//creating the logout functionality for the user

const Logout=()=>{
  auth.signOut();
  navigate("/signIn");

}
 
  return (
    <>
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">User Profile</p>
          <button type="button" className="logOut" onClick={Logout}>
            Logout
          </button>
        </header>
        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">User Details</p>
            <p
              className="changePersonalDetails"
              onClick={() => {
                change && Submit();
                setchange((prev) => !prev);
              }}
            >
              {change ? "Changed" : "Change"}
            </p>
          </div>
          <div className="profileCard">
            <form
              action="
          "
            >
              <input
                type="text"
                name="name"
                id="name"
                className={!change ? "profileName" : "profileNameActive"}
                disabled={!change}
                value={name}
                onChange={OnChange}
              />
              <input
                type="email"
                name="email"
                id="email"
                className={!change ? "profileEmail" : "profileEmailActive"}
                disabled={!change}
                value={email}
                onChange={OnChange}
              />
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
