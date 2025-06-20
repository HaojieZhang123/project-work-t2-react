import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Header = () => {
    // Stato per il menu mobile 
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    const wishlistCounter = wishlist.length

    const cartCounter = cart.length != 0 ? cart.map(item => item.quantity).reduce((tot, amount) => parseInt(tot) + parseInt(amount)) : 0


    // Categorie raggruppate per menu
    const categoryGroups = [
        {
            title: "SKINCARE",
            items: [
                { label: "SERUM", value: "serum" },
                { label: "MOISTURIZER", value: "moisturizer" },
                { label: "TONER", value: "toner" },
            ]
        },
        {
            title: "FACE",
            items: [
                { label: "FOUNDATION", value: "foundation" },
                { label: "CONCEALER", value: "concealer" },
                { label: "POWDER", value: "powder" },
            ]
        },
        {
            title: "EYES & LIPS",
            items: [
                { label: "MASCARA", value: "mascara" },
                { label: "EYELINER", value: "eyeliner" },
                { label: "LIPSTICK", value: "lipstick" },
            ]
        },
        {
            title: "BODY",
            items: [
                { label: "BODY WASH", value: "body+wash" },
                { label: "SCRUB", value: "scrub" },
                { label: "BODY CREAM", value: "body+cream" },
            ]
        },
        {
            title: "HAIR",
            items: [
                { label: "SHAMPOO", value: "shampoo" },
                { label: "CONDITIONER", value: "conditioner" },
                { label: "PROTECTOR", value: "heat+protector" },
            ]
        },
    ];

    // Funzione per gestire il click su una categoria
    const handleCategoryClick = (category) => {
        window.location.href = `/search?cat=${(category)}`;
    };

    return (
        <>
            <div className="container p-3">
                {/* main header */}
                <div className="row">
                    {/* Div laterale barra di ricerca */}
                    <div className='col-4 d-flex search-container justify-content-start align-items-center'>
                        <form
                            className="d-flex w-100"
                            // passaggio dei parametri di ricerca tramite query string
                            onSubmit={e => {
                                e.preventDefault();
                                const name = e.target.elements.search.value.trim();
                                if (name) {
                                    window.location.href = `/search?name=${encodeURIComponent(name)}`;
                                }
                            }}
                        >
                            <i className="fa-solid fa-magnifying-glass px-2 search-icon"></i>
                            <input
                                type="text"
                                name="search"
                                placeholder="Search"
                                className="search-input flex-grow-1"
                                autoComplete="off"
                            />
                        </form>
                    </div>

                    <div className='col-4 d-flex justify-content-center logo-container'>
                        <Link to="/">
                            <img src="/Logo-black.svg" alt="logo" className="logo-img" />
                        </Link>
                    </div>

                    {/* icone a destra + hamburger per mobile */}
                    <div className='col-4 d-flex justify-content-end align-items-center'>
                        {/* hamburger visibile solo su mobile */}
                        <button
                            className="btn d-md-none me-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <i className="fa-solid fa-bars"></i>
                        </button>

                        <Link to="/wishlist" className='header-icon-link color-main'>
                            <div className='header-icon'>
                                <i className="fa-regular fa-heart px-3 text-dark"></i>
                                <div className='header-icon-counter header-icon-wishlist'>
                                    <b>{wishlistCounter}</b>
                                </div>
                            </div>
                        </Link>
                        <Link to="/cart" className='header-icon-link color-white'>
                            <div className='header-icon'>
                                <i className="fa-solid fa-bag-shopping text-dark"></i>
                                <div className='header-icon-counter header-icon-cart'>
                                    <b>{cartCounter}</b>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* tabs */}
                <div className="row">
                    <div className="col-12 pt-5">
                        <ul className="d-flex flex-wrap justify-content-center px-3">
                            {categories.map(cat => (
                                <li className="mx-2" key={cat.value}>
                                    <button
                                        type="button"
                                        className="btn btn-link p-0 color-main"
                                        style={{ textDecoration: "none", color: "inherit" }}
                                        onClick={() => handleCategoryClick(cat.value)}
                                    >
                                        {cat.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
