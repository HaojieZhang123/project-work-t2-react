import React from 'react'
import Cards from '../components/Cards'
import { Link } from 'react-router-dom'

const products = [
    {
        id: "1",
        product_name: "Product 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        brand_id: "Brand A",
        category: "Category X",
        description: "This is a great product.",
        sold: 50,
        discount: 10,
        vendor_mail: "ddsdd"
    },
    {   
        id: "2",
        product_name: "Product 2",
        price: 150,
        image: "https://picsum.photos/200/300?2",
        brand_id: "Brand B",
        category: "Category Y",
        description: "This is another great product."
    }
];

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
                        <div className="row">
                            {/* cards */}
                            {products.map((product) => (
                                <Link 
                                    key={product.id} 
                                    to={`/product/${product.id}`}>
                                    <Cards product={product} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>LATEST PRODUCTS</h2>
                        <div className="row">
                            {/* cards */}
                            {products.map((product) => (
                                <Link 
                                    key={product.id} 
                                    to={`/product/${product.id}`}>
                                    <Cards product={product} />
                                </Link>
                            ))}                      
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Homepage