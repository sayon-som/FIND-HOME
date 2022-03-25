import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Explore from './pages/Explore';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Offer from './pages/Offer';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import {ToastContainer} from 'react-toastify';
 import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offer/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          
        </Routes>
        <Navbar/>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
