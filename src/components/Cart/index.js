import React, { useContext, useEffect, useState } from "react";
import { CouponContext } from "../context/CouponContext";
import "./Cart.sass";

function Coupon({MBS, code, match, ratio}) {
    return (
        <div className="coupon">
            <span>{MBS}</span>
            <span>Kod: {code}</span>
            <span>Mac: {match}</span>
            <span className="ratio">Oran: {ratio}</span>
        </div>
    );
}

const Cart = () => {
    const cart = useContext(CouponContext);
    const [cost, setCost] = useState(0)

    const costPerCoupon = 20

    useEffect(() => {
        let sum = 0
        if (cart.length > 0) {
            cart.forEach(c => {
                sum += c.ratio * costPerCoupon
            })
        }

        setCost(sum.toFixed(2))
    }, [cart])

    return (
        <div className="cart-container">
            {cart.map(c =>
                <Coupon MBS={c.MBS} code={c.code} match={c.match} ratio={c.ratio}/>
            )}
            <span className="sum">Toplam Tutar: {cost} TL</span>
        </div>
    );
};

export default Cart;
