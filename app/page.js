"use client"

import Login from "@/components/Login";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserData } from "../context/UserDataContext";
export default function Home() {
  const [login,setLogin] = useState(null)
  const router = useRouter();
  const { setUserData } = useUserData()
  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      setLogin(true)
      router.push("/product");
    }
    else{
      setLogin(false)
    }
  }, [router]);


  if(login===null){
    return(
      <div>Loading..</div>
    )
  }
  
  return (
    <div >
      <Login/>
    </div>
  );
}
