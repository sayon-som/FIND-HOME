import React from "react";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import { Link } from "react-router-dom";
import bed from "../assets/svg/bedIcon.svg";
import wash from "../assets/svg/bathtubIcon.svg";

const ListingItem = ({ list, id,deletef}) => {
  return (
    <li className="categoryListing">
      <Link to={`/category/${list.type}/${id}`} className="categoryListingLink">
        <img
          src={list.imgUrls[0]}
          alt={list.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingName">{list.name}</p>
          <p className="categoryListingLocation">{list.location}</p>

          <p className="categoryListingPrice">
            $ {list.offer ? list.discountedPrice : list.regularPrice}
            {list.type === "rent" && "/month"}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bed} alt="bed" />
            <p className="categoryListingInfoText">
              {list.bedrooms > 1 ? `${list.bedrooms} bedrooms` : "1 bedroom"}
            </p>
            <img src={wash} alt="wash" />
            <p className="categoryListingInfoText">
              {list.bathrooms > 1 ? `${list.bathrooms} bathrooms` : "1 bathroom"}
            </p>
          </div>
        </div>
      </Link>
      {deletef && (
        <DeleteIcon className="removeIcon" fill='rgb(231,76,60)' onClick={()=>{
          deletef(list.id,list.name)
        }}/>
      )}
      
    </li>
  );
};

export default ListingItem;
