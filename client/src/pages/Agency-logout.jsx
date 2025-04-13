import { useEffect } from "react"
import {Navigate} from "react-router-dom"
import { useAgencyAuth } from "../store/agency_auth"
export const AgencyLogout=()=>{
    
    const {LogoutAgency}=useAgencyAuth();

    useEffect(()=>{
        LogoutAgency();

    },[LogoutAgency])

    return <Navigate to="/agencylogin"></Navigate>
}