//Importações
import { useNavigate } from "react-router-dom";

//Utils
import { formatStatusRequest } from "../../Utils/statusRequest";
import { formatDate } from "../../Utils/formatDate";

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
    //Definindo navegação
    const navigate = useNavigate();

    //Função
    const getStatusClass = (status?: string) => {
        switch (status) {
            case "Pending":
                return "status-pending";
            case "Approved":
                return "status-approved";
            case "Rejected":
                return "status-rejected";
            default:
                return "status-pending";
        }
    };

    return (
        <div
            className="request-vaccination-container flex" >
            <div className="request-vaccination-header flex">
                <h3 className="request-vaccination-title">{calendar ? calendar.calendar.local : "Hospital Corréia Saraiva"}</h3>
                <button className="request-vaccination-seeMore flex"><MdChecklist /> Ver Mais</button>
            </div>

            <div className="request-vaccination-details flex">
                <h4 className="request-vaccination-details-item">
                    <MdMedicalInformation /> Vacina:
                    <span>
                        {calendar ? calendar.calendar.vaccine.name : "Sem vacina"}
                    </span>
                </h4>

                <h4 className="request-vaccination-details-item">
                    <MdMedicalInformation /> Data:
                    <span>
                        {calendar ? formatDate(calendar.calendar.date) : "00/00/0000"}
                    </span>
                </h4>

                <h4 className={`request-vaccination-details-item ${calendar ? getStatusClass(calendar.calendar.status) : "status-pending"}`}>
                    <MdMedicalInformation /> Solicitação da reserva:
                    <span>
                        {calendar ? formatStatusRequest(calendar.calendar.status) : "Não respondido"}
                    </span>
                </h4>
            </div>
        </div>
    )
};