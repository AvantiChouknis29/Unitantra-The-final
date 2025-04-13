import React from 'react'
import { useCart } from '../store/cart'
import { useAuth } from '../store/auth'; // Adjust the path as needed

import {useNavigate} from "react-router-dom"
export const Cart = () => {
    const [auth,setAuth]=useAuth()
    const [cart,setCart]=useCart()
    const navigate=useNavigate()
  return (
    <div className="container">
        <div className="row">
           <div className="col-md-12">
            <h1 className="text-center bg-light p-2">{"Hello"}</h1>
           </div>
        </div>
    </div>
  )
}
