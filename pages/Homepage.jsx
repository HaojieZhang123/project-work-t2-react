import React from 'react'
import Cards from '../components/Cards'
import { Link } from 'react-router-dom'
// import products from '../data/products'

import { useState, useEffect } from 'react'
import axios from 'axios'

const Homepage = () => {

    // usestate for heart wishlist
    const [isWishlisted, setIsWishlisted] = useState(false)

    const [products, setProducts] = useState([])
    const endpoint = 'http://localhost:3000/api/products/'

    const [bestSellers, setBestSellers] = useState([])
    const [latestProducts, setLatestProducts] = useState([])

    // function for fetch products via axios
    const fetchProducts = () => {
        axios.get(endpoint)
            .then(response => {
                setProducts(response.data)
                // console.log(products)
                // console.log(response.data)
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }

    useEffect(() => {
        fetchProducts()
        if (products && products.length > 0) {
            setBestSellers(
                // copy product, sort by sold and take top 5
                products.slice().sort((a, b) => b.sold - a.sold).slice(0, 5)
            );
            setLatestProducts(
                // copy product, sort by added_date and take top 5
                products.slice().sort((a, b) => new Date(b.added_date) - new Date(a.added_date)).slice(0, 5)
            );
        }
    }, [products])

    // Funzione per il toggle del cuore wishlist
    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted)
    }
    return (
        <>
            <div className="container pt-3 pb-3">
                <div className="row">
                    {/* hero banner */}
                    <div className="col-12">
                        <img src="./hero_banner.PNG" alt="image" className="hero-banner" />
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
                                            className={`wishlist-heart fa-heart position-absolute top-0 end-0 m-2 ${isWishlisted ? 'fas' : 'far'}`}
                                            onClick={toggleWishlist}
                                        ></i>
                                        <Link className='card-link'
                                            to={`/product/${product.id}`}>
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
                                    <Link className='card-link'
                                        to={`/product/${product.id}`}>
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