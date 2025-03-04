//Importações
import { useNavigate } from "react-router-dom";

//Estilização
import "./style.css";

//Imagens
import vacina from "../../assets/Icons/vacina.png";

//Icones
import { MdMedicalInformation } from "react-icons/md";

//Types
import { VaccineDTO } from "../../types/vaccineTypes";

//Props
type Props = {
    vaccine: VaccineDTO | undefined;
}   

//Class
export const VaccineComponent = ({ vaccine }: Props) => {
    //Definindo navegação
    const navigate = useNavigate();

    return (
        <div className="vaccine-component flex">
            <h3 className="vaccine-title">
                Vacina: 
                    <span>
                        {vaccine ? vaccine.name: " Vacina sem nome"}
                    </span>
            </h3>
            
            <div className="vaccine-container flex">
                <img 
                    src={vacina} 
                    alt="Vacina" 
                    className="vaccine-icon" 
                />

                <div className="vaccine-content flex">
                    <p className="vaccine-details">
                       <MdMedicalInformation/> Fabricante: 
                            <span>
                                {vaccine ? vaccine.manufacturer : " Sem fabricante"}
                            </span>
                    </p>
                    <p className="vaccine-details">
                        <MdMedicalInformation/> Tipo: 
                            <span>
                                {vaccine ? vaccine.type : " Sem tipo"}
                            </span> 
                    </p>
                </div>
            </div>

            <p className="vaccine-description">
                <MdMedicalInformation/> Descrição:
                    <span>
                        {vaccine ? vaccine.description : " Vacina sem descrição."}
                    </span>
            </p>
 
            <div className="vaccine-buttons flex">
                <button className="button-opacity" onClick={() => {navigate("/event")}}>Eventos de Vacinação</button>

                <button className="button-totality" onClick={() => {navigate(`/vaccine/${vaccine ? vaccine.id : ""}`)}}>Informações</button>
            </div>
        </div>
    )
}