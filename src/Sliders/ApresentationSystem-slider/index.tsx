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
import { apresntationSystemData } from '../../types/apresentationSystem';

//Componente
import { ApresentationSystem } from '../../components/Apresentation-Component';

//Props
interface props {
    delay?: number,
    navigation?: boolean,
}


export const ApresentationSystemSlider: React.FC<props> = ({ delay, navigation }) => {
    return (
        <div className="SliderSwiper-system">
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
                className="mySwiper-system"
            >
                {apresntationSystemData.map((apresentation, index) => (
                    <SwiperSlide key={index}>
                        <ApresentationSystem data={apresentation} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}