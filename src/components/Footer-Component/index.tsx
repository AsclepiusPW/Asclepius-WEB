//Importações

//Imagens
import logo from "../../assets/logo.png";

//Estilização
import "./style.css";

//Props
interface Props {
    systemPages?: boolean;
}

//Definindo classes
export const Footer = ({systemPages}: Props) => {
    return(
        <footer className="footerPage flex">

            <img src={logo} alt="Asclepius Ltmd." className="footerPage-logo" />

            {systemPages ? (
                <ul className="footerPage-list flex">
                <li className="footerPage-item">
                    <a href="">Home</a>
                </li>

                <li className="footerPage-item">
                    <a href="">Vacinas</a>
                </li>

                <li className="footerPage-item">
                    <a href="">Eventos</a>
                </li>

                <li className="footerPage-item">
                    <a href="">Perfil</a>
                </li>
            </ul>
            ) : (
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
            )}
        </footer>
    )
}