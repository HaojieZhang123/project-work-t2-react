import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cards from '../components/Cards'

const WishList = () => {
    const [bestSellers, setBestSellers] = useState([])
    const [wishlist, setWishlist] = useState([])
    const endpointBestSellers = 'http://localhost:3000/api/products/special/best-sellers'

    // function to fetch product
    const fetchProduct = () => {
        // fetch best sellers
        axios.get(endpointBestSellers)
            .then(response => {
                setBestSellers(response.data)
            })
            .catch(error => {
                console.error("There was an error fetching the best sellers!", error);
            });
    };

    const toggleWishlist = (productId) => {
        setWishlist(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <>
            <div className='container py-3'>
                <h3 className='wishlist-heading'>your wishlist <b className='wishlist-counter'><i>{`(3 products)`}</i></b></h3>

                <div className="wishlist-product-list">
                    <div className="wishlist-product-card">
                        <div className="wishlist-card-image">
                            <img src="https://media.douglas.it/medias/eJGVgt015658-0-global.jpg?context=bWFzdGVyfGltYWdlc3w1NzM1MnxpbWFnZS9qcGVnfGFEQm1MMmhpWkM4Mk16VTBNRFE1TlRZeE16azRNaTlsU2tkV1ozUXdNVFUyTlRoZk1GOW5iRzlpWVd3dWFuQm58ZTViYzg3MDMwZjdiNmI2MGZiMzdhNGEyYWY1ZWY0ZDJjODA5ODE1NzRiM2FmN2FmNWU1Nzg4YWI1OTgwNGUyYw&grid=true&imPolicy=grayScaled&imdensity=1&imwidth=775" alt="" />
                        </div>

                        <div className="wishlist-card-details color-main">
                            <div className="card-brand color-main-subtle">the ordinary</div>
                            <div className="card-product-name">peptidi niacinamide 10% zinco 1%</div>
                            <div className="card-category color-main-subtle">serum</div>
                            <div className="card-tag">promo</div>
                        </div>

                        <div className="wishlist-card-price-section">
                            <div className="card-price">€23,00</div>
                            <div className="wishlist-card-cta">
                                <div className="card-delete">
                                    <i className="fa-solid fa-trash"></i>
                                </div>
                                <div className="card-add-to-cart color-main">
                                    <span>Add to cart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wishlist-separator"></div>
                </div>

            </div>
            <div className="background-rose pb-5">
                <div className="container">
                    {/* card suggeriti per te */}
                    <div className="col-12 my-5 pt-5">
                        <h2 className='mb-2'>SUGGERITI PER TE</h2>
                        <div className="d-flex justify-content-between overflow-auto align-items-stretch">
                            {/* cards */}
                            {bestSellers.map((product) => (
                                <div className="card-content" key={product.id}>
                                    <i
                                        className={`wishlist-heart fa-heart position-absolute top-0 end-0 m-2 ${wishlist.includes(product.id) ? 'fas' : 'far'}`}
                                        onClick={() => toggleWishlist(product.id)}
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

export default WishList