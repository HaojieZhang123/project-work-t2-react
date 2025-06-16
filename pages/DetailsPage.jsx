import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DetailsPage = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [open, setOpen] = useState(false); // stato accordion

    const endpoint = `http://localhost:3000/api/products/${id}`;

    // funzione per fetch prodotto
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
    }, [id]);

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
                    <div className='margin-b-details-page'>
                        <h6 className='text-gray-details-page'>{product.brand_id}</h6>
                        <h2>{product.product_name}</h2>
                        <p className='text-gray-details-page'>{product.category}</p>
                        <hr className='hr-details-page my-5' />
                        <h4 className='text-end'>&#8364;{product.price}</h4>
                        <p>{product.category}</p>
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
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>
                            {open && (
                                <div id="product-details-content" className="content">
                                    <p>{product.description || "Nessun dettaglio aggiuntivo disponibile."}</p>
                                </div>
                            )}
                        </div>
                        <div>
                            <p> <i className="fa-solid fa-truck green-details-page me-2"></i>Spedizione entro 3-6 giorni lavorativi</p>
                            <p> <i className="fa-solid fa-box-open green-details-page me-2"></i>Spedizione gratuita da € 35,00</p>
                        </div>
                    </div>
                    <button className="mt-5">Aggiungi al carrello</button>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;