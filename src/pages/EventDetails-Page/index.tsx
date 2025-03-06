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
        {loading ? <LoadingDatasComponent /> : <NotFoundDatas />}
      </div>
      <div className="sectionSlidersPages flex">
        <OptionsDoctorsSlider />
      </div>
      <Footer systemPages={true} />
    </div>
  );
};
