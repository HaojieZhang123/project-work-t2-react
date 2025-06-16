import React from 'react'

const Cards = ({ product }) => {

    const { image, product_name, brand_id, discount, price, added_date, sold } = product
    console.log(product)

    const discountValue = (price * discount) / 100

    const actualPrice = price - discountValue


    return (
        <div className="product-card color-main">
            <div className="card-image-container">
                <img src={image} alt="" />
            </div>
            <div className="card-body-container">
                <div className="card-brand color-main-subtle">Brand N°{brand_id}</div>
                <div className="card-product-name">{product_name}</div>
                <div className="card-category color-main-subtle">Categoria prodotto</div>
                <div className="card-price">
                    {`€ ${actualPrice.toFixed(2)}`}
                    {discount != 0 && <i className='card-original-price ms-2 color-main-subtle'>{`€ ${price}`}</i>}
                </div>
                <div className="card-tag">promo</div>
                <div className="card-tag">new</div>
            </div>

        </div>
    )
}
{/* <img src={product.image} className="card-img-top" alt={product.product_name} />
<div className="card-body">
    <h5 className="card-title">{product.product_name}</h5>
    <p className="card-text">{product.description}</p>
    <p className="card-text"><strong>Prezzo:</strong> €{product.price}</p>
    <p className="card-text"><small className="text-muted">{product.category}</small></p>
</div> */}

export default Cards