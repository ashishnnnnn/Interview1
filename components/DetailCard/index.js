import "./style.css"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUserData } from "@/context/UserDataContext";
import { toast } from "react-toastify";

function DetailCard(props) {
    const { name, price, imageUrl, id, description, qty } = props;
    const router = useRouter();
    const { userData, setUserData } = useUserData();
    const handleAddCart = () => {
        const token = localStorage.getItem('token')
        fetch('https://interview.samajsaathi.com/api/cart', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify({ productId: id, quantity: 1 })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
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
    return (
        <div className="Detailcard">
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
            <div className="aboutSection">
                <div className="info">
                    <div className="label">Name</div>
                    <div className="data">{name}</div>
                </div>
                <div className="info">
                    <div className="label">Description</div>
                    <div className="data">{description}</div>
                </div>
                <div className="info">
                    <div className="label">Price</div>
                    <div className="data">{price}</div>
                </div>
                <div className="info">
                    <div className="label">Quantity</div>
                    <div className="data">{qty}</div>
                </div>
                <div onClick={handleAddCart} className="cartBtn">Add to Cart</div>
            </div>
        </div>
    )
}

export default DetailCard;