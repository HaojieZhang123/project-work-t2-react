import { useState, useEffect } from 'react'
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

    // calculate the quantity of a product in the cart
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
                        <div className="card-category color-main-subtle">{category_name}</div>
                        <div className='product-row-tags'>
                            {isPromo && <div className="card-tag tag-promo">promo</div>}
                            {isNew && <div className="card-tag tag-new">new</div>}
                        </div>
                    </div>

                    <div className="product-row-price-section">
                        <div className="d-flex justify-content-end align-items-center">
                            <div className="card-original-price color-main-subtle">{`€ ${price}`}</div>
                            <div className="card-price ms-3">{`€ ${actualPrice}`}</div>
                        </div>

                        <div className="product-row-cta">
                            <div className="product-row-delete" onClick={() => toggleWishlistIcon(slug)}>
                                <i className="fa-solid fa-heart-circle-minus"></i>
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
                            {isPromo && <div className="card-tag tag-promo">promo</div>}
                            {isNew && <div className="card-tag tag-new">new</div>}
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
                        <div className="d-flex justify-content-end align-items-center">
                            <div className="card-original-price color-main-subtle">{`€ ${price}`}</div>
                            <div className="card-price ms-3">{`€ ${actualPrice}`}</div>
                        </div>
                    </div>
                </div>
            }

            {/* Product Row for Summary page */}
            {state === 3 &&
                <div className="card-list">
                    <div className="card-list-img img-zoom-container">
                        <img src={image} alt={product_name} className='img-zoom' />
                    </div>

                    <div className="card-list-info color-main">
                        <div className="card-brand color-main-subtle">{brand_name}</div>
                        <div className="card-product-name">{product_name}</div>
                        <div className="card-category color-main-subtle">{category_name}</div>
                        <div className="card-list-bottom">
                            {isPromo && <span className="card-tag tag-promo">promo</span>}
                            {isNew && <span className="card-tag tag-new">new</span>}
                            <div className="card-original-price color-main-subtle ms-4">{`€ ${price}`}</div>
                            <div className="card-price ms-2">{`€ ${actualPrice}`}</div>
                        </div>
                    </div>
                </div>
            }
            <div className="product-row-separator"></div>
        </>
    )
}

export default ProductRow