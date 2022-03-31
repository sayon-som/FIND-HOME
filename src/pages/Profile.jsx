import React, { useState } from "react";
import { useEffect } from "react";
//import the toast functionality
import { toast } from "react-toastify";
import { getAuth, signOut, updateEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  where,
} from "firebase/firestore";
import { firestoreDb } from "../firebase.config";
import { updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem.jsx";
//icons
import arrow from "../assets/svg/keyboardArrowRightIcon.svg";
import home from "../assets/svg/homeIcon.svg";
import EditListing from "./EditListing";
const Profile = () => {
  const auth = getAuth();
  //state for storing the listings from the user
  const [list, setlist] = useState(null);
  //state for the change in the details
  const [change, setchange] = useState(false);
  //creating a loading state
  const [loading, setloading] = useState(true);

  const [formdata, setformdata] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formdata;

  const navigate = useNavigate();

  useEffect(() => {
    const fetch_user_listing = async () => {
      const list_collection = collection(firestoreDb, "listings");
      const q = query(
        list_collection,
        where("userRef", "==", auth.currentUser.uid)
      );
      const list_snap = await getDocs(q);
      let listings = [];
      list_snap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setlist(listings);
      setloading(false);
    };
    fetch_user_listing();
  }, [auth.currentUser.uid]);

  //submittinng the changes functionalities and submitting data into the firestore

  const Submit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update the dispaly name in firestore
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //updating the data in the firestore storage
        const userRef = doc(firestoreDb, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (err) {
      //in case the backend does not work out
      //in case there is some erorr in the backend functionality
      console.log(err);
      toast.error("The profile details could not be updated");
    }
  };

  //creating the change form functionality

  const OnChange = (e) => {
    setformdata((prev) => ({
      ...prev,
      [e.target.id]: e.target.value, //adding the id of the user input and does not require any further functionality
    }));
  };
  //delete listing functionality

  const DeleteList = async (listid) => {
    await deleteDoc(doc(firestoreDb, "listings", listid));
    const updatedlist = list.filter((list) => list.id !== listid);
    setlist(updatedlist);
    toast.success("Your listing has been deleted");
  };


  //edit functionality for the list

  const EditList=(listid)=>{
    navigate(`/editlistings/${listid}`)

  }
  //creating the logout functionality for the user

  const Logout = () => {
    auth.signOut();
    navigate("/signIn");
  };
  

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
          <Link to="/createlistings" className="createListing">
            <img src={home} alt="home" />
            <p>Rent your house or sell it</p>
            <img src={arrow} alt="right" />
          </Link>
          {!loading && list?.length > 0 && (
            <>
              <p className="listingText">Listings</p>
              <ul className="listingList">
                {list.map((list) => (
                  <ListingItem
                    key={list.id}
                    list={list.data}
                    deletef={() => {
                      DeleteList(list.id);
                    }}
                    
                    editf={()=>{
                      EditList(list.id);
                    }

                    }
                    id={list.id}
                  />
                ))}
              </ul>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Profile;
