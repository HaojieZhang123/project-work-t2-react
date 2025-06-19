import { useParams } from 'react-router-dom';
// import products from '../data/products';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';

const DetailsPage = () => {
    const { slug } = useParams();

    const [product, setProduct] = useState([]);
    const [open, setOpen] = useState(false); // stato accordion
    const endpoint = `http://localhost:3000/api/products/${slug}`;
    const [brandName, setBrandName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    // function to fetch product
    const fetchProduct = () => {
        axios.get(endpoint)
            .then(response => {
                setProduct(response.data);
                // console.log(response.data);
                setBrandName(response.data.brand_name);
                setCategoryName(response.data.category_name);
                setPrice(Number(response.data.price));
                setDiscount(response.data.discount || 0); // default to 0 if no discount
            })
            .catch(error => {
                console.error("There was an error fetching the product!", error);
            });
    };

    // function to calculate discounted price
    const getDiscountedPrice = () => {
        return (price * (1 - discount / 100)).toFixed(2);
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
                            className="w-100 h-100 object-fit-cover"
                        />
                    </div>
                </div>

                {/* Colonna dettagli */}
                <div className="col-md-6 d-flex flex-column justify-content-between pt-4 px-4">
                    <div className='margin-b-details-page'>
                        {/* nome brand al momento vuoto */}
                        <h6 className='text-gray-details-page'>{brandName.charAt(0).toUpperCase() + brandName.slice(1)}</h6>
                        <h2>{product.product_name}</h2>
                        {/* categorie al momento vuoto */}
                        <p className='text-gray-details-page'>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</p>
                        <hr className='hr-details-page my-5' />
                        <h4 className='text-end'>
                            {discount > 0 ? (
                                <>
                                    <span className='barred-price'>
                                        €{!isNaN(price) ? Number(price).toFixed(2) : '0.00'}
                                    </span>
                                    <span className='discount-price'>
                                        €{getDiscountedPrice()}
                                    </span>
                                </>
                            ) : (
                                <span className='normal-price'>€{!isNaN(price) ? Number(price).toFixed(2) : '0.00'}</span>
                            )}
                        </h4>
                        <div className="d-flex flex-column align-items-start my-4">
                            <span className="green-bc-icon">LIMITED</span>
                            <span className="d-flex align-items-center text-gray-details-page mt-4">
                                <span className="green-dot"></span>
                                Disponibile
                            </span>
                        </div>

                        {/* Accordion Dettagli prodotto */}
                        <div className="accordion">
                            <div
                                className="header"
                                role="button"
                                tabIndex={0}
                                onClick={() => setOpen(!open)}
                                onKeyDown={e => {
                                    if (e.key === "Enter" || e.key === " ") setOpen(!open);
                                }}
                                aria-expanded={open}
                                aria-controls="product-details-content"
                            >
                                <span>DETTAGLI DEL PRODOTTO</span>
                                <i className={`fa-solid fa-chevron-down text-gray-details-page transition-icon ${open ? 'rotate' : ''}`}></i>
                            </div>
                            <div
                                className={`content ${!open ? 'closed' : ''}`}>
                                <p>{product.description || "Nessun dettaglio aggiuntivo disponibile."}</p>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <p className='text-gray-details-page'>
                                <i className="fa-solid fa-truck green-details-page me-2"></i>
                                Spedizione entro 3-6 giorni lavorativi
                            </p>
                            <p className='text-gray-details-page'>
                                <i className="fa-solid fa-box-open green-details-page me-2"></i>
                                Spedizione gratuita da € 35,00
                            </p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                        <button className="btn-add-to-cart">AGGIUNGI AL CARRELLO <i className="fa-solid fa-cart-shopping"></i></button>
                        <button className="btn-add-to-wishlist">AGGIUNGI ALLA WISHLIST <i className="fa-solid fa-heart"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;