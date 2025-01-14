"use client"
import "./style.css"

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import withAuth from "@/components/withAuth";

function Product(){
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        const token = localStorage.getItem('token')
        fetch('https://interview.samajsaathi.com/api/products', {
            headers: {Authorization: `Bearer ${token}`}
          })
             .then(resp => resp.json())
             .then(json => setProducts(json))
    },[])
    if(products.length===0){
        return(
            <div>Products are getting fetched</div>
        )
    }
    return(
        <div className="arrange">
            {
                products.map((ele)=>(
                    <ProductCard id={ele.id} name={ele.name} price={ele.price} imageUrl={ele.imageUrl} key={ele.id}/>
                ))
            }
        </div>
    )
}

export default withAuth(Product);