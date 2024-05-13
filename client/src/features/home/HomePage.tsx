// import { Box, Typography } from '@mui/material';
import Slider from 'react-slick';

export default function HomePage() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            <Slider {...settings}>
                <div>
                    <img src="/images/MH_D_2880x1280_2_392519213c.avif" alt="hero" style={{ display: 'block', width: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                    <img src="/images/dirty2.webp" alt="hero" style={{ display: 'block', width: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                    <img src="/images/Nike_Airmax_day_1960_740_V.webp" alt="hero" style={{ display: 'block', width: '100%', objectFit: 'cover' }} />
                </div>
            </Slider>
        </>
    )
}