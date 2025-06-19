import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cards from '../components/Cards'

//context
import { useWishlist } from '../context/WishlistContext'
import ProductRow from '../components/ProductRow'

const WishList = () => {
    // state for product rows
    const [productRowsState, setProductRowsState] = useState(2) // 1 for wishlist, 2 for cart
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

    const toggleWishlistIcon = (slug) => {
        if (isInWishlist(slug)) {
            removeFromWishlist(slug);
        } else {
            addToWishlist(slug);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [wishlist]);
    // console.log(wishlist);



    return (
        <>
            <div className='container py-3'>
                <h3 className='wishlist-heading'>your wishlist <b className='wishlist-counter'><i>{`(3 products)`}</i></b></h3>

                <div className="wishlist-product-list">
                    {/* stampo in pagina le card dei prodotti in wishlist */}
                    {products.map(product => {
                        return (
                            <ProductRow state={productRowsState} product={product} key={product.slug} />
                        )
                    })}
                </div>

            </div>
            <div className="background-rose pb-5">
                <div className="container">
                    {/* card suggeriti per te */}
                    <div className="col-12 my-5 pt-5">
                        <h2 className='mb-2'>SUGGERITI PER TE</h2>
                        <div className="d-flex justify-content-between overflow-auto align-items-stretch">
                            {/* cards */}
                            {bestSellers.map((product) => (
                                <div className="card-content" key={product.id}>
                                    <i
                                        className={`wishlist-heart fa-heart position-absolute top-0 end-0 m-2 ${isInWishlist(product.slug) ? 'fas' : 'far'}`}
                                        onClick={() => toggleWishlistIcon(product.slug)}
                                        style={{ cursor: 'pointer' }}
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
            </div>
        </>
    )
}

export default WishList