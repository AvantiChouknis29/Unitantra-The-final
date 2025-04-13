import React from 'react'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
export const AdminLogout=()=>{
 const {LogoutAdmin}=useAuth()
   useEffect(()=>{
    LogoutAdmin();
   },[LogoutAdmin()])
   return <Navigate to="/login"></Navigate>

  
}
