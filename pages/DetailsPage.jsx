import { useParams } from 'react-router-dom';
// import products from '../data/products';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';

const DetailsPage = () => {
    const { id } = useParams();

    const [product, setProduct] = useState([]);
    const endpoint = `http://localhost:3000/api/products/${id}`;

    // function to fetch product
    const fetchProduct = () => {
        axios.get(endpoint)
            .then(response => {
                setProduct(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the product!", error);
            });
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="container mt-5">
            <h2>{product.product_name}</h2>
            <img src={product.image} alt={product.product_name} />
            <p >{product.description}</p>
            <h3>Price: €{product.price}</h3>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Brand:</strong> {product.brand_id}</p>
            <Link to="/">
                <button className="btn btn-primary">Return to home</button>
            </Link>
        </div>
    );
};

export default DetailsPage;