import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className="container p-3">
                {/* main header */}
                <div className="row align-items-center">
                    {/* Div laterale barra di ricerca */}
                    <div className='col-4 search-container d-flex align-items-center'>
                        <i className="fa-solid fa-magnifying-glass px-2 search-icon"></i>
                        <input type="text" placeholder="Search" className="search-input form-control" />
                    </div>
                    {/* div centrale logo */}
                    <div className='col-4 d-flex justify-content-center logo-container'>
                        <img src="/Logo-black.svg" alt="logo" className="logo-img" />
                    </div>
                    {/* div laterale carrello e wish-list */}
                    <div className='col-4 d-flex justify-content-end'>
                        <div>
                            <i className="fa-regular fa-heart px-3"></i>
                        </div>
                        <div>
                            <i className="fa-solid fa-bag-shopping"></i>
                        </div>
                    </div>
                </div>

                {/* tabs */}
                <div className="row">
                    <div className="col-12 pt-5">
                        <ul className="d-flex flex-wrap justify-content-center px-3">
                            <li className="mx-2"><a href="#">PROMOTIONS</a></li>
                            <li className="mx-2"><a href="#">SKIN CARE</a></li>
                            <li className="mx-2"><a href="#">MAKE-UP</a></li>
                            <li className="mx-2"><a href="#">FACE</a></li>
                            <li className="mx-2"><a href="#">BODY</a></li>
                            <li className="mx-2"><a href="#">HAIR</a></li>
                        </ul>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
