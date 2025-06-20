import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
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
                { label: "HEAT PROTECTOR", value: "heat+protector" },
            ]
        },
    ];

    const handleCategoryClick = (category) => {
        window.location.href = `/search?cat=${category}`;
    };

    return (
        <>
            <div className="container p-3">
                {/* Header principale */}
                <div className="row align-items-center">
                    <div className='col-4 d-flex search-container align-items-center'>
                        <form
                            className="d-flex w-100"
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

                    <div className='col-4 d-flex justify-content-end'>
                        <Link to="/wishlist">
                            <i className="fa-regular fa-heart px-3 text-dark"></i>
                        </Link>
                        <Link to="/cart">
                            <i className="fa-solid fa-bag-shopping text-dark"></i>
                        </Link>
                    </div>
                </div>

                {/* Drop-down menu per categorie */}
                <div className="row">
                    <div className="col-12 pt-4 d-flex justify-content-around flex-wrap gap-3">

                        <div className="category-group">
                            <select onChange={(e) => handleCategoryClick(e.target.value)} defaultValue="">
                                <option value="" disabled>SKINCARE</option>
                                <option value="serum">SERUM</option>
                                <option value="moisturizer">MOISTURIZER</option>
                                <option value="toner">TONER</option>
                            </select>
                        </div>

                        <div className="category-group">
                            <select onChange={(e) => handleCategoryClick(e.target.value)} defaultValue="">
                                <option value="" disabled>FACE</option>
                                <option value="foundation">FOUNDATION</option>
                                <option value="concealer">CONCEALER</option>
                                <option value="powder">POWDER</option>
                            </select>
                        </div>

                        <div className="category-group">
                            <select onChange={(e) => handleCategoryClick(e.target.value)} defaultValue="">
                                <option value="" disabled>EYES & LIPS</option>
                                <option value="mascara">MASCARA</option>
                                <option value="eyeliner">EYELINER</option>
                                <option value="lipstick">LIPSTICK</option>
                            </select>
                        </div>

                        <div className="category-group">
                            <select onChange={(e) => handleCategoryClick(e.target.value)} defaultValue="">
                                <option value="" disabled>BODY</option>
                                <option value="body+wash">BODY WASH</option>
                                <option value="scrub">SCRUB</option>
                                <option value="body+cream">BODY CREAM</option>
                            </select>
                        </div>

                        <div className="category-group">
                            <select onChange={(e) => handleCategoryClick(e.target.value)} defaultValue="">
                                <option value="" disabled>HAIR</option>
                                <option value="shampoo">SHAMPOO</option>
                                <option value="conditioner">CONDITIONER</option>
                                <option value="heat+protector">HEAT PROTECTOR</option>
                            </select>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
};

export default Header;
