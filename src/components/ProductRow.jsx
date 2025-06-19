import React, { useState, useEffect } from 'react'
//context
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

const ProductRow = ({ state, product }) => {
    const { slug, image, brand_name, product_name, category_name, price, discount, added_date } = product;



    // context
    const {
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        isInCart
    } = useCart();

    const {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
    } = useWishlist();

    const [quantityValue, setQuantityValue] = useState(() => {
        // Initialize quantityValue based on whether the product is in the cart
        const cartItem = cart.find(item => item.slug === slug);
        return cartItem ? cartItem.quantity : 1; // Default to 1 if not in cart
    });


    const toggleWishlistIcon = (slug) => {
        if (isInWishlist(slug)) {
            removeFromWishlist(slug);
        } else {
            addToWishlist(slug);
        }
    };

    // Calculate the actual price after discount
    const discountValue = (price * discount) / 100

    const actualPrice = (price - discountValue).toFixed(2)

    // Calcolo se il prodotto è "new"
    const today = new Date()
    const addedDate = new Date(added_date)
    const diffTime = today - addedDate
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    const isNew = diffDays <= 28 && diffDays >= 0

    // Calcolo se il prodotto è "promo"
    const isPromo = discount > 0

    // calculate de quantity of a product in the cart
    useEffect(() => {
        updateCartQuantity(slug, quantityValue);
    }, [quantityValue])

    // add product to cart. if already in cart, increase quantity by 1
    const addCartButtonHandler = (slug) => {
        if (isInCart(slug)) {
            // get the current quantity and increase it by 1
            const currentQuantity = cart.find(item => item.slug === slug)?.quantity || 0;
            // update the cart quantity
            updateCartQuantity(slug, currentQuantity + 1);
        } else {
            addToCart(slug, 1);
        }
    };

    return (
        <>
            {/* Product Row for Wishlist */}
            {state === 1 &&
                <div className="product-row">
                    <div className="product-row-image">
                        <img src={image} alt="" />
                    </div>

                    <div className="product-row-details color-main">
                        <div className="card-brand color-main-subtle">{brand_name}</div>
                        <div className="card-product-name">{product_name}</div>
                        <div className="card-category color-main-subtle">{category_name.toUpperCase()}</div>
                        <div className='product-row-tags'>
                            {isPromo && <div className="card-tag">promo</div>}
                            {isNew && <div className="card-tag">new</div>}
                        </div>
                    </div>

                    <div className="product-row-price-section">
                        <div className="card-original-price color-main-subtle">{`€ ${price}`}</div>
                        <div className="card-price">{`€ ${actualPrice}`}</div>
                        <div className="product-row-cta">
                            <div className="product-row-delete" onClick={() => toggleWishlistIcon(slug)}>
                                <i className="fa-solid fa-trash"></i>
                            </div>
                            <div className="product-row-add-to-cart color-main" onClick={() => addCartButtonHandler(product.slug)}>
                                <span>Add to Cart {isInCart(product.slug) ? `(${cart.find(item => item.slug === product.slug)?.quantity}) ` : ' '}</span>
                            </div>
                        </div>
                    </div>
                </div>
            }


            {/* Product Row for Cart */}
            {state === 2 &&
                <div className="product-row">
                    <div className="product-row-image">
                        <img src={image} alt="" />
                    </div>

                    <div className="product-row-details color-main">
                        <div className="card-brand color-main-subtle">{brand_name}</div>
                        <div className="card-product-name">{product_name}</div>
                        <div className="card-category color-main-subtle">{category_name.toUpperCase()}</div>
                        <div className='product-row-tags'>
                            {isPromo && <div className="card-tag">promo</div>}
                            {isNew && <div className="card-tag">new</div>}
                        </div>
                    </div>

                    <div className="product-row-price-section">
                        <div className="product-row-cta mb-5">
                            <div className="product-row-delete" onClick={() => removeFromCart(slug)}>
                                <i className="fa-solid fa-trash"></i>
                            </div>
                            <div className="product-row-quantity-selector">
                                <input type="number" min="1" max="99" className="product-row-quantity-input p-2 ms-3" value={quantityValue} onChange={(e) => setQuantityValue(e.target.value)} />
                            </div>
                        </div>
                        <div className="card-original-price color-main-subtle">{`€ ${price}`}</div>
                        <div className="card-price">{`€ ${actualPrice}`}</div>
                    </div>
                </div>
            }
            <div className="product-row-separator"></div>
        </>
    )
}

export default ProductRow