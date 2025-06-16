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
            <div className="row">
                {/* Colonna immagine */}
                <div className="col-md-6 d-flex justify-content-center align-items-start">
                    <img src={product.image} alt={product.product_name} />
                </div>

                {/* Colonna dettagli */}
                <div className="col-md-6">
                    <h6>{product.brand_id}</h6>
                    <h2>{product.product_name}</h2>
                    <p>{product.description}</p>
                    <h4>€{product.price}</h4>
                    <p>{product.category}</p>

                    <div className="d-flex my-4">
                        <span>Disponibile</span>
                        <span>Limited</span>
                    </div>

                    <p> Spedizione entro 3-6 giorni lavorativi</p>
                    <p> Spedizione gratuita da € 35,00</p>

                    {/* Bottone per aggiungi al carrello */}
                    <button className="mt-3">Aggiungi al carrello</button>

                </div>
            </div>
        </div>
    );
};

export default DetailsPage;
