//Importações
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importar estilos do Leaflet
import L from "leaflet";

//Estilização
import "./style.css";

//Types
import { EventVaccinationCalendarDTO } from "../../types/eventVaccinationCalendar";

//Icones
import { MdMedicalInformation } from "react-icons/md";

//Utils
import { formatDate } from "../../Utils/formatDate";
import { formatStatusEvent } from "../../Utils/statusRequest";

//Contextos
import { useEvent } from "../../Contexts/EventContext";

//Props
interface EventCardProps {
    event: EventVaccinationCalendarDTO;
}

// Criar um ícone personalizado para o marcador
const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/64/684/684908.png", // Ícone de marcador (pode trocar por outro)
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

//Class
export const EventComponent = ({ event }: EventCardProps) => {
    //Definindo o contexto
    const { handleRequestEvent } = useEvent();

    //Defenir navegação
    const navigate = useNavigate();

    // Verificar se latitude e longitude são válidas
    const isValidLocation = event.latitude && event.longitude && !isNaN(Number(event.latitude)) && !isNaN(Number(event.longitude));

    return (
        <div className="eventComponent flex">
            <div className="eventComponent-map">
                {isValidLocation ? (
                    <MapContainer
                        center={[Number(event.latitude), Number(event.longitude)]}
                        zoom={15}
                        style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                        dragging={false} // Impede arrastar
                        touchZoom={false} // Impede zoom por toque
                        scrollWheelZoom={false} // Impede zoom pelo scroll do mouse
                        doubleClickZoom={false} // Impede zoom por duplo clique
                        boxZoom={false} // Impede zoom por seleção de área
                        keyboard={false} // Impede interação via teclado
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[Number(event.latitude), Number(event.longitude)]} icon={customIcon}>
                            <Popup>
                                <b>{event.local}</b>
                                <br />
                                Data: {formatDate(event.date)}
                            </Popup>
                        </Marker>
                    </MapContainer>
                ) : (
                    <p>Localização não disponível</p>
                )}
            </div>

            <div className="eventComponent-info flex">
                <h1 className="infoEvent-title">{event.local || " Evento sem local"}</h1>
                <div className="infoEvent-list grid">
                    <p className="infoEventList-item flex">
                        <MdMedicalInformation /> Vacina:
                        <span>{event.vaccine.name || " Evento sem nome"}</span>
                    </p>

                    <p className="infoEventList-item flex">
                        <MdMedicalInformation /> Data:
                        <span>{formatDate(event.date) || " 00/00/0000"}</span>
                    </p>

                    <p className="infoEventList-item flex">
                        <MdMedicalInformation /> Status:
                        <span>{formatStatusEvent(event.status) || " Sem status"}</span>
                    </p>

                    <p className="infoEventList-item flex">
                        <MdMedicalInformation /> Vagas:
                        <span>{event.requestReservation ? event.requestReservation.length : 0}/<b>{event.places || 0}</b></span>
                    </p>
                </div>
            </div>

            <div className="eventComponents-buttons flex">
                <button className="button-opacity" onClick={() => navigate(`/event/${event ? event.id : ""}`)}>Ver mais informações</button>
                <button className="button-totality" onClick={() => handleRequestEvent(event.id)}>Agendar vaga</button>
            </div>
        </div>
    )
}