import React from "react";
import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter

} from "firebase/firestore";
import { firestoreDb } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

import ListingItem from "../components/ListingItem";

const Offers = () => {
  //use of the states
  const [listing, setlist] = useState(null);
  const [loading, setloading] = useState(true);


  //we will use the useEffect hook to fetch the listings from firestore
  useEffect(() => {
    const fetch_list = async () => {
      try {
        //fetching the user ref
        const list_ref = collection(firestoreDb, "listings");
        //queryinh the listings
        const q = query(
          list_ref,
          where('offer', '==', true),
         
          limit(10)
        );
        let listing = [];
        //execute the query
        const snap = await getDocs(q);
        
        //looping throught the snapshot
        snap.forEach((data) => {
          return listing.push({
            id: data.id,
            data: data.data(),
          });
        });

        setlist(listing);
        setloading(false);
      } catch (err) {
        toast.error("Something went wrong");
      }
    };
    fetch_list();
  },[]);
  return (
    <div className="category">
      <header>
        <p className="pageHeader">
         Offers
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listing && listing.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listing.map((listing) => (
                <ListingItem
                  id={listing.id}
                  list={listing.data}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No offers</p>
      )}
    </div>
  );
};

export default Offers;
