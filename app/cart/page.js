"use client"
import { useUserData } from "@/context/UserDataContext";
import CartCard from "@/components/CartCard";
import withAuth from "@/components/withAuth";
import "./style.css"

function Cart() {
    const { userData } = useUserData();
    const cart = userData.cart.items;
    const totalValue = userData.cart.total
    if (cart.length === 0) {
        return (
            <div>Cart is Empty</div>
        )
    }
    return (
        <div className="cartConatiner">
            <div className="carts">
                {
                    cart.map((item) => {
                        if (item.cartQuantity) {
                            return <CartCard id={item.productId} key={item.productId} imageUrl={item.imageUrl} name={item.name} price={item.price} qty={item.cartQuantity} />
                        }
                    })
                }
            </div>

            
            <div className="total">
                Total Cart Value - {totalValue || "Null from API"}
            </div>
            
        </div>

    )
}

export default withAuth(Cart);