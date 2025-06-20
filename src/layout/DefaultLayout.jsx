import { Outlet } from "react-router-dom"

import Header from "../components/Header"
import Footer from "../components/Footer"
import SidebarCart from "../components/SidebarCart"

const DefaultLayout = () => {
    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <header>
                    <Header />
                </header>

                <main className="main-content">
                    <Outlet />
                </main>

                <footer>
                    <Footer />
                </footer>

                <div>
                    <SidebarCart />
                </div>
            </div>
        </>

    )
}

export default DefaultLayout