import React from 'react'

const WishList = () => {
    return (
        <div className='container py-3'>
            <h3 className='wishlist-heading'>your wishlist <b className='wishlist-counter'><i>{`(3 products)`}</i></b></h3>

            <div className="wishlist-product-list">
                <div className="wishlist-product-card">
                    <div className="wishlist-card-image">
                        <img src="https://media.douglas.it/medias/eJGVgt015658-0-global.jpg?context=bWFzdGVyfGltYWdlc3w1NzM1MnxpbWFnZS9qcGVnfGFEQm1MMmhpWkM4Mk16VTBNRFE1TlRZeE16azRNaTlsU2tkV1ozUXdNVFUyTlRoZk1GOW5iRzlpWVd3dWFuQm58ZTViYzg3MDMwZjdiNmI2MGZiMzdhNGEyYWY1ZWY0ZDJjODA5ODE1NzRiM2FmN2FmNWU1Nzg4YWI1OTgwNGUyYw&grid=true&imPolicy=grayScaled&imdensity=1&imwidth=775" alt="" />
                    </div>

                    <div className="wishlist-card-details color-main">
                        <div className="card-brand color-main-subtle">the ordinary</div>
                        <div className="card-product-name">peptidi niacinamide 10% zinco 1%</div>
                        <div className="card-category color-main-subtle">serum</div>
                        <div className="card-tag">promo</div>
                    </div>

                    <div className="wishlist-card-price-section">
                        <div className="card-price">€23,00</div>
                        <div className="wishlist-card-cta">
                            <div className="card-delete">
                                <i className="fa-solid fa-trash"></i>
                            </div>
                            <div className="card-add-to-cart color-main px-3 py-1">
                                Add to cart
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wishlist-separator"></div>
            </div>
        </div>
    )
}

export default WishList