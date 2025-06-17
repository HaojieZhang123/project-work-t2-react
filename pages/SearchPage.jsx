import React from 'react'
import Cards from '../components/Cards'
import { Link } from 'react-router-dom'



const products = [
    {
        "id": 1,
        "product_name": "Maybelline Fit Me Matte+Poreless Foundation",
        "brand_id": 1,
        "price": 12.99,
        "description": "A lightweight foundation for normal to oily skin, mattifies and refines pores.",
        "added_date": "2025-05-31T22:00:00.000Z",
        "sold": 150,
        "discount": 10,
        "image": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?fit=crop&w=400&q=80",
        "vendor_mail": "vendor1@email.com",
        "created_at": "2025-06-13T15:14:29.000Z",
        "updated_at": "2025-06-13T15:14:29.000Z"
    },
    {
        "id": 2,
        "product_name": "L Oréal Paris Voluminous Mascara",
        "brand_id": 2,
        "price": 9.99,
        "description": "Builds lashes up to 5x their natural thickness for a full, dramatic look.",
        "added_date": "2025-06-01T22:00:00.000Z",
        "sold": 200,
        "discount": 15,
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=400&q=80",
        "vendor_mail": "vendor2@email.com",
        "created_at": "2025-06-13T15:14:29.000Z",
        "updated_at": "2025-06-13T15:14:29.000Z"
    },
    {
        "id": 3,
        "product_name": "NYX Professional Makeup Soft Matte Lip Cream",
        "brand_id": 3,
        "price": 7.5,
        "description": "Delivers a burst of creamy color and sets to a stunning matte finish.",
        "added_date": "2025-06-02T22:00:00.000Z",
        "sold": 120,
        "discount": 0,
        "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=400&q=80",
        "vendor_mail": "vendor3@email.com",
        "created_at": "2025-06-13T15:14:29.000Z",
        "updated_at": "2025-06-13T15:14:29.000Z"
    },
    {
        "id": 4,
        "product_name": "The Ordinary Niacinamide 10% + Zinc 1%",
        "brand_id": 4,
        "price": 6,
        "description": "High-strength vitamin and mineral blemish formula for clearer skin.",
        "added_date": "2025-06-03T22:00:00.000Z",
        "sold": 180,
        "discount": 5,
        "image": "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=400&q=80",
        "vendor_mail": "vendor4@email.com",
        "created_at": "2025-06-13T15:14:29.000Z",
        "updated_at": "2025-06-13T15:14:29.000Z"
    },
    {
        "id": 5,
        "product_name": "Estée Lauder Double Wear Stay-in-Place Makeup",
        "brand_id": 5,
        "price": 39,
        "description": "Long-wearing, flawless liquid foundation with 24-hour staying power.",
        "added_date": "2025-06-04T22:00:00.000Z",
        "sold": 90,
        "discount": 20,
        "image": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?fit=crop&w=400&q=80",
        "vendor_mail": "vendor5@email.com",
        "created_at": "2025-06-13T15:14:29.000Z",
        "updated_at": "2025-06-13T15:14:29.000Z"
    },
    {
        "id": 6,
        "product_name": "Fenty Beauty Gloss Bomb Universal Lip Luminizer",
        "brand_id": 6,
        "price": 19,
        "description": "Explosive shine that feels as good as it looks in a universal rose nude shade.",
        "added_date": "2025-06-05T22:00:00.000Z",
        "sold": 75,
        "discount": 0,
        "image": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?fit=crop&w=400&q=80",
        "vendor_mail": "vendor6@email.com",
        "created_at": "2025-06-13T15:14:29.000Z",
        "updated_at": "2025-06-13T15:14:29.000Z"
    },
    {
        "id": 7,
        "product_name": "Urban Decay Naked Eyeshadow Palette",
        "brand_id": 7,
        "price": 54,
        "description": "12 bronze-hued neutrals in a range of textures including matte, satin, and shimmer.",
        "added_date": "2025-06-06T22:00:00.000Z",
        "sold": 60,
        "discount": 10,
        "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=400&q=80",
        "vendor_mail": "vendor7@email.com",
        "created_at": "2025-06-13T15:14:29.000Z",
        "updated_at": "2025-06-13T15:14:29.000Z"
    },
]


const SearchPage = () => {
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
                        {products.map((product) => (
                            <div className="col-4 col-md-3" key={product.id}>
                                <Link className='card-link'
                                    to={`/product/${product.id}`}>
                                    <Cards product={product} />
                                </Link>
                            </div>
                        ))}
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