import { Outlet } from "react-router-dom"

import Header from "../components/Header"
import Footer from "../components/Footer"

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
            </div>
        </>

    )
}

export default DefaultLayout