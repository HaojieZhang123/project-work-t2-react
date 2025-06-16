import React from 'react'
import Cards from '../components/Cards'
import { Link } from 'react-router-dom'
import products from '../data/products'


const Homepage = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    {/* hero banner */}
                    <div className="col-12">
                        <img src="https://picsum.photos/1300/720" alt="image" />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>BEST SELLERS</h2>
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

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>LATEST PRODUCTS</h2>
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