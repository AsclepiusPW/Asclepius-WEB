//Importações

//Estilização
import "./style.css";

//Imagens
import logo from "../../assets/logo.png";
import notFound from "../../assets/notFound.png";

//Props
interface Props {
    title?: string;
}

//Class
export const NotFoundDatas = ({ title }: Props) => {
    return (
        <div className="notFoundDatas-component flex">
            <img src={logo} alt="Logo" className="notFoundDatas-logo" />

            <img src={notFound} alt="Not found" className="notFoundDatas-icon" />

            <h3 className="notFoundDatas-title">{title ? title : "Nenhum dado encontrado..."}</h3>
        </div>
    )
};