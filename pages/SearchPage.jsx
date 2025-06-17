import React, { useEffect } from 'react'
import Cards from '../components/Cards'
import { Link, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const SearchPage = () => {

    const [products, setProducts] = useState([]);
    const endpoint = 'http://localhost:3000/api/products/'
    const [filteredProducts, setFilteredProducts] = useState([]);
    const endpointCategories = 'http://localhost:3000/api/categories/'
    const endpointProductCategory = 'http://localhost:3000/api/product_category/'
    const endpointBrands = 'http://localhost:3000/api/brands/'

    const [categories, setCategories] = useState([]);
    const [productCategories, setProductCategories] = useState([]);

    const [brands, setBrands] = useState([]);


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
        fetchProducts()

        axios.get(endpointCategories)
            .then(response => setCategories(response.data))
            .catch(error => console.error("There was an error fetching the categories!", error));

        axios.get(endpointProductCategory)
            .then(response => setProductCategories(response.data))
            .catch(error => console.error("There was an error fetching the product categories!", error));

        axios.get(endpointBrands)
            .then(response => setBrands(response.data))
            .catch(error => console.error("There was an error fetching the brands!", error));
    }, [])

    // filter section


    // filter products based on name
    const filterName = (array) => {
        // array filtered
        const filteredArray = [...array];
        if (name) {
            return filteredArray.filter(product => product.product_name.toLowerCase().includes(name.toLowerCase()));
        }
        return filteredArray;
    }

    // filter by category
    const filterCategory = (array) => {

        if (!cat) return array;
        // Find the category id
        const categoryObj = categories.find(c => c.category_name.toLowerCase() === cat.toLowerCase());
        if (!categoryObj) return [];
        const categoryId = categoryObj.id;
        // Find product ids for this category
        const productIds = productCategories
            .filter(pc => pc.category_id === categoryId)
            .map(pc => pc.product_id);
        // Filter products by those ids
        return array.filter(product => productIds.includes(product.id));

    }

    // filter by brand
    const filterBrand = (array) => {
        // if brand is not present, return the original array
        if (!brand) return array;
        // Find the brand object
        const brandObj = brands.find(b => b.brand_name.toLowerCase() === brand.toLowerCase());
        // if brand object is not found, return an empty array
        if (!brandObj) return [];
        // Get the brand id
        const brandId = brandObj.id;
        // Filter products by brand id
        return array.filter(product => product.brand_id === brandId);
    }

    // filter by price range
    const filterPrice = (array) => {
        // if minPrice or maxPrice is not present, return the original array
        if (!minPrice && !maxPrice) return array;
        // filter products by price range
        return array.filter(product => {
            const discount = product.discount;
            const price = parseFloat(product.price - (product.price * discount) / 100);
            const min = parseFloat(minPrice) || 0;
            const max = parseFloat(maxPrice) || Infinity;
            return price >= min && price <= max;
        });
    }

    // refresh component to show filtered products
    useEffect(() => {
        // filter only when filteredProducts is not empty
        if (products.length > 0) {
            // filtered array with all produicts
            let filtered = products;
            // apply filters when parameters are present
            if (name) filtered = filterName(filtered);
            if (cat) filtered = filterCategory(filtered);
            if (brand) filtered = filterBrand(filtered);
            if (minPrice || maxPrice) filtered = filterPrice(filtered);
            setFilteredProducts(filtered);
        }
    }, [products, name, cat, brand, minPrice, maxPrice, promo]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <p className="my-5 text-uppercase">

                            {/* uppercase all */}
                            {filteredProducts.length} results for <b>"{name}"</b> {cat && `in category "${cat}"`} {brand && `by brand "${brand}"`} {minPrice && `with min price €${minPrice}`} {maxPrice && `and max price €${maxPrice}`} {promo && 'on promo'}

                        </p>
                    </div>
                </div>

                {/* SIDEBAR */}
                <div className="row">
                    <aside className='background-accent1-subtle col-md-3 py-5'>

                        {/* CATEGORIE */}
                        <div className="mb-4">
                            <h6 className='p-1'>CATEGORY</h6>
                            <ul>
                                {categories.map((category) => (
                                    <li key={`cat-${category.id}`}>
                                        <input type="checkbox"
                                            onChange={() => {
                                                // update query params
                                                setSearchParams({
                                                    ...Object.fromEntries(searchParams.entries()),
                                                    cat: category.category_name
                                                });
                                            }}
                                            checked={cat === category.category_name} />
                                        {category.category_name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* BRAND */}
                        <div className="mb-4">
                            <h6 className='p-1'>BRAND</h6>
                            <ul>
                                {brands.map((element) => (
                                    <li key={`brand-${element.id}`}>
                                        <input type="checkbox"
                                            onChange={() => {
                                                // update query params
                                                setSearchParams({
                                                    ...Object.fromEntries(searchParams.entries()),
                                                    brand: element.brand_name
                                                });
                                            }}
                                            checked={brand === element.brand_name} />
                                        {element.brand_name}
                                    </li>
                                ))}
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
                            <div className="col-12">
                                <div className="d-flex justify-content-around flex-wrap">
                                    {/* cards */}
                                    {filteredProducts.map((product) => (
                                        <div className="card-content mb-3" key={product.id}>
                                            <Link className='card-link'
                                                to={`/product/${product.id}`}>
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