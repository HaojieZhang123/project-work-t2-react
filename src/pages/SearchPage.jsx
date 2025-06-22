import { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import { Link, useSearchParams } from 'react-router-dom'

import axios from 'axios'
import CardsList from '../components/CardsList'

// context

import { useWishlist } from '../context/WishlistContext'

const SearchPage = () => {

    // context
    const {
        addToWishlist,
        removeFromWishlist,
        isInWishlist
    } = useWishlist();
    // state
    const [products, setProducts] = useState([]);
    const endpoint = 'http://localhost:3000/api/products/'
    const [filteredProducts, setFilteredProducts] = useState([]);

    // initial state view grid is true
    const [isGrid, setIsGrid] = useState(true);

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
        if (promo === 'true') {
            filtered = filtered.filter(p => Number(p.discount) > 0);
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
    const toggleWishlistIcon = (slug) => {
        if (isInWishlist(slug)) {
            removeFromWishlist(slug);
        } else {
            addToWishlist(slug);
        }
    };

    // Stato per l'ordinamento
    const [sortOrder, setSortOrder] = useState('name-asc'); // 'name-asc', 'price-asc', 'price-desc'

    // Effetto per ordinare i prodotti filtrati
    useEffect(() => {
        let sorted = [...filteredProducts];
        if (sortOrder === 'price-asc') {
            sorted.sort((a, b) => {
                const priceA = a.price - (a.price * (a.discount || 0) / 100);
                const priceB = b.price - (b.price * (b.discount || 0) / 100);
                return priceA - priceB;
            });
        } else if (sortOrder === 'price-desc') {
            sorted.sort((a, b) => {
                const priceA = a.price - (a.price * (a.discount || 0) / 100);
                const priceB = b.price - (b.price * (b.discount || 0) / 100);
                return priceB - priceA;
            });
        }
        // Only update if the sorted array is different to avoid infinite loop
        if (JSON.stringify(sorted) !== JSON.stringify(filteredProducts)) {
            setFilteredProducts(sorted);
        }
        // eslint-disable-next-line
    }, [sortOrder]);


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

                        {/* Toggle grid/list */}
                        <div className="d-flex justify-content-end mb-3">
                            <button
                                className={`btn btn-sm me-2 ${isGrid ? 'btn-secondary' : 'btn-outline-secondary'}`}
                                onClick={() => setIsGrid(true)}
                            >
                                <i className="fas fa-th-large me-1"></i> Grid View
                            </button>
                            <button
                                className={`btn btn-sm ${!isGrid ? 'btn-secondary' : 'btn-outline-secondary'}`}
                                onClick={() => setIsGrid(false)}
                            >
                                <i className="fas fa-list me-1"></i> List View
                            </button>
                        </div>
                    </div>
                </div>

                {/*Ordina*/}
                <div className="mb-3">
                    <label className="me-2">Sort by:</label>
                    <select
                        value={sortOrder}
                        onChange={e => setSortOrder(e.target.value)}
                        className="form-select form-select-sm d-inline-block w-auto"
                    >
                        <option value="price-asc">Price: lowest first</option>
                        <option value="price-desc">Price: highest first</option>
                    </select>
                </div>

                {/* SIDEBAR */}
                <div className="row">
                    <aside className='background-accent1-subtle col-md-3 py-3 mb-3'>

                        {/* CATEGORY */}
                        <div className="mb-4">
                            <h6 className='p-1'>CATEGORY</h6>
                            <div className="category-group">
                                <select
                                    className='width-100'
                                    onChange={(e) => {
                                        const selectedCategory = e.target.value;
                                        setSearchParams({
                                            ...Object.fromEntries(searchParams.entries()),
                                            cat: selectedCategory,
                                        });
                                    }}
                                    value={cat || ""}
                                >
                                    <option value="">--</option>
                                    {categories.map((category) => (
                                        <option key={`cat-${category}`} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* BRAND */}
                        <div className="mb-4">
                            <h6 className="p-1">BRAND</h6>
                            <div className="category-group with-100">
                                <select
                                    className='width-100'
                                    onChange={(e) => {
                                        const selectedBrand = e.target.value;
                                        setSearchParams({
                                            ...Object.fromEntries(searchParams.entries()),
                                            brand: selectedBrand,
                                        });
                                    }}
                                    value={brand || ""}
                                >
                                    <option value="">--</option>
                                    {brands.map((brandName) => (
                                        <option key={`brand-${brandName}`} value={brandName}>
                                            {brandName}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
                        {/* PROMO */}
                        <div className="mb-4">
                            <h6 className='p-1'>DISCOUNT</h6>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="discountCheck"
                                    checked={promo === 'true'}
                                    onChange={e => setSearchParams({
                                        ...Object.fromEntries(searchParams.entries()),
                                        promo: e.target.checked ? 'true' : ''
                                    })}
                                />
                                <label className="form-check-label" htmlFor="discountCheck">
                                    Only discounted products
                                </label>
                            </div>
                        </div>
                    </aside>

                    {/* RISULTATI */}
                    <section className='col-md-9 gx-5'>
                        <div className="row">
                            <div className="col-12">
                                <div className={`d-flex ${isGrid ? 'flex-wrap' : 'flex-column'}`}>
                                    {/* cards */}
                                    {filteredProducts.map((product) => (
                                        <div className={`card-content mb-3 position-relative`} key={product.id}>
                                            {isGrid
                                                ? <div className="cards-grid">
                                                    {filteredProducts.map(product => (
                                                        <div className="card-content" key={product.id}>
                                                            <Cards product={product} />
                                                        </div>
                                                    ))}
                                                </div>
                                                : <CardsList product={product} />
                                            }
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