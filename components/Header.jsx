
const Header = () => {
    return (
        <>
            <div className="container p-3">
                {/* main header */}
                <div className="row">
                    {/* Div laterale barra di ricerca */}
                    <div className='col-4'>
                        <i className="fa-solid fa-magnifying-glass px-2"></i>
                        <input type="text" placeholder="Search" />
                    </div>
                    {/* div centrale logo */}
                    <div className='col-4 d-flex justify-content-center'>
                        <img src="/Logo-black.svg" alt="logo" />
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
                        <ul className='d-flex justify-content-around'>
                            <li>
                                <a href="#">PROMOTIONS</a>
                            </li>
                            <li>
                                <a href="#">SKIN CARE</a>
                            </li>
                            <li>
                                <a href="#">MAKE-UP</a>
                            </li>
                            <li>
                                <a href="#">FACE</a>
                            </li>
                            <li>
                                <a href="#">BODY</a>
                            </li>
                            <li>
                                <a href="#">HAIR</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header