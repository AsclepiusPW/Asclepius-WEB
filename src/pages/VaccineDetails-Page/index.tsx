//Importações
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { VaccineDTO } from "../../types/vaccineTypes";
import { EventVaccinationCalendarDTO } from "../../types/eventVaccinationCalendar";
import "./style.css";
import { useVaccine } from "../../Contexts/VaccineContext";
import { useEvent } from "../../Contexts/EventContext";
import videoConferencia from "../../assets/Icons/videoconferencia.png";
import { MdVaccines } from "react-icons/md";
import { Header } from "../../components/Header-Component";
import { BackPage } from "../../components/BackPage-Component";
import { LoadingDatasComponent } from "../../components/LoadingDatas-Component";
import { NotFoundDatas } from "../../components/NotFoundDatas-Component";
import { OptionsDoctorsSlider } from "../../Sliders/OptionsDoctors-slider";
import { Footer } from "../../components/Footer-Component";
import { EventComponent } from "../../components/Event-Component";
import { VaccineComponent } from "../../components/Vaccine-Component";

export const VaccineDetailsPage = () => {
  const { allVaccines } = useVaccine();
  const { allEvents } = useEvent();
  const [vaccine, setVaccine] = useState<VaccineDTO>();
  const [vaccines, setVaccines] = useState<VaccineDTO[]>();
  const [event, setEvent] = useState<EventVaccinationCalendarDTO[]>();
  const [loadignVaccine, setLoadingVaccine] = useState<boolean>(false);
  const [loadingEvent, setLoadingEvent] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (() => {
      if (!allVaccines || !id) return;

      toast.loading("Buscando vacina...");
      setLoadingVaccine(true);
      const vaccine = allVaccines.find((vaccine) => vaccine.id === id);
      toast.dismiss();
      if (!vaccine) return toast.error("Vacina não encontrada");
      setVaccine(vaccine);
      toast.success("Vacina encontrada");
      setLoadingVaccine(false);
    })();
  }, [id, allVaccines]);

  useEffect(() => {
    (() => {
      if (!vaccine || !allEvents) return;

      toast.loading("Buscando eventos com essa vacina...");
      setLoadingEvent(true);
      const events = allEvents.filter((event) => event.idVaccine === id);
      toast.dismiss();
      if (!events)
        return toast.info("Não há eventos disponíveis para essa vacina.");
      setEvent(events);
      toast.success("Eventos encontrados");
      setLoadingEvent(false);
    })();
  }, [vaccine, allEvents]);

  return (
    <div
      className="container flex apresentation vaccineDetailsScreen"
      id="vaccineDetails"
    >
      <Header
        searchVisibility={true}
        actionPage="Vaccine"
        titleMenu={vaccine?.name || "Detalhes da Vacina"}
      />
      <div className="vaccineDetails-apresentation flex">
        {loadignVaccine ? <LoadingDatasComponent /> : <NotFoundDatas />}
      </div>
      <div className="sectionSlidersPages flex">
        <OptionsDoctorsSlider />
      </div>
      <Footer systemPages={true} />
    </div>
  );
};
