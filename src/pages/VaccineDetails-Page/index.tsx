//Importações
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

//Types
import { VaccineDTO } from "../../types/vaccineTypes";
import { EventVaccinationCalendarDTO } from "../../types/eventVaccinationCalendar";

//Styles
import "./style.css";

//Contextos
import { useVaccine } from "../../Contexts/VaccineContext";
import { useEvent } from "../../Contexts/EventContext";

//Imagens
import videoConferencia from "../../assets/Icons/videoconferencia.png";

//Icones
import { MdVaccines } from "react-icons/md";

//Componentes
import { Header } from "../../components/Header-Component";
import { BackPage } from "../../components/BackPage-Component";
import { LoadingDatasComponent } from "../../components/LoadingDatas-Component";
import { NotFoundDatas } from "../../components/NotFoundDatas-Component";
import { OptionsDoctorsSlider } from "../../Sliders/OptionsDoctors-slider";
import { Footer } from "../../components/Footer-Component";
import { EventComponent } from "../../components/Event-Component";
import { VaccineComponent } from "../../components/Vaccine-Component";

//Class
export const VaccineDetailsPage = () => {
  //Definindo o contexto
  const { allVaccines } = useVaccine();
  const { allEvents } = useEvent();

  //State
  const [vaccine, setVaccine] = useState<VaccineDTO>();
  const [vaccines, setVaccines] = useState<VaccineDTO[]>();
  const [event, setEvent] = useState<EventVaccinationCalendarDTO[]>();
  const [loadignVaccine, setLoadingVaccine] = useState<boolean>(false);
  const [loadingEvent, setLoadingEvent] = useState<boolean>(false);

  //Pegando o id da Url
  const { id } = useParams<{ id: string }>();

  //UseEffect
  useEffect(() => {
    (() => {
      if (!allVaccines || !id) return;

      //Encontrando a vacina
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

      //Encontrando os eventos
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

  useEffect(() => {
    (() => {
      if (!vaccine || !allVaccines) return;

      // Filtrando vacinas com o mesmo fabricante da `vaccine` atual
      const vaccinesManufacturer = allVaccines.filter(
        (v) => v.type.toLowerCase() === vaccine.type.toLowerCase()
      );
      setVaccines(vaccinesManufacturer);
    })();
  }, [vaccine, allVaccines]); // Adicionado allVaccines como dependência

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        {loadignVaccine ? (
          <LoadingDatasComponent />
        ) : vaccine ? (
          <>
            <BackPage pagesStyem={true} />
            <div className="vaccineDetailsHeader flex">
              <img
                src={videoConferencia}
                alt="Apresentação"
                className="vaccineDetails-image"
              />

              <div className="vaccineDetails-info flex">
                <h2 className="vaccineDetails-name">
                  Nome:
                  <span>{vaccine?.name || "Nome não encontrado"}</span>
                </h2>
                <h3 className="vaccineDetails-manufacturer">
                  Fabricante:
                  <span>
                    {vaccine?.manufacturer || "Fabrincante nã informado"}
                  </span>
                </h3>
                <h4 className="vaccineDetails-type">
                  Tipo:
                  <span>{vaccine?.type || "Tipo não informado"}</span>
                </h4>
              </div>
            </div>

            <div className="vaccineDetails-description flex">
              <h2>
                <MdVaccines /> Descrição:
              </h2>
              <p>{vaccine?.description || "Descrição não encontrada"}</p>
            </div>

            <div className="vaccineDetails-contraIndication flex">
              <h2>
                <MdVaccines /> Contra indicação:
              </h2>
              <p>
                {vaccine?.contraIndication || "Contra Indicação não encontrada"}
              </p>
            </div>

            {event && (
              <div className="vaccineListEvents flex">
                {loadingEvent ? (
                  <LoadingDatasComponent />
                ) : event ? (
                  <>
                    <h1>Eventos de vacinação</h1>
                    <div className="vaccineDetails-events grid">
                      {event &&
                        event?.map((event, index) => (
                          <EventComponent key={index} event={event} />
                        ))}
                    </div>
                  </>
                ) : (
                  <NotFoundDatas />
                )}
              </div>

            )}

            <div className="vaccineListEvents flex">
              <h1>Vacinas do mesmo tipo</h1>
              <div className="vaccineDetails-vaccine grid">
                {vaccines &&
                  vaccines
                    ?.slice(0, 4)
                    .map((vaccine, index) => (
                      <VaccineComponent key={index} vaccine={vaccine} />
                    ))}
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
