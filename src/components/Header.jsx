import { useState } from 'react';
import { Link } from "react-router-dom";
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Header = () => {
    // Stato per il menu mobile 
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdowns, setMobileDropdowns] = useState({});

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
            title: "EYES-LIPS",
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
        window.location.href = `/search?cat=${category}`;
    };

    return (
        <>
            <div className="container pt-3 pb-3">
                {/* main header */}
                <div className="row d-flex justify-content-lg-between">
                    {/* Div laterale barra di ricerca */}
                    <div className='col-12 col-lg-4 d-flex search-container justify-content-start align-items-center header-search'>
                        <form
                            className="d-flex align-items-center w-100"
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
                                className="search-input"
                            />
                        </form>
                    </div>

                    {/* logo centrale */}
                    <div className='col-6 col-lg-4 d-flex justify-content-center align-items-center logo-container'>
                        <Link to="/">
                            <img src="/logo_black.svg" alt="logo" className="logo-img" />
                        </Link>
                    </div>

                    {/* icone a destra + hamburger per mobile */}
                    <div className='col-6 col-lg-4 d-flex justify-content-end align-items-center menu-container'>
                        {/* hamburger visibile solo su mobile */}
                        <button
                            className="btn d-md-none mx-2 align-self-center d-flex align-items-center"
                            onClick={() => {
                                setMobileMenuOpen(!mobileMenuOpen)
                                setMobileDropdowns({});
                            }}
                        >
                            <i className="fa-solid fa-bars fs-4 text-dark"></i>
                        </button>

                        {/* Icona wishlist */}
                        <Link to="/wishlist" className='header-icon-link color-main'>
                            <div className='header-icon'>
                                <i className="fa-regular fa-heart px-3 text-dark"></i>
                                {/* contatore */}
                                <div className='header-icon-counter header-icon-wishlist'>
                                    <b>{wishlistCounter}</b>
                                </div>
                            </div>
                        </Link>

                        {/* Icona cart */}
                        <Link to="/cart" className='header-icon-link color-white'>
                            <div className='header-icon'>
                                <i className="fa-solid fa-bag-shopping text-dark"></i>
                                {/* contatore */}
                                <div className='header-icon-counter header-icon-cart'>
                                    <b>{cartCounter}</b>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* categorie - solo mobile con hamburger attivo */}
                {mobileMenuOpen && (
                    <div className="row d-md-none">
                        <div className="col-12 pt-3 d-flex flex-column gap-2">
                            {categoryGroups.map((group, index) => (
                                <div className="mobile-dropdown-group" key={group.title}>
                                    <div
                                        className="mobile-dropdown-header"
                                        onClick={() => setMobileMenuOpen(prev => ({
                                            ...prev,
                                            [group.title]: !prev[group.title]
                                        }))}
                                    >
                                        {group.title}
                                        <i className={`fa-solid fa-chevron-${mobileMenuOpen[group.title] ? 'up' : 'down'} float-end`}></i>
                                    </div>
                                    {mobileMenuOpen[group.title] && (
                                        <ul className="mobile-dropdown-menu">
                                            {group.items.map(item => (
                                                <li key={item.value}>
                                                    <a href={`/search?cat=${item.value}`}>{item.label}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* categorie - visibili solo su desktop */}
                <div className="row d-none d-md-flex">
                    <div className="col-12 pt-4 d-flex justify-content-around flex-wrap gap-2">
                        {categoryGroups.map(group => (
                            <div className="dropdown-wrapper" key={group.title}>
                                <span className="dropdown-title">{group.title}</span>
                                <ul className="dropdown-menu-custom">
                                    {group.items.map(item => (
                                        <li key={item.value}>
                                            <a href={`/search?cat=${item.value}`}>{item.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    );
};

export default Header;
