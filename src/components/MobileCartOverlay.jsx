import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductRow from '../components/ProductRow';

// context
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const MobileCartOverlay = ({ onClose }) => {

    const [productRowsState, setProductRowsState] = useState(2) // 1 for wishlist, 2 for cart    
    const [products, setProducts] = useState([])
    const [subtotal, setSubtotal] = useState(0);

    const navigate = useNavigate();

    // view cart button performs 2 actions: close the overlay and navigate to the cart page
    const handleViewCart = () => {
        onClose();
        navigate('/cart');
    };

    // context
    const {
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        isInCart
    } = useCart();

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

    // get discounted price
    // const getDiscountedPrice = (price, discount) => {
    //     return (price * (1 - discount / 100)).toFixed(2);
    // };


    useEffect(() => {
        fetchProduct();
    }, [cart]);

    useEffect(() => {
        setSubtotal(calculateSubtotal());
    }, [cart, products]);


    return (
        <>
            <div className="mobile-cart-overlay">
                <div className="overlay-header">
                    <h2 className="overlay-title">Cart</h2>
                </div>
                <div className="overlay-content">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div key={index}>
                                <ProductRow state={productRowsState} product={product} />
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
                <div className="overlay-footer">
                    <div className="subtotal">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className='overlay-actions'>
                        <button className="back-btn" onClick={onClose}>Back to shopping</button>
                        <button className="view-cart-btn" onClick={handleViewCart}>View Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileCartOverlay