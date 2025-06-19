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

    // Calculate the quantity of aproduct in the cart
    const findQuantity = (slug) => {
        const item = cart.find(item => item.slug === slug);
        return item ? item.quantity : 1; // Default to 1 if not in cart
    }

    // Find the total price of a product by its quantity
    const findPrice = (slug) => {
        const quantity = findQuantity(slug);
        const product = products.find(item => item.slug === slug);
        // Calculate the actual price after discount
        const discountValue = (product.price * product.discount) / 100
        const actualPrice = (product.price - discountValue).toFixed(2)

        return product ? actualPrice * quantity : 0;
    }

    // Calculate the subtotal of the cart
    const findSubtotal = (cart) => {
        return cart.reduce((total, item) => {
            const itemPrice = findPrice(item.slug);
            return total + itemPrice;
        }, 0);
    }


    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const navigate = useNavigate();

    // Placeholder values
    const subtotal = findSubtotal(cart); // Replace with real subtotal calculation
    const promoDiscount = appliedPromo ? 10 : 0; // Replace with real promo logic
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
    }, [cart])

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