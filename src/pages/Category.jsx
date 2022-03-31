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
  startAfter,
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

  //for the pagination functionality
  const [lastfetched, setlastfetched] = useState(null);

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
          orderBy("timestamp", "desc")
        );
        //execute the query
        const snap = await getDocs(q);

        //getting the last visible listing
        const lastvis = snap.docs[snap.docs.length - 1];
        setlastfetched(lastvis);
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
  //pagination load more
  // const onfetchedmoreListings = async () => {
  //   try {
  //     //fetching the user ref
  //     const list_ref = collection(firestoreDb, "listings");
  //     //queryinh the listings
  //     const q = query(
  //       list_ref,
  //       where("type", "==", type),
  //       orderBy("timestamp", "desc"),
  //       startAfter(lastfetched),
  //       limit(1)
  //     );
  //     //execute the query
  //     const snap = await getDocs(q);

  //     //getting the last visible listing
  //     const lastvis = snap.docs[snap.docs.length - 1];
  //     let listing = [];
  //     //looping throught the snapshot
  //     snap.forEach((data) => {
  //       return listing.push({
  //         id: data.id,
  //         data: data.data(),
  //       });
  //     });

  //     setlist((prev) => [...prev,...listing,]);
  //     setloading(false);
  //   } catch (err) {
  //     toast.error("Something went wrong");
  //   }
  // };
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

          {/* {lastfetched && (
            <p className="loadMore" onClick={onfetchedmoreListings}>
              Load More Listings
            </p>
          )} */}
        </>
      ) : (
        <p>No Home for {type}</p>
      )}
    </div>
  );
};

export default Category;
