//Importações
import { useNavigate } from "react-router-dom";

//Estilização
import "./style.css";

//Imagens
import userDefault from "../../assets/UserDefault.jpg";
import influenciador from '../../assets/Icons/influenciador.png';

//Contextos
import { useUser } from "../../Contexts/UserContext";

//Class
export const InformationsProfile = () => {
    //Navegação
    const navigate = useNavigate();

    //Definindo o contexto
    const { user, profileImage } = useUser();

    return (
        <div className="informationsProfile-container flex" id="informationsProfile-container">
            <div className="containerApresentation-icon flex">
                <img src={influenciador} alt="Influenciador" className="apresenatation-icon"/>
                <h2 className="apresentation-title">
                    Informações pessoais
                </h2>
            </div>

            <div className="apresentationContainer-user flex">
                <img src={ profileImage ? profileImage : userDefault} alt="Imagem de perfil" className="containerUser-image" />
            
                <div className="apresentationContent flex">
                    <button className="button-opacity" onClick={() => {navigate("/edit")}}>
                        Editar perfil
                    </button>

                    <h2 className="containerUser-title">
                        {user ? user.name : "Nome de usuário"}
                    </h2>

                    <h3 className="containerUser-details">Telefone: <span>{user ? user.telefone : "Não informado"}</span></h3>
                    <h3 className="containerUser-details">E-mail: <span>{user ? user.email : "Não informado"}</span></h3>
                </div>
            </div>
        </div>
    )
}