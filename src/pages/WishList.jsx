import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cards from '../components/Cards'
import Slider from '../components/Slider'

//context
import { useWishlist } from '../context/WishlistContext'
import ProductRow from '../components/ProductRow'

const WishList = () => {
    // state for product rows
    const [productRowsState, setProductRowsState] = useState(1) // 1 for wishlist, 2 for cart, 3 for summary
    const [bestSellers, setBestSellers] = useState([])
    const [products, setProducts] = useState([])
    const endpointBestSellers = 'http://localhost:3000/api/products/special/best-sellers'

    // context    
    const {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
    } = useWishlist();

    // console.log(products);

    // function to fetch product
    const fetchProduct = () => {
        // fetch products in wishlist
        axios.get('http://localhost:3000/api/products')
            .then(response => {
                const allProducts = response.data;
                // filter products that are in the wishlist
                const wishlistProducts = allProducts.filter(product => wishlist.includes(product.slug));
                setProducts(wishlistProducts)
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });

        // fetch best sellers
        axios.get(endpointBestSellers)
            .then(response => {
                setBestSellers(response.data)
            })
            .catch(error => {
                console.error("There was an error fetching the best sellers!", error);
            });
    };

    useEffect(() => {
        fetchProduct();
    }, [wishlist]);
    // console.log(wishlist);



    return (
        <>
            <div className='container py-3'>
                <h3 className='wishlist-heading'>your wishlist <b className='wishlist-counter'><i>{`${products.length} product(s)`}</i></b></h3>


                {/* se la wishlist è vuota */}
                {wishlist.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    <div className="wishlist-product-list">
                        {/* stampo in pagina le card dei prodotti in wishlist */}
                        {products.map(product => (
                            <div key={product.slug}>
                                <ProductRow state={productRowsState} product={product} />
                            </div>
                        )
                        )}
                    </div>
                )}

            </div>
            <div className="background-rose pb-5">
                <div className="container">
                    {/* card suggeriti per te */}
                    <div className="col-12 my-5 pt-5">
                        <h2 className='mb-2'>SUGGERITI PER TE</h2>
                        <Slider products={bestSellers} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default WishList