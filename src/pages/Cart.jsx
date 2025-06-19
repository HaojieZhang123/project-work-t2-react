import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductRow from '../components/ProductRow';

// context
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5;

const Cart = () => {
    const [productRowsState, setProductRowsState] = useState(2) // 1 for wishlist, 2 for cart    
    const [products, setProducts] = useState([])

    const [subtotal, setSubtotal] = useState(0);

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

    const calculateSubtotal = () => {
        return cart.reduce((acc, cartItem) => {
            const product = products.find(p => p.slug === cartItem.slug);
            if (!product) return acc;
            const price = parseFloat(product.price) || 0;
            const discount = parseFloat(product.discount) || 0;
            const discountedPrice = price - (price * discount / 100);
            return acc + discountedPrice * cartItem.quantity;
        }, 0);
    };

    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const navigate = useNavigate();

    const promoDiscount = appliedPromo ? 10 : 0;

    // Replace with real promo logic
    const subtotalAfterPromo = subtotal - promoDiscount;
    const shipping = subtotalAfterPromo >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotalAfterPromo + shipping;

    // Placeholder function for applying promo code
    const handleApplyPromo = () => {
        setAppliedPromo({ code: promoCode });
    };

    console.log(cart);
    console.log(products);

    const fetchProduct = () => {
        // fetch products in wishlist
        axios.get('http://localhost:3000/api/products')
            .then(response => {
                const allProducts = response.data;
                // filter products that are in the wishlist
                const cartProducts = allProducts.filter(product => cart.some(item => item.slug === product.slug));
                setProducts(cartProducts)
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    };

    useEffect(() => {
        fetchProduct();
    }, [cart]);

    useEffect(() => {
        setSubtotal(calculateSubtotal());
    }, [cart, products]);

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Shopping Cart</h2>
            <div className="row">
                <div className="col-md-8">
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div className='px-3'>
                            {products.map(item => (
                                <div key={item.slug}>
                                    {/* Cart item  */}
                                    <ProductRow state={productRowsState} product={item} />
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