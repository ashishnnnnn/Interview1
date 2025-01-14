import "./style.css"
import Image from "next/image";
import { toast } from "react-toastify";

function CartCard(props){
    const {imageUrl,name,price,qty,id} = props
    const cartHandle = (type)=>{
        const qtyToPass = type==="decrease" ? qty-1: qty + 1 
        const token = localStorage.getItem('token')
        fetch('https://interview.samajsaathi.com/api/cart', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify({ productId: id, quantity: qtyToPass })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                    // Since API is thowing error while addition
                }
                return res.json();
            })
            .then((data) => {
                if (data && data.items?.length > 0) {
                    setUserData({ type: "updateCart", payload: data });
                }
            })
            .catch((err) => {
                toast.error('Error while adding into cart', {
                    position: 'top-left',
                    autoClose: 1500,
                });
            });
    }
    return(
        <div className="cartCard">
            <div className="imageContainer">
                <Image
                    layout="fill"
                    objectFit="fill"
                    className="image"
                    src={imageUrl}
                    alt="banner image"
                    onError={(e) =>
                        console.error('Image failed to load:', e.target.src)
                    }
                />
            </div>
            <div className="detail">
                <div className="info">
                        <div className="label">Name</div>
                        <div className="data">{name}</div>
                </div>
                <div className="info">
                        <div className="label">Price</div>
                        <div className="data">{price}</div>
                </div>
                
                <div className="qty-container">
                    <div onClick={()=>cartHandle("decrease")} className="decrement">-</div>
                    <div>{qty}</div>
                    <div onClick={()=>cartHandle("increase")} className="increment">+</div>
                </div>

            </div>
        </div>
    )
}

export default CartCard;