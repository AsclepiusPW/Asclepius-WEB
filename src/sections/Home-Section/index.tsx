//Estilização
import "./style.css";

//Ícones
import asideHome from "../../assets/Apresentation-LeadingPage.png";
import scroll from "../../assets/scroll.svg";

//Definindo class
export const HomeSection = () => {
    return (
        <section className="leadingAside-home flex section" id="leading-home">
            <div className="asideHome-content flex">
                <p className="contentText-text">
                    Gerencie seu registro de vacinação
                </p>

                <h1 className="contentTitle-title">
                    Tornar os cuidados da <br /> <span>Saúde</span> <br /> acessíveis a todos
                </h1>

                <p className="contentText-description">
                    Realize o seu cadastro e fique por dentro das vacinas e calendários de vacinação disponível em sua região.
                </p>

                <div className="contentBox flex">
                    <button className="button contentBox-button"><a href="#leading-login">Login</a></button>

                    <div className="contentBox-scroll flex">
                        <img src={scroll} alt="Scroll" className="scrollBox" />
                        <span className="scrollBox">Scrool Down</span>
                    </div>
                </div>
            </div>

            <div className="asideHome-image">
                <img src={asideHome} alt="Apresentação" />
            </div>
        </section>
    )
};