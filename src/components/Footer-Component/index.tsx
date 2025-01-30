//Importações

//Imagens
import logo from "../../assets/logo.png";

//Estilização
import "./style.css";

//Definindo classes
export const Footer = () => {
    return(
        <footer className="footerPage flex">

            <img src={logo} alt="Asclepius Ltmd." className="footerPage-logo" />

            <ul className="footerPage-list flex">
                <li className="footerPage-item">
                    <a href="">Home</a>
                </li>

                <li className="footerPage-item">
                    <a href="">Sobre</a>
                </li>

                <li className="footerPage-item">
                    <a href="">Cadastro</a>
                </li>

                <li className="footerPage-item">
                    <a href="">Login</a>
                </li>
            </ul>
        </footer>
    )
}