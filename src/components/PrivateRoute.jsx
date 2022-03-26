import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import UseAuthStatus from '../hooks/UseAuthStatus';
import Spinner from './Spinner';
const PrivateRoute = () => {
    // const loggedIn=false;
    const {loggedin,checkedin}=UseAuthStatus();
    if(checkedin){
        return <Spinner/>
    }
    else{
  return loggedin? <Outlet/>:<Navigate to="/signIn"/>
    }
}

export default PrivateRoute
