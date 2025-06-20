import { Outlet } from "react-router-dom"

import Header from "../components/Header"
import Footer from "../components/Footer"
import SidebarCart from "../components/SidebarCart"

const DefaultLayout = () => {
    return (
        <>
            <header>
                <Header />
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>

            <div>
                <SidebarCart />
            </div>
        </>
    )
}

export default DefaultLayout