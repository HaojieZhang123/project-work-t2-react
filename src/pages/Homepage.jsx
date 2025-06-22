import Slider from '../components/Slider'

import { useState, useEffect } from 'react'
import axios from 'axios'


const Homepage = () => {

    const [bestSellers, setBestSellers] = useState([])
    const [latestProducts, setLatestProducts] = useState([])

    const endpointBestSellers = 'http://localhost:3000/api/products/special/best-sellers'
    const endpointLatestProducts = 'http://localhost:3000/api/products/special/latest-products'

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
                            <Slider products={bestSellers} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5 pt-3 pb-5">
                <div className="row">
                    <div className="col-12">
                        <h2 className='mb-5'>LATEST PRODUCTS</h2>

                        <Slider products={latestProducts} />

                    </div>
                </div>
            </div>

        </>
    )
}

export default Homepage