import React from 'react'

const Cards = ({ product }) => {

    const { image, product_name, brand_id, discount, price, added_date, sold } = product

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
        <div className="product-card color-main h-100">
            <div className="card-body-container">
                <div className="card-image-container">
                    <img src={image} alt="" />
                </div>
                <div className="card-brand color-main-subtle">Brand N°{brand_id}</div>
                <div className="card-product-name">{product_name}</div>
                <div className="card-category color-main-subtle">Categoria prodotto</div>
            </div>
            <div className="card-bottom-row">
                <div className="card-price">
                    {`€ ${actualPrice.toFixed(2)}`}
                    {discount != 0 && <i className='card-original-price ms-2 color-main-subtle'>{`€ ${price}`}</i>}
                </div>
                <div>
                    {isPromo && <div className="card-tag">promo</div>}
                    {isNew && <div className="card-tag">new</div>}
                </div>
            </div>
        </div>
    )
}

export default Cards