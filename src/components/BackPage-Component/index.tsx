//Importações
import { useNavigate } from "react-router-dom";

//Estilização
import "./style.css";

//Icones
import { FiArrowLeft } from "react-icons/fi";

//Props
interface Props {
    title?: string,
    pagesStyem?: boolean
}

export const BackPage: React.FC<Props> = ({title, pagesStyem}) => {
    const navigate = useNavigate();

    return(
        <div className={pagesStyem ? "backPage-component" : "backPage"} onClick={() => navigate(-1)}>
            <div className="backPage-Icon">
                <FiArrowLeft/>
            </div>

            <div className="backPage-Title">
                <h4>{title ? title : "Voltar"}</h4>
            </div>
        </div>
    )
}