import { Navigate, NavLink,Outlet } from "react-router-dom"
import { useAuth } from "../../store/auth";
export const AdminLayout=()=>{
    
    return (
        <>
        <header>
            <div className="container">
                <nav>
                    <ul>
                        <li> <NavLink to="/admin/users">Students</NavLink></li>
                        <li> <NavLink to="/admin/agency">Agencies</NavLink></li>
                        <li><NavLink to="/admin/agency/verification">Verification</NavLink></li>
                        <li><NavLink to="/admin/user/requests">Auxilliary Requests</NavLink></li>
                        <li><NavLink to="/admin/logout">Logout</NavLink></li>
                  
                     </ul>
                </nav>
            </div>
        </header>
        <Outlet>

        </Outlet>
        </>

    )
}