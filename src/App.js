import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Explore from './pages/Explore';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Offer from './pages/Offer';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './pages/SignIn';
import {ToastContainer} from 'react-toastify';
 import "react-toastify/dist/ReactToastify.css";
import Category from "./pages/Category.jsx"
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offer/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/category/:type" element={<Category/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          {/*implementing the private route functionality*/ }
          <Route path="/profile" element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile/>}/>
          </Route>
          
        </Routes>
        <Navbar/>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
