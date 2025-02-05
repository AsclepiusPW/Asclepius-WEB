//Importações

//Estilização
import "./style.css";

//Types
import { RequestReservationDTO } from "../../types/requestResevationTypes";

//ícones
import { MdChecklist, MdMedicalInformation } from "react-icons/md";

//Props
interface Props {
    calendar: RequestReservationDTO | undefined;
}

//Class
export function RequestVaccinationComponent({ calendar }: Props) {
    return (
        <div className="request-vaccination-container flex">
            <div className="request-vaccination-header flex">
                <h3 className="request-vaccination-title">{calendar ? calendar.calendar.local : "Hospital Corréia Saraiva"}</h3>
                <button className="request-vaccination-seeMore flex"><MdChecklist /> Ver Mais</button>    
            </div>

            <div className="request-vaccination-details flex">
                <h4 className="request-vaccination-details-item">
                    <MdMedicalInformation/> Vacina: 
                        <span>
                            {calendar ? calendar.calendar.vaccine.name : "Sem vacina"}
                        </span>
                </h4>
                
                <h4 className="request-vaccination-details-item">
                    <MdMedicalInformation/> Data: 
                        <span>
                            {calendar ? calendar.calendar.date : "00/00/0000"}
                        </span>
                </h4>
                                
                <h4 className="request-vaccination-details-item">
                    <MdMedicalInformation/> Solicitação da reserva: 
                        <span>
                            {calendar ? calendar.calendar.status : "Não respondido"}
                        </span>
                </h4>
            </div>
        </div>
    )
};