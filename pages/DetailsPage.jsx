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
        <div className="container margin-y-details-page">
            <div className="row align-items-stretch">

                {/* Colonna immagine */}
                <div className="col-md-6 d-flex justify-content-center align-items-start p-0">
                    <div className="w-100 h-100">
                        <img
                            src={product.image}
                            alt={product.product_name}
                            className="img-fluid w-100 h-100 object-fit-cover"
                        />
                    </div>
                </div>

                {/* Colonna dettagli */}
                <div className="col-md-6 d-flex flex-column justify-content-between pt-4 px-4">
                    <div>
                        <h6 className='text-gray-details-page'>{product.brand_id}</h6>
                        <h2>{product.product_name}</h2>
                        <p className='text-gray-details-page'>{product.description}</p>
                        <hr className='hr-details-page my-5' />
                        <h4>&#8364;{product.price}</h4>
                        <p>{product.category}</p>
                        <div className="d-flex my-4">
                            <span>Disponibile</span>
                            <span className="ms-3">Limited</span>
                        </div>
                        <p> <i class="fa-solid fa-truck"></i>Spedizione entro 3-6 giorni lavorativi</p>
                        <p> <i class="fa-solid fa-box-open"></i>Spedizione gratuita da € 35,00</p>
                    </div>
                    <button className="">Aggiungi al carrello</button>
                </div>
            </div>
        </div>
    );

};

export default DetailsPage;
