import 'react'
import { useAuth } from './store/auth'
export const dashboard=()=>{
  const {user}=useAuth();
<h1>{user.username}</h1> 
}