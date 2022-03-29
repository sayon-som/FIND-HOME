import {useState,useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import { getDoc,doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { firestoreDb } from '../firebase.config'
import Spinner from './Spinner'
import shareIcon from "../assets/svg/shareIcon.svg"
//page slider function using swiper
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { MapContainer, Marker, Popup,TileLayer } from 'react-leaflet'
SwiperCore.use([Navigation,Pagination,Scrollbar,A11y])

const Listings = () => {
    //for the listings
    const [list,setlist]=useState(null);
    
    const [loading,setloading]=useState(true);
    //for sharing the link of the list with any other user
    const [share,setshare]=useState(false);

    //for the route navigation functionalities
    const navigate=useNavigate();
    const auth=getAuth();
    //for getting the id of the required listing
    const params=useParams(); 
//for all the fetch operation to be done the first time.
useEffect(()=>{
const fetch_list=async()=>{
    const doc_ref=doc(firestoreDb,"listings",params.listingid);
    const snap=await getDoc(doc_ref);
    if(snap.exists()){
        setlist(snap.data());
        setloading(false);

    }
}
//calling the promise based function
fetch_list();
},[navigate,params.listingid])

//showing the spinner component for loading functionality
if(loading){
    return <Spinner/>
}

  return (
    <main>
      {/* slider */}
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {list.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${list.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="swiperSlideDiv"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setshare(true);
          setTimeout(() => {
            setshare(false);
          }, 1000);
        }}
      >
        <img src={shareIcon} alt="share Icon" />
      </div>
      {share && <p className="linkCopied">listing Link is being copied</p>}
      <div className="listingDetails">
        <p className="listingName">
          {list.name} -- $
          {list.offer ? list.discountedPrice : list.regularPrice}
        </p>
        <p className="listingLocation">{list.location}</p>
        <p className="listingType">
          The Place is available for {list.type === "rent" ? "Rent" : "Sale"}
        </p>
        {list.offer && (
          <p className="discountPrice">
            ${list.regularPrice - list.discountedPrice} Discount
          </p>
        )}
        <ul className="listingDetailsList">
          <li>
            {list.bedrooms > 1
              ? `${list.bedrooms} bedrooms available`
              : `1 bedroom available`}
          </li>
          <li>
            {list.bathrooms > 1
              ? `${list.bathrooms} bathrooms available`
              : `1 bathroom available`}
          </li>
          <li>{list.parking && "Parking Spot available"}</li>
          <li>{list.furnished && "It is Furnished"}</li>
        </ul>

        {/* for the laeflet map functionality */}

        <p className="listingLocationTitle">Location</p>
        <div className="leafletContainer">
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={[list.geolocation.lat, list.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />
            <Marker position={[list.geolocation.lat, list.geolocation.lng]}>
              <Popup>{list.location}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {auth.currentUser?.uid !== list.userRef && (
          <Link
            to={`/contacts/${list.userRef}?listingName=${list.name}`}
            className="primaryButton"
          >
            {" "}
            Contact the Place owner
          </Link>
        )}
      </div>
    </main>
  );
}

export default Listings