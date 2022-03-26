import React, { useState } from "react";
import { useEffect } from "react";
//import the toast functionality
import { toast } from "react-toastify";
import { getAuth, signOut, updateEmail,  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { updateDoc,doc} from "firebase/firestore";
import { firestoreDb } from "../firebase.config";
import { updateProfile } from "firebase/auth";
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
 //submittinng the changes functionalities and submitting data into the firestore

 const Submit=async()=>{
   try{
     if(auth.currentUser.displayName!==name){
       //update the dispaly name in firestore
       await updateProfile(auth.currentUser,{
         displayName:name,

       })
       //updating the data in the firestore storage
       const userRef=doc(firestoreDb,"users",auth.currentUser.uid);
       await updateDoc(userRef,{
         name,
       })
     }
   }
   catch(err){
     //in case the backend does not work out
     //in case there is some erorr in the backend functionality
    console.log(err);
toast.error('The profile details could not be updated');
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
