import React from 'react'
import Cards from '../components/Cards'
import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'
import axios from 'axios'

// context
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'


const Homepage = () => {

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

    const endpoint = 'http://localhost:3001/api/products/'

    const [bestSellers, setBestSellers] = useState([])
    const [latestProducts, setLatestProducts] = useState([])

    const endpointBestSellers = 'http://localhost:3001/api/products/special/best-sellers'
    const endpointLatestProducts = 'http://localhost:3001/api/products/special/latest-products'

    // function for fetch products via axios
    const fetchProducts = () => {

        // fetch best sellers
        axios.get(endpointBestSellers)
            .then(response => {
                setBestSellers(response.data)
            })
            .catch(error => {
                console.error("There was an error fetching the best sellers!", error);
            });

        // fetch latest products
        axios.get(endpointLatestProducts)
            .then(response => {
                setLatestProducts(response.data)
            })
            .catch(error => {
                console.error("There was an error fetching the latest products!", error);
            });
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const toggleWishlistIcon = (slug) => {
        if (isInWishlist(slug)) {
            removeFromWishlist(slug);
        } else {
            addToWishlist(slug);
        }
    };

    return (
        <>
            <div className="container pt-3 pb-3">
                <div className="row">
                    {/* hero banner */}
                    <div className="col-12">
                        <img src="./hero_banner_finale.PNG" alt="image" className="hero-banner" />
                    </div>
                </div>
            </div>

            <div className="mt-5 pt-5 pb-5 background-rose ">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className='mb-5'>BEST SELLERS</h2>
                            <div className="d-flex justify-content-between overflow-auto align-items-stretch">
                                {/* cards */}
                                {bestSellers.map((product) => (
                                    <div className="card-content" key={product.id}>
                                        <i
                                            className={`wishlist-heart fa-heart position-absolute top-0 end-0 m-2 ${isInWishlist(product.slug) ? 'fas' : 'far'}`}
                                            onClick={() => toggleWishlistIcon(product.slug)}
                                            style={{ cursor: 'pointer' }}
                                        ></i>
                                        <Link className='card-link'
                                            to={`/product/${product.slug}`}>
                                            <Cards product={product} />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5 pt-3 pb-5">
                <div className="row">
                    <div className="col-12">
                        <h2 className='mb-5'>LATEST PRODUCTS</h2>
                        <div className="d-flex justify-content-between overflow-auto align-items-stretch">
                            {/* cards */}
                            {latestProducts.map((product) => (
                                <div className="card-content" key={product.id}>
                                    <i
                                        className={`wishlist-heart fa-heart position-absolute top-0 end-0 m-2 ${isInWishlist(product.slug) ? 'fas' : 'far'}`}
                                        onClick={() => toggleWishlistIcon(product.slug)}
                                        style={{ cursor: 'pointer' }}
                                    ></i>
                                    <Link className='card-link'
                                        to={`/product/${product.slug}`}>
                                        <Cards product={product} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Homepage