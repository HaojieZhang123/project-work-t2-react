import { useParams } from 'react-router-dom';
// import products from '../data/products';
import { Link } from 'react-router-dom';
import Cards from '../components/Cards';
import { useState, useEffect } from 'react';
import axios from 'axios';

// context
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const DetailsPage = () => {

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

    const { slug } = useParams();
    const [product, setProduct] = useState([]);
    const [open, setOpen] = useState(false); // stato accordion
    const endpoint = `http://localhost:3000/api/products/${slug}`;
    const [brandName, setBrandName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const endpointRelatedProducts = 'http://localhost:3000/api/products/:slug/related'
    const [relatedProducts, setRelatedProducts] = useState([])

    // Calcolo se il prodotto è "new"
    const today = new Date()
    const addedDate = new Date(product.added_date)
    const diffTime = today - addedDate
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    const isNew = diffDays <= 28 && diffDays >= 0

    // Calcolo se il prodotto è "promo"
    const isPromo = product.discount > 0

    // function to fetch product
    const fetchProduct = () => {
        axios.get(endpoint)
            .then(response => {
                setProduct(response.data);
                // console.log(response.data);
                setBrandName(response.data.brand_name);
                setCategoryName(response.data.category_name);
                setPrice(Number(response.data.price));
                setDiscount(response.data.discount || 0); // default to 0 if no discount
            })
            .catch(error => {
                console.error("There was an error fetching the product!", error);
            });

        // fetch best sellers
        axios.get(`http://localhost:3000/api/products/${slug}/related`)
            .then(response => {
                setRelatedProducts(response.data)
            })
            .catch(error => {
                console.error("There was an error fetching the best sellers!", error);
            });
    };

    // function to calculate discounted price
    const getDiscountedPrice = () => {
        return (price * (1 - discount / 100)).toFixed(2);
    };

    useEffect(() => {
        fetchProduct();
    }, [slug]);

    // function to toggle wishlist icon
    const toggleWishlistIcon = (slug) => {
        if (isInWishlist(slug)) {
            removeFromWishlist(slug);
        } else {
            addToWishlist(slug);
        }
    };

    // add product to cart. if already in cart, increase quantity by 1
    const addCartButtonHandler = (slug) => {
        if (isInCart(slug)) {
            // get the current quantity and increase it by 1
            const currentQuantity = cart.find(item => item.slug === slug)?.quantity || 0;
            // update the cart quantity
            updateCartQuantity(slug, currentQuantity + 1);
        } else {
            addToCart(slug, 1);
        }
    };

    const removeCartButtonHandler = (slug) => {
        if (isInCart(slug)) {
            // get the current quantity and increase it by 1
            const currentQuantity = cart.find(item => item.slug === slug)?.quantity || 0;
            // update the cart quantity
            if (currentQuantity > 0) {
                updateCartQuantity(slug, currentQuantity - 1);
            }
        } else {
            removeFromCart(slug, 1);
        }
    };

    // Check if the cart is empty for the current product
    const isCartEmpty = (cart.find(item => item.slug === slug)?.quantity || 0) === 0;
    const hideIfCartEmpty = (element) => {
        return isCartEmpty ? null : element;
    };

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="container margin-y-details-page">
            <div className="row align-items-stretch">

                {/* Colonna immagine */}
                <div className="col-md-6 d-flex justify-content-center align-items-start p-0">
                    <div className="w-100 h-100 img-zoom-container">
                        <img
                            src={product.image}
                            alt={product.product_name}
                            className="w-100 h-100 object-fit-cover img-zoom"
                        />
                    </div>
                </div>

                {/* Colonna dettagli */}
                <div className="col-md-6 d-flex flex-column justify-content-between pt-4 px-4">
                    <div className='margin-b-details-page'>
                        <h6 className='text-gray-details-page'>{brandName.charAt(0).toUpperCase() + brandName.slice(1)}</h6>
                        <h2>{product.product_name}</h2>
                        <p className='text-gray-details-page'>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</p>
                        <hr className='hr-details-page my-5' />
                        <h4 className='text-end'>
                            {discount > 0 ? (
                                <>
                                    <span className='barred-price'>
                                        €{!isNaN(price) ? Number(price).toFixed(2) : '0.00'}
                                    </span>
                                    <span className='discount-price'>
                                        €{getDiscountedPrice()}
                                    </span>
                                </>
                            ) : (
                                <span className='normal-price'>€{!isNaN(price) ? Number(price).toFixed(2) : '0.00'}</span>
                            )}
                        </h4>
                        <div className="d-flex flex-column align-items-start my-4">
                            <div className='d-flex justify-content-start align-items-center gap-2'>
                                {isPromo && <div className="green-bc-icon">PROMO</div>}
                                {isNew && <div className="green-bc-icon">NEW</div>}
                            </div>
                            <span className="d-flex align-items-center text-gray-details-page mt-4">
                                <span className="green-dot"></span>
                                In Stock
                            </span>
                        </div>

                        {/* Accordion Dettagli prodotto */}
                        <div className="accordion">
                            <div
                                className="header"
                                role="button"
                                tabIndex={0}
                                onClick={() => setOpen(!open)}
                                onKeyDown={e => {
                                    setOpen(!open);
                                }}
                                aria-expanded={open}
                                aria-controls="product-details-content"
                            >
                                <span>PRODUCT DETAILS</span>
                                <i className={`fa-solid fa-chevron-down text-gray-details-page transition-icon ${open ? 'rotate' : ''}`}></i>
                            </div>
                            <div
                                className={`content ${!open ? 'closed' : ''}`}>
                                <p>{product.description || "Nessun dettaglio aggiuntivo disponibile."}</p>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <p className='text-gray-details-page'>
                                <i className="fa-solid fa-truck green-details-page me-2"></i>
                                Fast Shipping in 3/6 working days
                            </p>
                            <p className='text-gray-details-page'>
                                <i className="fa-solid fa-box-open green-details-page me-2"></i>
                                Free shipping on orders over €50
                            </p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-1 ">
                        {hideIfCartEmpty(
                            <button className="btn-remove-to-cart " onClick={() => removeCartButtonHandler(product.slug)}>
                                <i className="fa-solid fa-cart-arrow-down "></i>
                            </button>
                        )}
                        <button className="btn-add-to-cart" onClick={() => addCartButtonHandler(product.slug)}>
                            ADD TO CART {isInCart(product.slug) ? `(${cart.find(item => item.slug === product.slug)?.quantity}) ` : ' '}
                            <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                        <button className="btn-add-to-wishlist" onClick={() => toggleWishlistIcon(product.slug)}>
                            {isInWishlist(product.slug) ? 'REMOVE FROM WISHLIST ' : 'ADD TO WISHLIST '}
                            <i className="fa-solid fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
            {/* card suggeriti per te */}
            <div className="col-12 mt-5 pt-5">
                <h2 className='mb-2'>TAKE A LOOK AT</h2>
                <div className="d-flex justify-content-between overflow-auto align-items-stretch">
                    {/* cards */}
                    {relatedProducts.map((product) => (
                        <div className="card-content" key={product.id}>
                            <i
                                className={`wishlist-heart fa-heart position-absolute top-0 end-0 m-2 ${isInWishlist(product.slug) ? 'fas' : 'far'}`}
                                onClick={() => toggleWishlistIcon(product.slug)}
                                style={{ cursor: 'pointer' }}
                            ></i>
                            <Cards product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;