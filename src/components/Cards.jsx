import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'


const Cards = ({ product }) => {

    const { product_name, slug, brand_id, price, discount, added_date, image, brand_name, category_name } = product

    //const { category_name } = category

    //const { brand_name } = brand
    // context
    const {
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        isInCart
    } = useCart();

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

    // calcolo il prezzo effettivo dopo lo sconto
    const discountValue = (price * discount) / 100

    const actualPrice = price - discountValue


    // Calcolo se il prodotto è "new"
    const today = new Date()
    const addedDate = new Date(added_date)
    const diffTime = today - addedDate
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    const isNew = diffDays <= 28 && diffDays >= 0

    // Calcolo se il prodotto è "promo"
    const isPromo = discount > 0

    return (
        <div className="product-card h-100">
            <Link to={`/product/${slug}`} className='card-link color-main'>
                <div className="card-body-container">
                    <div className="card-image-container">
                        <img src={image} alt="" />
                    </div>
                    <div className="card-brand color-main-subtle">{brand_name}</div>

                    <div className="card-product-name">{product_name}</div>
                    <div className="card-category color-main-subtle">{category_name}</div>
                </div>
                <div className="card-bottom-row">
                    <div className="card-price color-main">
                        {`€ ${actualPrice.toFixed(2)}`}
                        {discount != 0 && <i className='card-original-price ms-2 color-main-subtle'>{`€ ${price}`}</i>}
                    </div>
                    <div className='d-flex justify-content-start align-items-center gap-2'>
                        {isPromo && <div className='card-tag tag-promo'>promo</div>}
                        {isNew && <div className='card-tag tag-new'>new</div>}
                    </div>
                </div>
            </Link>

            <div className="card-add-to-cart color-main mt-3" onClick={() => addCartButtonHandler(product.slug)}>
                <span>Add to Cart {isInCart(product.slug) ? `(${cart.find(item => item.slug === product.slug)?.quantity}) ` : ' '}</span>
            </div>
        </div>
    )
}

export default Cards