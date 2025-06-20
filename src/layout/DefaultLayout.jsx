import { Outlet } from "react-router-dom"

import Header from "../components/Header"
import Footer from "../components/Footer"
import SidebarCart from "../components/SidebarCart"

import { useCart } from '../context/CartContext';

const DefaultLayout = () => {
    const { cart } = useCart();
    const isSidebarVisible = cart.length > 0;
    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <div className={`main-content${isSidebarVisible ? ' with-sidebar' : ''}`}>
                    <header>
                        <Header />
                    </header>

                    <main className="main-content">
                        <Outlet />
                    </main>

                    <footer>
                        <Footer />
                    </footer>
                </div>

                <div>
                    <SidebarCart />
                </div>
            </div >
        </>

    )
}

export default DefaultLayout