import React from 'react'

const CardsList = ({ product }) => {

    const { product_name, slug, brand_id, price, discount, added_date, image } = product;

    const discountValue = (price * discount) / 100;
    const actualPrice = price - discountValue;

    const today = new Date();
    const addedDate = new Date(added_date);
    const diffTime = today - addedDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const isNew = diffDays <= 28 && diffDays >= 0;
    const isPromo = discount > 0;


    return (
        <div className="cards-list d-flex">
            <div className="card-list-img">
                <img src={image} alt={product_name} />
            </div>
            <div className="card-list-info">
                <div className="cards-list-brand py-2">Brand N°{brand_id}</div>
                <div className="cards-list-name py-2">{product_name}</div>
                <div className="cards-list-category py-2">Categoria prodotto</div>
                <div className="cards-list-price py-2">
                    {`€ ${actualPrice.toFixed(2)}`}
                    {discount !== 0 && (
                        <span className="cards-list-original">€ {price}</span>
                    )}
                </div>
                <div className="cards-list-tags">
                    {isPromo && <span className="tag py-2">promo</span>}
                    {isNew && <span className="tag py-2">new</span>}
                </div>
            </div>
        </div>
    )
}

export default CardsList