import React, { useEffect } from 'react'
import Cards from '../components/Cards'
import { Link, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const SearchPage = () => {

    // usestate for heart wishlist
    const [wishlist, setWishlist] = useState([])
    const [products, setProducts] = useState([]);
    const endpoint = 'http://localhost:3000/api/products/'
    const [filteredProducts, setFilteredProducts] = useState([]);

    // get params for query string
    const [searchParams, setSearchParams] = useSearchParams();
    // get all query params
    // read query string
    // possible query key: name, cat, brand, minPrice, maxPrice, promo
    const name = searchParams.get('name') || '';
    const cat = searchParams.get('cat') || '';
    const brand = searchParams.get('brand') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const promo = searchParams.get('promo') || '';

    // function for products with axios
    const fetchProducts = () => {
        axios.get(endpoint)
            .then(response => {
                setProducts(response.data)
                setFilteredProducts(response.data); // initialize filtered products with all products
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error)
            });
    }

    useEffect(() => {
        if (name) {
            // If searching by name, use the search endpoint
            axios.get(`http://localhost:3000/api/products/search?name=${encodeURIComponent(name)}`)
                .then(response => {
                    setProducts(response.data);
                    setFilteredProducts(response.data); // You can still apply other filters client-side
                })
                .catch(error => {
                    console.error("There was an error searching products!", error);
                });
        } else {
            // If not searching by name, fetch all products
            fetchProducts();
        }
    }, [name])

    // fetch categories and brands from products
    const categories = Array.from(new Set(products.map(p => p.category_name))).filter(Boolean);
    const brands = Array.from(new Set(products.map(p => p.brand_name))).filter(Boolean);

    // filters
    useEffect(() => {
        let filtered = products;

        if (cat) {
            filtered = filtered.filter(product =>
                product.category_name && product.category_name.toLowerCase() === cat.toLowerCase()
            );
        }
        if (brand) {
            filtered = filtered.filter(product =>
                product.brand_name && product.brand_name.toLowerCase() === brand.toLowerCase()
            );
        }
        if (minPrice || maxPrice) {
            filtered = filtered.filter(product => {
                const discount = product.discount || 0;
                const price = parseFloat(product.price - (product.price * discount) / 100);
                const min = parseFloat(minPrice) || 0;
                const max = parseFloat(maxPrice) || Infinity;
                return price >= min && price <= max;
            });
        }
        setFilteredProducts(filtered);
    }, [products, name, cat, brand, minPrice, maxPrice, promo]);

    // Funzione per il toggle del cuore wishlist
    const toggleWishlist = (productId) => {
        setWishlist(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <p className="my-5 text-uppercase">

                            {/* uppercase all */}
                            {filteredProducts.length} results for <b>"{name}"</b>
                            {cat && `in category "${cat}"`}
                            {brand && `by brand "${brand}"`}
                            {minPrice && `with min price €${minPrice}`}
                            {maxPrice && `and max price €${maxPrice}`}
                            {promo && 'on promo'}

                        </p>
                    </div>
                </div>

                {/* SIDEBAR */}
                <div className="row">
                    <aside className='background-accent1-subtle col-md-3 py-5'>

                        {/* CATEGORY */}
                        <div className="mb-4">
                            <h6 className='p-1'>CATEGORY</h6>
                            <ul>
                                {categories.map((category) => (
                                    <li key={`cat-${category}`}>
                                        <input type="checkbox"
                                            onChange={() => {
                                                // update query params
                                                setSearchParams({
                                                    ...Object.fromEntries(searchParams.entries()),
                                                    cat: category
                                                });
                                            }}
                                            checked={cat === category} />
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* BRAND */}
                        <div className="mb-4">
                            <h6 className='p-1'>BRAND</h6>
                            <ul>
                                {brands.map((brandName) => (
                                    <li key={`brand-${brandName}`}>
                                        <input type="checkbox"
                                            onChange={() => {
                                                // update query params
                                                setSearchParams({
                                                    ...Object.fromEntries(searchParams.entries()),
                                                    brand: brandName
                                                });
                                            }}
                                            checked={brand === brandName} />
                                        {brandName}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* PRICE */}
                        <div className="mb-4">
                            <h6 className='p-1'>PRICE</h6>
                            <div className="d-flex align-items-center gap-2">
                                <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    placeholder="€ 0"
                                    value={minPrice}
                                    onChange={e => setSearchParams({
                                        ...Object.fromEntries(searchParams.entries()),
                                        minPrice: e.target.value
                                    })}
                                />
                                <span>–</span>
                                <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    placeholder="€ 500"
                                    value={maxPrice}
                                    onChange={e => setSearchParams({
                                        ...Object.fromEntries(searchParams.entries()),
                                        maxPrice: e.target.value
                                    })}
                                />
                            </div>
                            {/* <button className="btn btn-outline-success btn-sm mt-2">APPLY</button> */}
                        </div>
                    </aside>



                    {/* RISULTATI */}
                    <section className='col-md-9 gx-5'>
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex justify-content-around flex-wrap">
                                    {/* cards */}
                                    {filteredProducts.map((product) => (
                                        <div className="card-content mb-3" key={product.id}>
                                            <i
                                                className={`wishlist-heart fa-heart position-absolute top-0 end-0 m-2 ${wishlist.includes(product.id) ? 'fas' : 'far'}`}
                                                onClick={() => toggleWishlist(product.id)}
                                            ></i>
                                            <Link className='card-link'
                                                to={`/product/${product.slug}`}>
                                                <Cards product={product} />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div >
            </div >
        </>
    )
}

export default SearchPage