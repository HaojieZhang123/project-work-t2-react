import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    // Array delle categorie per i tab
    const categories = [
        { label: "SERUM", value: "serum" },
        { label: "MASCARA", value: "mascara" },
        { label: "FOUNDATION", value: "foundation" },
        { label: "SCRUB", value: "scrub" },
        { label: "BODY WASH ", value: "body+wash" },
        { label: "SHAMPOO", value: "shampoo" },
    ];

    // Funzione per gestire il click su una categoria
    const handleCategoryClick = (category) => {
        window.location.href = `/search?cat=${(category)}`;
    };

    return (
        <>
            <div className="container p-3">
                {/* main header */}
                <div className="row align-items-center">
                    {/* Div laterale barra di ricerca */}
                    <div className='col-4 d-flex search-container align-items-center'>
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
                                className="search-input form-control"
                                autoComplete="off"
                            />
                        </form>
                    </div>

                    <div className='col-4 d-flex justify-content-center logo-container'>
                        <Link to="/">
                            <img src="/Logo-black.svg" alt="logo" className="logo-img" />
                        </Link>
                    </div>
                    {/* div laterale carrello e wish-list */}
                    <div className='col-4 d-flex justify-content-end'>
                        <div>
                            <Link to="/wishlist">
                                <i className="fa-regular fa-heart px-3 text-dark"></i>
                            </Link>
                        </div>
                        <div>
                            <Link to="/cart">
                                <i className="fa-solid fa-bag-shopping text-dark"></i>
                            </Link>
                        </div>
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
