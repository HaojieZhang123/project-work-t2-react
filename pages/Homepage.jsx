import React from 'react'
import Cards from '../components/Cards'
import { Link } from 'react-router-dom'
// import products from '../data/products'

import { useState, useEffect } from 'react'
import axios from 'axios'

const Homepage = () => {

    const [products, setProducts] = useState([])
    const endpoint = 'http://localhost:3000/api/products/'

    // function for fetch products via axios
    const fetchProducts = () => {
        axios.get(endpoint)
            .then(response => {
                setProducts(response.data)
                console.log(products)
                console.log(response.data)
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <div className="container ">
                <div className="row">
                    {/* hero banner */}
                    <div className="col-12 hero-banner">
                        <img src="https://picsum.photos/1300/720" alt="image" />
                    </div>
                </div>
            </div>

            <div className="mt-5 pt-5 pb-5 bcolor-rose ">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className='mb-5'>FEATURED PRODUCTS</h2>
                            <div className="row d-flex justify-content-between">
                                {/* cards */}
                                {products.map((product) => (
                                    <div className="col-4 col-md-3" key={product.id}>
                                        <Link
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

            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-12">
                        <h2 className='mb-5'>LATEST PRODUCTS</h2>
                        <div className="row d-flex justify-content-between">
                            {/* cards */}
                            {products.map((product) => (
                                <div className="col-4 col-md-3" key={product.id}>
                                    <Link
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