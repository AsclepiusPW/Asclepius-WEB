//Importações
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { EventVaccinationCalendarDTO } from "../../types/eventVaccinationCalendar";
import "./style.css";
import { useEvent } from "../../Contexts/EventContext";
import { Header } from "../../components/Header-Component";
import { BackPage } from "../../components/BackPage-Component";
import { LoadingDatasComponent } from "../../components/LoadingDatas-Component";
import { NotFoundDatas } from "../../components/NotFoundDatas-Component";
import { EventComponent } from "../../components/Event-Component";
import { Footer } from "../../components/Footer-Component";
import { MdVaccines } from "react-icons/md";
import { formatStatusEvent } from "../../Utils/statusRequest";
import { formatDate } from "../../Utils/formatDate";
import { OptionsDoctorsSlider } from "../../Sliders/OptionsDoctors-slider";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/64/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const EventDetailsPage = () => {
  const { allEvents, handleRequestEvent } = useEvent();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventVaccinationCalendarDTO>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const isValidLocation =
    event?.latitude &&
    event?.longitude &&
    !isNaN(Number(event?.latitude)) &&
    !isNaN(Number(event?.longitude));

  useEffect(() => {
    (() => {
      if (!allEvents || !id) return;

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
            <div className="eventDetailsHeader-map">
              {isValidLocation ? (
                <MapContainer
                  center={[Number(event.latitude), Number(event.longitude)]}
                  zoom={15}
                  style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                  dragging={false}
                  touchZoom={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                  boxZoom={false}
                  keyboard={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    position={[Number(event.latitude), Number(event.longitude)]}
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
