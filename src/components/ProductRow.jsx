import React from 'react'
//context
import { useWishlist } from '../context/WishlistContext'

const ProductRow = ({ state, product }) => {
    // context    
    const {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
    } = useWishlist();

    const toggleWishlistIcon = (slug) => {
        if (isInWishlist(slug)) {
            removeFromWishlist(slug);
        } else {
            addToWishlist(slug);
        }
    };

    return (
        <>
            {/* Product Row for Wishlist */}
            {state === 1 &&
                <div className="product-row">
                    <div className="product-row-image">
                        <img src={product.image} alt="" />
                    </div>

                    <div className="product-row-details color-main">
                        <div className="card-brand color-main-subtle">{product.brand_name}</div>
                        <div className="card-product-name">{product.product_name}</div>
                        <div className="card-category color-main-subtle">{product.category_name.toUpperCase()}</div>
                        {product.discount != 0 && <div className="card-tag">promo</div>}
                    </div>

                    <div className="product-row-price-section">
                        <div className="card-original-price color-main-subtle">{`€ ${product.price}`}</div>
                        <div className="card-price">{`€ ${(product.price - (product.price * product.discount) / 100).toFixed(2)}`}</div>
                        <div className="product-row-cta">
                            <div className="product-row-delete" onClick={() => toggleWishlistIcon(product.slug)}>
                                <i className="fa-solid fa-trash"></i>
                            </div>
                            <div className="product-row-add-to-cart color-main">
                                <span>Add to cart</span>
                            </div>
                        </div>
                    </div>
                </div>
            }


            {/* Product Row for Cart */}
            {state === 2 &&
                <div className="product-row">
                    <div className="product-row-image">
                        <img src={product.image} alt="" />
                    </div>

                    <div className="product-row-details color-main">
                        <div className="card-brand color-main-subtle">{product.brand_name}</div>
                        <div className="card-product-name">{product.product_name}</div>
                        <div className="card-category color-main-subtle">{product.category_name.toUpperCase()}</div>
                        {product.discount != 0 && <div className="card-tag">promo</div>}
                    </div>

                    <div className="product-row-price-section">
                        <div className="product-row-cta mb-5">
                            <div className="product-row-delete" onClick={() => toggleWishlistIcon(product.slug)}>
                                <i className="fa-solid fa-trash"></i>
                            </div>
                            <div className="product-row-quantity-selector">
                                <input type="number" min="1" max="99" defaultValue="1" className="product-row-quantity-input p-2 ms-3" />
                            </div>
                        </div>
                        <div className="card-original-price color-main-subtle">{`€ ${product.price}`}</div>
                        <div className="card-price">{`€ ${(product.price - (product.price * product.discount) / 100).toFixed(2)}`}</div>
                    </div>
                </div>
            }
            <div className="product-row-separator"></div>
        </>
    )
}

export default ProductRow
