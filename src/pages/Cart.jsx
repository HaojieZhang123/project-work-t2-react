import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductRow from '../components/ProductRow';

// context
import { useCart } from '../context/CartContext'

const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5;

const Cart = () => {
    const [productRowsState] = useState(2) // 1 for wishlist, 2 for cart    
    const [products, setProducts] = useState([])
    const [subtotal, setSubtotal] = useState(0);
    const [fullSubtotal, setFullSubtotal] = useState(0);
    const [productDiscountTotal, setProductDiscountTotal] = useState(0);

    // context
    const {
        cart,
        appliedPromo,
        setAppliedPromo
    } = useCart();

    const calculateSubtotal = () => {
        let full = 0;
        let discountTotal = 0;

        cart.forEach(cartItem => {
            const product = products.find(p => p.slug === cartItem.slug);
            if (!product) return;
            const price = parseFloat(product.price) || 0;
            const discount = parseFloat(product.discount) || 0;
            const quantity = cartItem.quantity;

            full += price * quantity;
            discountTotal += (price * discount / 100) * quantity;
        });

        const subtotalAfterDiscount = full - discountTotal;

        setFullSubtotal(full);
        setProductDiscountTotal(discountTotal);
        setSubtotal(subtotalAfterDiscount);
    };

    const [promoCode, setPromoCode] = useState('');
    const [promoError, setPromoError] = useState('');
    const navigate = useNavigate();

    const promoDiscount = appliedPromo ? (subtotal * (appliedPromo.discount || 0) / 100) : 0;
    const subtotalAfterPromo = subtotal - promoDiscount;
    const shipping = subtotalAfterPromo >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotalAfterPromo + shipping;

    // Placeholder function for applying promo code
    const handleApplyPromo = () => {
        axios.get(`http://localhost:3000/api/promo_codes/${promoCode}`)
            .then(response => {
                const promo = response.data;
                if (promo && promo.code === promoCode) {
                    setAppliedPromo(promo);
                    setPromoError('');
                } else {
                    setAppliedPromo(null);
                    setPromoError('Promo code is invalid or does not exist.');
                }
            })
            .catch(error => {
                console.error("There was an error applying the promo code!", error);
                setAppliedPromo(null);
                setPromoError('Promo code is invalid or does not exist.');
            });

        setPromoCode('');
    };


    // Function to check if promo is disabled
    const isPromoDisabled = () => ! !appliedPromo;

    console.log(cart);
    console.log(products);

    const fetchProduct = () => {
        // fetch products in cart
        axios.get('http://localhost:3000/api/products')
            .then(response => {
                const allProducts = response.data;
                // filter products that are in the cart
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
        calculateSubtotal();
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
                                // placeholder="Enter promo code"
                                value={promoCode}
                                onChange={e => setPromoCode(e.target.value)}
                                disabled={isPromoDisabled()}
                                placeholder={isPromoDisabled() ? "Promo code already applied" : "Enter promo code"}
                            />
                            <button
                                className="promo-btn"
                                onClick={handleApplyPromo}
                                disabled={!promoCode || isPromoDisabled()}
                            >
                                Apply
                            </button>
                        </div>
                        {appliedPromo && (
                            <div className="promo-success">
                                Promo code <b>{appliedPromo.code}</b> applied!
                            </div>
                        )}

                        {promoError && (
                            <div className="promo-error">
                                {promoError}
                            </div>
                        )}

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>€ {fullSubtotal.toFixed(2)}</span>
                        </div>

                        {productDiscountTotal > 0 && (
                            <div className="summary-row text-danger">
                                <span>Discount Products</span>
                                <span>- € {productDiscountTotal.toFixed(2)}</span>
                            </div>
                        )}

                        {promoDiscount > 0 && (
                            <div className="summary-row text-danger">
                                <span>Promo code</span>
                                <span>- € {promoDiscount.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="summary-row">
                            <span>Shipping cost</span>
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
