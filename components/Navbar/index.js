'use client'
import { useEffect } from "react";
import "./style.css"
import { useUserData } from "@/context/UserDataContext";
import { useRouter  } from 'next/navigation';
import Link from 'next/link'

function Navbar(){
    const router = useRouter();
    const { userData,setUserData } = useUserData();
    const cart = userData?.cart
    const token = localStorage.getItem('token')

    const handleClick = ()=>{
        router.push("/cart")
    }
    useEffect(()=>{
        if(token){
            fetch('https://interview.samajsaathi.com/api/cart', {
                headers: { Authorization: `Bearer ${token}` }
              }).then(resp => resp.json())
                .then(json=>{
                  json && setUserData({ type: "updateCart", payload: json })
            })
        }
    },[])
    return(
        <div className="navbar">
            <Link href="/" className="header">
                Cat Ecommerce
            </Link>
        {token &&    
            <div onClick={handleClick} className="cart">
                Cart {cart.items?.length}
            </div>}
        </div>
    )
}

export default Navbar