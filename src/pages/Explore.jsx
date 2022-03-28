import React from 'react'
import rent_cat from "../assets/jpg/rentCategoryImage.jpg"
import sell_cat from "../assets/jpg/sellCategoryImage.jpg"
import { Link } from 'react-router-dom'
const Explore = () => {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>

      <main>
        {/* the slider would be present here*/}
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rent_cat}
              alt="rentcategoryimage"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Home for rent</p>
          </Link>
          <Link to="/category/sale">
            <img
              src={sell_cat}
              alt="sellcategoryimage"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Home for sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore