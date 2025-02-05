//Importações

//Estilização
import "./style.css";

//Componentes
import { NavBarLeading } from "../../components/NavBarLeading-Component";
import { ScrollUp } from "../../components/ScrollUp-Component";
import { OptionDoctor } from "../../components/OptionDoctor-Component";
import { Footer } from "../../components/Footer-Component";

//Sections
import { HomeSection } from "../../sections/Home-Section";
import { AboutSection } from "../../sections/About-Section";
import { CreateUserSection } from "../../sections/CreateUser-Section";
import { LoginSection } from "../../sections/Login-Section";

//Types
import { optionsDoctorsData } from "../../types/optionsDoctors";
import { OptionsDoctorsSlider } from "../../Sliders/OptionsDoctors-slider";

//Props

//Definindo classe
export const LeadingPage = () => {
    return(
        <div className="container flex apresentation" id="leading">
            <div className="leadingPage-apresentation flex">
                <NavBarLeading/>

                <HomeSection/>

                <AboutSection/>
                
                <CreateUserSection/>

                <LoginSection/>

                <div className="optionsDoctors flex section" id="leading-review">
                    <div className="sectionSlidersPages">
                        <OptionsDoctorsSlider/>
                    </div>
                </div>

                <Footer/>
            </div>

            <ScrollUp/>
        </div>
    )
}