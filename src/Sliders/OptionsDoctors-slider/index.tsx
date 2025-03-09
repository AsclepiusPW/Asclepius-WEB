//Importações
import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

//Import Swiper styles

// import required modules
import { Autoplay, Navigation, EffectFade, Pagination } from 'swiper/modules';

//Estlização
import "./style.css";

//Types
import { optionsDoctorsData } from '../../types/optionsDoctors';

//Componente
import { OptionDoctor } from '../../components/OptionDoctor-Component';

//Props
interface props {
    delay?: number,
    navigation?: boolean,
}


export const OptionsDoctorsSlider: React.FC<props> = ({ delay, navigation }) => {
    return (
        <div className="SliderSwiper">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: delay || 5500,
                    disableOnInteraction: false,
                }}
                navigation={navigation || false}
                pagination={true}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={3000}
                modules={[Autoplay, Navigation, EffectFade, Pagination]}
                className="mySwiper"
            >
                {optionsDoctorsData.map((doctor, index) => (
                    <SwiperSlide key={index}>
                        <OptionDoctor option={doctor} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}