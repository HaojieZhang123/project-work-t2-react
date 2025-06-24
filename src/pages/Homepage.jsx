import Slider from '../components/Slider'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';
import '../swiper-bundle.min.css';

import { useState, useEffect } from 'react'
import axios from 'axios'


const Homepage = () => {

    const [bestSellers, setBestSellers] = useState([])
    const [latestProducts, setLatestProducts] = useState([])

    const endpointBestSellers = 'http://localhost:3000/api/products/special/best-sellers'
    const endpointLatestProducts = 'http://localhost:3000/api/products/special/latest-products'

    // function for fetch products via axios
    const fetchProducts = () => {

        // fetch best sellers
        axios.get(endpointBestSellers)
            .then(response => {
                setBestSellers(response.data)
            })
            .catch(error => {
                console.error("There was an error fetching the best sellers!", error);
            });

        // fetch latest products
        axios.get(endpointLatestProducts)
            .then(response => {
                setLatestProducts(response.data)
            })
            .catch(error => {
                console.error("There was an error fetching the latest products!", error);
            });
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <div className="container pt-3 pb-3">
                <div className="row">
                    {/* hero banner */}
                    <div className="col-12">
                        <Swiper
                        className='hero-banner-swiper'
                            modules={[ Pagination, Autoplay, A11y]}
                            // spaceBetween={20}
                            slidesPerView={1}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            // navigation
                            pagination={{ clickable: true }}
                            // scrollbar={{ draggable: true }}
                            // onSwiper={(swiper) => console.log(swiper)}
                            // onSlideChange={() => console.log('slide change')}
                        >
                                <SwiperSlide>
                                    <div className="hero-banner-aspect">
                                        <img src="./hero_banner_finale.png" alt="" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="hero-banner-aspect">
                                        <img src="./hero-banner-2.png" alt="" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="hero-banner-aspect">
                                        <img src="./hero-banner-3.png" alt="" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="hero-banner-aspect">
                                        <img src="./hero-banner-4.png" alt="" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="hero-banner-aspect">
                                        <img src="./hero-banner-5.png" alt="" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="hero-banner-aspect">
                                        <img src="./hero-banner-6.png" alt="" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="hero-banner-aspect">
                                        <img src="./hero-banner-7.png" alt="" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="hero-banner-aspect">
                                        <img src="./hero-banner-8.png" alt="" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="hero-banner-aspect">
                                        <img src="./hero-banner-9.png" alt="" />
                                    </div>
                                </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>

            <div className="mt-5 pt-5 pb-5 background-rose ">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className='mb-5'>BEST SELLERS</h2>
                            <Slider products={bestSellers} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5 pt-3 pb-5">
                <div className="row">
                    <div className="col-12">
                        <h2 className='mb-5'>LATEST PRODUCTS</h2>

                        <Slider products={latestProducts} />

                    </div>
                </div>
            </div>

        </>
    )
}

export default Homepage