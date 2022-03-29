import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Explore from './pages/Explore';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './pages/SignIn';
import {ToastContainer} from 'react-toastify';
import CreateListings from './pages/CreateListings';
 import "react-toastify/dist/ReactToastify.css";
import Category from "./pages/Category.jsx"
import Listings from './components/Listings';
import Contact from './pages/Contact';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/category/:type" element={<Category />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          {/*implementing the private route functionality*/}
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/createlistings" element={<CreateListings />} />
          <Route path="/category/:type/:listingid" element={<Listings />} />
          <Route path="/contacts/:ownerid" element={<Contact/>}/>
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
