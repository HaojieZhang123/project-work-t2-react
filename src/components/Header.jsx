import { useState } from 'react';
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

                    {/* logo centrale */}
                    <div className='col-4 d-flex justify-content-center logo-container'>
                        <Link to="/">
                            <img src="/Logo-black.svg" alt="logo" className="logo-img" />
                        </Link>
                    </div>

                    {/* icone a destra + hamburger per mobile */}
                    <div className='col-4 d-flex justify-content-end align-items-center'>
                        {/* hamburger visibile solo su mobile */}
                        <button
                            className="btn d-md-none mx-2 align-self-center d-flex align-items-center"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                        <div className="col-12 pt-3 d-flex flex-column gap-0">
                            {categoryGroups.map(group => (
                                <div className="category-group category-group-width" key={group.title}>
                                    <select
                                        onChange={(e) => handleCategoryClick(e.target.value)}
                                        defaultValue=""
                                        className="form-select"
                                    >
                                        <option value="" disabled>{group.title}</option>
                                        {group.items.map(item => (
                                            <option value={item.value} key={item.value}>{item.label}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* categorie - visibili solo su desktop */}
                <div className="row d-none d-md-flex">
                    <div className="col-12 pt-4 d-flex justify-content-around flex-wrap gap-0">
                        {categoryGroups.map(group => (
                            <div className="category-group category-group-width " key={group.title}>
                                <select
                                    onChange={(e) => handleCategoryClick(e.target.value)}
                                    defaultValue=""
                                    className="form-select"
                                >
                                    <option value="" disabled>{group.title}</option>
                                    {group.items.map(item => (
                                        <option value={item.value} key={item.value}>{item.label}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
