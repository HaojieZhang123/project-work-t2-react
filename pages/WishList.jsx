import React from 'react'

const WishList = () => {
    return (
        <div className='container pt-3 pb-3'>
            <div className="row">
                <div className="col-12">
                    <h1 className='text-center'><i className="fa-regular fa-heart"></i>Wish List<i className="fa-regular fa-heart"></i></h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <p className='text-secondary'>Your wish list is empty.</p>
                </div>
            </div>
        </div>
    )
}

export default WishList