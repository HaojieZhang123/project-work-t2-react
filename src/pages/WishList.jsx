import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cards from '../components/Cards'

//context
import { useWishlist } from '../context/WishlistContext'

const WishList = () => {
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

    console.log(products);

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
    console.log(wishlist);



    return (
        <>
            <div className='container py-3'>
                <h3 className='wishlist-heading'>your wishlist <b className='wishlist-counter'><i>{`(3 products)`}</i></b></h3>

                {/* stampo in pagina le card dei prodotti in wishlist */}
                {products.map(product => {
                    return (
                        <div className="wishlist-product-list" key={product.id}>
                            <div className="wishlist-product-card">
                                <div className="wishlist-card-image">
                                    <img src={product.image} alt="" />
                                </div>

                                <div className="wishlist-card-details color-main">
                                    <div className="card-brand color-main-subtle">{product.brand_name}</div>
                                    <div className="card-product-name">{product.product_name}</div>
                                    <div className="card-category color-main-subtle">{product.category_name.toUpperCase()}</div>
                                    {product.discount != 0 && <div className="card-tag">promo</div>}
                                </div>

                                <div className="wishlist-card-price-section">
                                    <div className="card-original-price">{`€ ${product.price}`}</div>
                                    <div className="card-price">{`€ ${(product.price - (product.price * product.discount) / 100).toFixed(2)}`}</div>
                                    <div className="wishlist-card-cta">
                                        <div className="card-delete" onClick={() => toggleWishlistIcon(product.slug)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </div>
                                        <div className="card-add-to-cart color-main">
                                            <span>Add to cart</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wishlist-separator"></div>
                        </div>
                    )
                })}

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
            </div>
        </>
    )
}

export default WishList