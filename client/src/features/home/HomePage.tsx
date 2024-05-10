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
                    <img src="/images/nen1.jpg" alt="hero" style={{ display: 'block', width: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                    <img src="/images/download.jfif" alt="hero" style={{ display: 'block', width: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                    <img src="/images/dirty2.webp" alt="hero" style={{ display: 'block', width: '100%', objectFit: 'cover' }} />
                </div>
            </Slider>
        </>
    )
}