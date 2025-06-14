import React from 'react'

const Cards = ({ product }) => {
    return (
        <div className="card mb-3">
            <img src={product.image} className="card-img-top" alt={product.product_name} />
            <div className="card-body">
                <h5 className="card-title">{product.product_name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Prezzo:</strong> €{product.price}</p>
                <p className="card-text"><small className="text-muted">{product.category}</small></p>
            </div>
        </div>
    )
}

export default Cards