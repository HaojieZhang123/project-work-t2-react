// libraries
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom"
// components
import Header from "../components/Header"
import Footer from "../components/Footer"
import SidebarCart from "../components/SidebarCart"
import MobileCartOverlay from "../components/MobileCartOverlay"
// contexts
import { useCart } from '../context/CartContext';

const DefaultLayout = () => {
    // access to cart context
    const { cart } = useCart();

    // useLocation to determine the current path, hide sidebar and overlay when in cart page
    const location = useLocation();
    const isSidebarVisible = cart.length > 0 && location.pathname !== '/cart';

    // state to manage the mobile cart overlay
    const [showMobileCartOverlay, setShowMobileCartOverlay] = useState(false);
    const [prevCartLength, setPrevCartLength] = useState(cart.length);

    // Show overlay only when a new item is added (on mobile)
    useEffect(() => {
        if (
            window.innerWidth < 768 &&
            cart.length > prevCartLength &&
            location.pathname !== '/cart'
        ) {
            setShowMobileCartOverlay(true);
        }
        setPrevCartLength(cart.length);
        // eslint-disable-next-line
    }, [cart.length]);

    return (
        <>
            <div>
                <div className={`main-content${isSidebarVisible ? ' with-sidebar' : ''} d-flex flex-column min-vh-100`}>
                    <header>
                        <Header />
                    </header>

                    <main className="content-center">
                        <Outlet />
                    </main>

                    <footer>
                        <Footer />
                    </footer>
                </div>

                <div>
                    {isSidebarVisible && <SidebarCart />}
                </div>
            </div >

            {showMobileCartOverlay && location.pathname !== '/cart' && (
                <MobileCartOverlay onClose={() => setShowMobileCartOverlay(false)} />
            )}
        </>

    )
}

export default DefaultLayout