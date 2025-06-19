import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// context
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5;

const Cart = () => {
    const [productRowsState, setProductRowsState] = useState(2) // 1 for wishlist, 2 for cart
    // context
    const {
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        isInCart
    } = useCart();

    const {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
    } = useWishlist();


    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const navigate = useNavigate();

    // Placeholder values
    const subtotal = 100; // Replace with real subtotal calculation
    const promoDiscount = appliedPromo ? 10 : 0; // Replace with real promo logic
    const subtotalAfterPromo = subtotal - promoDiscount;
    const shipping = subtotalAfterPromo >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotalAfterPromo + shipping;

    // Placeholder function for applying promo code
    const handleApplyPromo = () => {
        setAppliedPromo({ code: promoCode });
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Shopping Cart</h2>
            <div className="row">
                <div className="col-md-8">
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div>
                            {cart.map(item => (
                                <div key={item.slug}>
                                    {/* Replace with your CartItem component */}
                                    <div>Product: {item.slug} (x{item.quantity})</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="col-md-4">
                    <div>
                        <h5>Promo Code</h5>
                        <div className="promo-row">
                            <input
                                type="text"
                                className="promo-input"
                                placeholder="Enter promo code"
                                value={promoCode}
                                onChange={e => setPromoCode(e.target.value)}
                            />
                            <button
                                className="promo-btn"
                                onClick={handleApplyPromo}
                                disabled={!promoCode}
                            >
                                Apply
                            </button>
                        </div>
                        {appliedPromo && (
                            <div className="promo-success">
                                Promo code <b>{appliedPromo.code}</b> applied!
                            </div>
                        )}
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>€ {subtotalAfterPromo.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'Free' : `€ ${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="summary-row total-row">
                            <span>Total</span>
                            <span>€ {total.toFixed(2)}</span>
                        </div>
                        <button
                            className="checkout-btn"
                            onClick={() => navigate('/checkout')}
                            disabled={cart.length === 0}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;