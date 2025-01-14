"use client"
import "./style.css"

import withAuth from "@/components/withAuth";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

import DetailCard from "@/components/DetailCard";

function ProductPage() {
    const pathname = usePathname();
    const [product, setProduct] = useState({})
    useEffect(() => {
        const id = pathname.split('/')[2];
        if (id) {
            const token = localStorage.getItem('token')
            fetch(`https://interview.samajsaathi.com/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(resp => resp.json())
            .then(json => setProduct(json))
        }
    }, [])
    if(Object.keys(product).length===0){
        return(
            <p>Data is getting fetched ..</p>
        )
    }
    return (
        <DetailCard id={product.id} name={product.name} price={product.price} imageUrl={product.imageUrl} description={product.description} qty={product.quantity}/>
    )
}

export default withAuth(ProductPage);