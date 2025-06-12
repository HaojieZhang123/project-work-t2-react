import React from 'react'
import Cards from '../components/Cards'

const Homepage = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    {/* hero banner */}
                    <div className="col-12">
                        <img src="https://picsum.photos/1300/720" alt="image" />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>BEST SELLERS</h2>
                        <div className="row">
                            {/* cards */}
                            <Cards />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>LATEST PRODUCTS</h2>
                        <div className="row">
                            {/* cards */}
                            <Cards />

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Homepage