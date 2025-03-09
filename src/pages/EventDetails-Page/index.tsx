//Importações
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importar estilos do Leaflet
import L from "leaflet";

//Types
import { EventVaccinationCalendarDTO } from "../../types/eventVaccinationCalendar";

//Styles
import "./style.css";

//Contextos
import { useEvent } from "../../Contexts/EventContext";

//Componentes
import { Header } from "../../components/Header-Component";
import { BackPage } from "../../components/BackPage-Component";
import { LoadingDatasComponent } from "../../components/LoadingDatas-Component";
import { NotFoundDatas } from "../../components/NotFoundDatas-Component";
import { EventComponent } from "../../components/Event-Component";
import { Footer } from "../../components/Footer-Component";

//Icones
import { MdVaccines } from "react-icons/md";

//Utils
import { formatStatusEvent } from "../../Utils/statusRequest";
import { formatDate } from "../../Utils/formatDate";
import { OptionsDoctorsSlider } from "../../Sliders/OptionsDoctors-slider";
import { scrollToId } from "../../Utils/scrollFunctions";

// Criar um ícone personalizado para o marcador
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/64/684/684908.png", // Ícone de marcador (pode trocar por outro)
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

//Class
export const EventDetailsPage = () => {
  //Definindo o contexto
  const { allEvents, handleRequestEvent } = useEvent();

  //Definindo o navigate
  const navigate = useNavigate();

  //State
  const [event, setEvent] = useState<EventVaccinationCalendarDTO>();
  const [loading, setLoading] = useState<boolean>(false);

  //Pegando o id da Url
  const { id } = useParams<{ id: string }>();

  // Verificar se latitude e longitude são válidas
  const isValidLocation =
    event?.latitude &&
    event?.longitude &&
    !isNaN(Number(event?.latitude)) &&
    !isNaN(Number(event?.longitude));

  //UseEffect
  useEffect(() => {
    (() => {
      if (!allEvents || !id) return;

      //Encontrando a vacina
      setLoading(true);
      toast.loading("Buscando evento...");
      const event = allEvents.find((event) => event.id === id);
      toast.dismiss();
      if (!event) return toast.error("Evento não encontrado");
      setEvent(event);
      toast.success("Evento encontrado");
      setLoading(false);
    })();
  }, [id, allEvents]);

  useEffect(() => {
    scrollToId("eventDetails");
  }, []);

  return (
    <div
      className="container flex apresentation eventDetailsScreen"
      id="eventDetails"
    >
      <Header
        searchVisibility={true}
        actionPage="Event"
        titleMenu={event?.local || "Detalhes do Evento"}
      />

      <div className="eventDetails-apresentation flex">
        <BackPage title="Voltar" pagesStyem={true} />
        {loading ? (
          <LoadingDatasComponent />
        ) : event ? (
          <>
            <div className="eventDetailsHeader flex">
              <div className="eventDetailsHeader-map">
                {isValidLocation ? (
                  <MapContainer
                    center={[Number(event.latitude), Number(event.longitude)]}
                    zoom={15}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                    }}
                    dragging={false} // Impede arrastar
                    touchZoom={false} // Impede zoom por toque
                    scrollWheelZoom={false} // Impede zoom pelo scroll do mouse
                    doubleClickZoom={false} // Impede zoom por duplo clique
                    boxZoom={false} // Impede zoom por seleção de área
                    keyboard={false} // Impede interação via teclado
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker
                      position={[
                        Number(event.latitude),
                        Number(event.longitude),
                      ]}
                      icon={customIcon}
                    >
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

              <div className="eventDetails-info flex">
                <h2 className="eventDetails-local">
                  Local:
                  <span>{event?.local || "Sem local definido"}</span>
                </h2>

                <button
                  className="button-totality"
                  onClick={() => handleRequestEvent(event?.id || "")}
                >
                  Agendar Vaga
                </button>
              </div>

              <div className="eventDetails-list flex">
                <p className="listInfo-item">
                  <MdVaccines /> Status:
                  <span>
                    {formatStatusEvent(event?.status) || "Sem status definido"}
                  </span>
                </p>

                <p className="listInfo-item">
                  <MdVaccines /> Data:
                  <span>
                    {formatDate(event?.date || "") || "Sem data definida"}
                  </span>
                </p>

                <p className="listInfo-item">
                  <MdVaccines /> Responsável:
                  <span>
                    {event?.responsible || "Sem responsável definido"}
                  </span>
                </p>

                <p className="listInfo-item">
                  <MdVaccines /> Vagas:
                  <span>
                    {event?.requestReservation?.length || "0"}/
                    <b>{event?.places || "0"}</b>
                  </span>
                </p>
              </div>
            </div>

            {event?.observation &&
              !event.observation
                .toLowerCase()
                .includes("Observation not informed".toLowerCase()) && (
                <div className="eventDetails-observation flex">
                  <h2>
                    <MdVaccines /> Observação:
                  </h2>
                  <p>{event.observation || "Sem descrição definida"}</p>
                </div>
              )}

            <div className="eventDetails-vaccine flex">
              <div className="eventVaccine-title flex">
                <h2>
                  Vacina:{" "}
                  <span>{event?.vaccine.name || "Sem vacina definida"}</span>
                </h2>
                <button
                  className="button-opacity"
                  onClick={() => navigate(`/vaccine/${event?.vaccine.id}`)}
                >
                  Mais Informações
                </button>
              </div>

              <div className="eventVaccineDescription-list flex">
                <p className="descriptionListVaccine-item">
                  <MdVaccines /> Fabricante:
                  <span>
                    {event?.vaccine.manufacturer || "Sem fabricante definido"}
                  </span>
                </p>

                <p className="descriptionListVaccine-item">
                  <MdVaccines /> Descrição:
                  <span>
                    {event?.vaccine.description || "Sem tipo definido"}
                  </span>
                </p>

                <p className="descriptionListVaccine-item">
                  <MdVaccines /> Contra Indicação:
                  <span>
                    {event?.vaccine.contraIndication ||
                      "Sem contra indicação definida"}
                  </span>
                </p>
              </div>
            </div>

            <div className="eventDetails-events flex">
              <h2>Eventos relacionados</h2>
              <div className="eventRelationsList grid">
                {loading ? (
                  <LoadingDatasComponent />
                ) : (
                  allEvents
                    .slice(0, 2)
                    .map((event, index) => (
                      <EventComponent key={index} event={event} />
                    ))
                )}
              </div>
            </div>
          </>
        ) : (
          <NotFoundDatas />
        )}
      </div>

      <div className="sectionSlidersPages flex">
        <OptionsDoctorsSlider />
      </div>

      <Footer systemPages={true} />
    </div>
  );
};
