import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// context
import { useCart } from '../context/CartContext'
// import { useWishlist } from '../context/WishlistContext'



const SidebarCart = () => {
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
    const getDiscountedPrice = (price, discount) => {
        return (price * (1 - discount / 100)).toFixed(2);
    };


    useEffect(() => {
        fetchProduct();
    }, [cart]);

    useEffect(() => {
        setSubtotal(calculateSubtotal());
    }, [cart, products]);

    return (
        <>
            {/* if cart is empty, display none */}
            <div className={`sidebar-cart ${cart.length === 0 ? 'd-none' : ''}`}>
                <div className='sidebar-title'>Cart</div>
                <div className="subtotal">
                    <div className='text-center'>Subtotal:</div>
                    <div className='text-center'>&euro;{subtotal.toFixed(2)}</div>
                </div>
                <div>
                    <Link to="/cart" className="view-cart-btn">View Cart</Link>
                </div>
                <ul>
                    {products.map(product => (
                        <li key={product.slug}>
                            <div className="product-info">
                                <Link className='card-link'
                                    to={`/product/${product.slug}`}>
                                    <img src={product.image} alt={product.product_name} />
                                </Link>
                                <div>
                                    <div className="text-center">
                                        <b>&euro;{parseFloat(
                                            getDiscountedPrice(product.price, product.discount)
                                        ).toFixed(2)}</b>
                                    </div>
                                    {/* quantity with button to increase and decrease */}
                                    <div className="quantity-control">
                                        {/* decrease/delete button */}
                                        {cart.find(item => item.slug === product.slug)?.quantity === 1 ? (
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeFromCart(product.slug)}
                                                title="Remove from cart"
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    updateCartQuantity(
                                                        product.slug,
                                                        (cart.find(item => item.slug === product.slug)?.quantity || 0) - 1
                                                    )
                                                }
                                            >
                                                -
                                            </button>
                                        )}

                                        <span>{cart.find(item => item.slug === product.slug)?.quantity || 0}</span>

                                        <button onClick={() => updateCartQuantity(product.slug, (cart.find(item => item.slug === product.slug)?.quantity || 0) + 1)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default SidebarCart