import React, { useEffect } from 'react'
import Cards from '../components/Cards'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'






const SearchPage = () => {

    const [products, setProducts] = useState([]);
    const endpoint = 'http://localhost:3000/api/products/'

    // function for products with axios
    const fetchProducts = () => {
        axios.get(endpoint)
            .then(response => {
                setProducts(response.data)
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error)
            });
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <p className="my-5">642 RESULTS FOR <strong>"SKIN CARE"</strong></p>
                    </div>
                </div>

                {/* SIDEBAR */}
                <div className="row">
                    <aside className='background-accent1-subtle col-md-3 py-5'>

                        {/* CATEGORIE */}
                        <div className="mb-4">
                            <h6 className='p-1'>CATEGORY</h6>
                            <ul>
                                <li><input type="checkbox" />Face Treatments</li>
                                <li><input type="checkbox" />Face Treatments</li>
                                <li><input type="checkbox" />Face Treatments</li>
                                <li><input type="checkbox" />Face Treatments</li>
                                <li><input type="checkbox" />Face Treatments</li>
                                <li><input type="checkbox" />Face Treatments</li>
                                <li><input type="checkbox" />Face Treatments</li>
                            </ul>
                        </div>

                        {/* BRAND */}
                        <div className="mb-4">
                            <h6 className='p-1'>BRAND</h6>
                            <ul>
                                <li><input type="checkbox" />Face Treatments</li>
                                <li><input type="checkbox" />Face Treatments</li>
                                <li><input type="checkbox" />Face Treatments</li>
                                <li><input type="checkbox" />Face Treatments</li>
                                <li><input type="checkbox" />Face Treatments</li>
                                <li><input type="checkbox" />Face Treatments</li>
                                <li><input type="checkbox" />Face Treatments</li>
                            </ul>
                        </div>

                        {/* PRICE */}
                        <div className="mb-4">
                            <h6 className='p-1'>PRICE</h6>
                            <div className="d-flex align-items-center gap-2">
                                <input type="number" className="form-control form-control-sm" placeholder="€ 0" />
                                <span>–</span>
                                <input type="number" className="form-control form-control-sm" placeholder="€ 500" />
                            </div>
                            <button className="btn btn-outline-success btn-sm mt-2">APPLY</button>
                        </div>
                    </aside>



                    {/* RISULTATI */}
                    <section className='col-md-9 gx-5'>
                        <div className="row">
                            {products.map((product) => (
                                <div className="col-4 col-md-3" key={product.id}>
                                    <Link className='card-link'
                                        to={`/product/${product.id}`}>
                                        <Cards product={product} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                </div >
            </div >
        </>
    )
}

export default SearchPage


{/* <div className="product-card">
                            <div className="product-image">
                                <img src="https://picsum.photos/200/300" alt="" />
                            </div>
                            <div className="product-info">
                                <p className='brand'>BRAND</p>
                                <h6 className='title'>NOME PRODOTTO</h6>
                                <p className='description'>DESCRIPTION</p>
                                <p><strong>20,00 &euro;</strong></p>
                            </div>
                        </div> */}