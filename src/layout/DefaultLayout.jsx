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
                    <SidebarCart />
                </div>
            </div >
        </>

    )
}

export default DefaultLayout