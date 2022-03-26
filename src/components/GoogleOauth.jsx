import { useLocation,useNavigate } from "react-router-dom"
import {getAuth,signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
//database operations
import {doc,setDoc,getDoc, serverTimestamp} from 'firebase/firestore'
import {firestoreDb} from "../firebase.config"
import { toast } from "react-toastify"
import icon from '../assets/svg/googleIcon.svg'
const GoogleOauth = () => {
  const navigate=useNavigate();
  const location=useLocation();
 
  const googleClick=async()=>{
    try{
      const auth=getAuth();
      const provider=new GoogleAuthProvider();
      const res=await signInWithPopup(auth,provider);
      const user=res.user;
      //first to check if user already present in the firestore db or not
      const docr=doc(firestoreDb,'users',user.uid);
      const check=await getDoc(docr);
      if(!check.exists()){
        //go on with the signin of the user using the google setup
        await setDoc(doc(firestoreDb,'users',user.uid),{
          name:user.displayName,
          email:user.email,
          timestamp:serverTimestamp()
        });

      }
      navigate('/');

    }
    catch(err){
      toast.error('Google SignIn went wrong :(')
    }

  }

  return (
    <div className="socialLogin"><p>Sign {location.pathname==='/signin'?'In':'Up'}</p>
    <button className="socialIconDiv" onClick={googleClick}>
      <img src={icon} alt="google Icon" className="socialIconImg" />
    </button></div>
  )
}

export default GoogleOauth