import React from 'react'
import { useEffect,useState ,useRef} from 'react'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
const UseAuthStatus = () => {
    //managing the 2 states for the use login authentication
    const [loggedin,setloggedin]=useState(false);
    const [checkedin,setcheckedin]=useState(true);
    const ismounted=useRef(true);
    //using the react use effect to check for the functionality for use auth
    useEffect(()=>{
        

        if(ismounted){
const auth=getAuth();
onAuthStateChanged(auth,(user)=>{
    if(user){
        setloggedin(true);
        setcheckedin(false);
    }
})
    }
    return ()=>{
        ismounted.current=false;
    }
    },[ismounted])
  return {
      loggedin,checkedin
  }

}

export default UseAuthStatus