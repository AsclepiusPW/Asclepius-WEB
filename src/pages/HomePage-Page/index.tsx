//Importações

//Estilização
import "./style.css";

//Componentes
import { Header } from "../../components/Header-Component";
import { Footer } from "../../components/Footer-Component";
import { OptionsDoctorsSlider } from "../../Sliders/OptionsDoctors-slider";

//Class
export function HomePage() {
    return (
        <div className="container flex apresentation HomeScreen" id="homePage">
            <Header userVisibility={false} actionPage="Home" />

            <Footer systemPages={true}/>
        </div>
    );
};