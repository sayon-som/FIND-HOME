import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { firestoreDb } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

import ListingItem from "../components/ListingItem";

const Category = () => {
  //use of the states
  const [listing, setlist] = useState(null);
  const [loading, setloading] = useState(true);
  const { type } = useParams();

  //we will use the useEffect hook to fetch the listings from firestore
  useEffect(() => {
    const fetch_list = async () => {
      try {
        //fetching the user ref
        const list_ref = collection(firestoreDb, "listings");
        //queryinh the listings
        const q = query(
          list_ref,
          where("type", "==", type),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        //execute the query
        const snap = await getDocs(q);
        let listing = [];
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
  }, [type]);
  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {type === "rent" ? "Home for Rent" : "Home for Sale"}
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
        <p>No Home for {type}</p>
      )}
    </div>
  );
};

export default Category;
