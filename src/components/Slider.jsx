import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y } from 'swiper/modules';
import '../swiper-bundle.min.css';

// components
import Cards from '../components/Cards'

const Slider = ({ products }) => {

    return (
        <Swiper
            className='pb-3'
            modules={[Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={5}
            // navigation
            // pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            breakpoints={{
                0: {
                    slidesPerView: 1.6,
                    spaceBetween: 10,
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 14,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 18,
                },
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
            }}
        >
            {products.map((product) => (
                <SwiperSlide className="swiper-card-content" key={product.id}>
                    <Cards product={product} />
                </SwiperSlide>
            ))}

        </Swiper>
    )
}

export default Slider