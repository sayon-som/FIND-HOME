import { useNavigate, useLocation } from "react-router-dom";
import {ReactComponent as OfferIcon} from "../assets/svg/localOfferIcon.svg"
import {ReactComponent as ExploreIcon} from "../assets/svg/exploreIcon.svg"
import {ReactComponent as ProfileIcon} from "../assets/svg/personIcon.svg"
import Offer from "../pages/Offer";

const Navbar = () => {
    //helping the user to navigate
    const navigate=useNavigate();
    //using the location of the current path
    const location=useLocation();
    //getting the current path of the route
    const getpath=(route)=>{
        if(route===location.pathname){
            return true;
        }
    }

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem">
            <ExploreIcon
              fill={getpath("/") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
              onClick={() => navigate("/")}
            />
            <p
              className={
                getpath('/') ? "navbarListItemNameActive" : "navbarListItemName"
              }
            >
              Explore
            </p>
          </li>

          <li className="navbarListItem">
            <ProfileIcon
              fill={getpath("/profile") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
              onClick={() => navigate("/profile")}
            />
            <p
              className={
                getpath('/profile') ? "navbarListItemNameActive" : "navbarListItemName"
              }
            >
              Profile
            </p>
          </li>

          <li className="navbarListItem">
            <OfferIcon
              fill={getpath("/offers") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
              onClick={() => navigate("/offers")}
            />
            <p
              className={
                getpath('/offers') ? "navbarListItemNameActive" : "navbarListItemName"
              }
            >
              Offer
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar   