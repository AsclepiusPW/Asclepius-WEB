//Importações
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

//Estilização
import "./style.css";

//Componentes
import { Header } from "../../components/Header-Component";
import { EventComponent } from "../../components/Event-Component";
import { OptionsDoctorsSlider } from "../../Sliders/OptionsDoctors-slider";
import { Footer } from "../../components/Footer-Component";

//Types
import { EventVaccinationCalendarDTO } from "../../types/eventVaccinationCalendar";
import { FilterSearch } from "../../components/FilterSearch-Component";

//Services
import { findAllEvents } from "../../Services/EventServices";

//Icons
import { GrPrevious, GrNext } from "react-icons/gr";

//Contextos
import { useUser } from "../../Contexts/UserContext";
import { useEvent } from "../../Contexts/EventContext";

//Utils
import { scrollToEvents } from "../../Utils/scrollFunctions";
import { set } from "react-hook-form";

//Class
export const EventsPages = () => {
  //Definindo o contexto
  const { user } = useUser();
  const { allEvents } = useEvent();

  //State
  const [allListEvents, setAllListEvents] =
    useState<EventVaccinationCalendarDTO[]>();
  const [visibleEvents, setVisibleEvents] =
    useState<EventVaccinationCalendarDTO[]>();
  const [currentPage, setCurrentPage] = useState(0);

  //Effect
  useEffect(() => {
    (() => {
      setAllListEvents(allEvents);
      setVisibleEvents(allEvents);
    })();
  }, [allEvents]);

  //Controle de listagem de vacinas
  useEffect(() => {
    if (!allListEvents) return;

    //Ordenando o array
    const sortedVaccines = [...allListEvents].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const startIndex = currentPage * 4; // Índice inicial do bloco
    const endIndex = startIndex + 4; // Índice final do bloco
    const currentVaccines = sortedVaccines.slice(startIndex, endIndex);

    setVisibleEvents(currentVaccines);
  }, [currentPage, allListEvents]);

  //Funções
  const handleNext = () => {
    if (!allListEvents) return;

    if ((currentPage + 1) * 4 < allListEvents.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSearch = (query: string) => {
    if (query === "") {
      setVisibleEvents(allListEvents);
    } else {
      setVisibleEvents(
        allListEvents?.filter((event) =>
          event.local.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Raio da Terra em km
    const toRad = (value:number) => (value * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
};

const handleFilterForGeolocation = () => {
    if (!user || !allListEvents) return;

    const { latitude: userLat, longitude: userLng } = user;

    const filteredEvents = allListEvents.filter((event) => {
        if (event.latitude == null || event.longitude == null) return false;
        const distance = haversineDistance(userLat, userLng, parseFloat(event.latitude), parseFloat(event.longitude));
        return distance < 1000;
    });

    console.log("Filtered events:", filteredEvents);

    setVisibleEvents(filteredEvents);
    scrollToEvents();
};


  const handleFilterForThisMounth = () => {
    if (!allListEvents) return;

    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7); // "YYYY-MM"

    const filteredEvents = allListEvents.filter((event) =>
      event.date.startsWith(currentMonth)
    );

    setVisibleEvents(filteredEvents);
    scrollToEvents();
  };

  const handleFilterForNextMonth = () => {
    if (!allListEvents) return;

    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const nextMonthStr = nextMonth.toISOString().slice(0, 7); // "YYYY-MM"

    const filteredEvents = allListEvents.filter((event) =>
      event.date.startsWith(nextMonthStr)
    );

    setVisibleEvents(filteredEvents);
    scrollToEvents();
  };

  const handleFilterForName = (query: string) => {
    if (!allListEvents) return;

    const filteredEvents = allListEvents.filter((event) =>
      event.local.toLowerCase().includes(query.toLowerCase())
    );

    setVisibleEvents(filteredEvents);
    scrollToEvents();
  };

  return (
    <div className="container flex apresentation eventScreen" id="eventScreen">
      <Header
        searchVisibility={true}
        actionPage="Event"
        titleMenu="Eventos cadastrados"
        functionSearch={handleSearch}
      />

      <div className="apresentationContainer flex">
        <FilterSearch
          filterEntity="Event"
          buttonActionFilterOne={handleFilterForGeolocation}
          buttonActionFilterTwo={handleFilterForThisMounth}
          buttonActionFilterThree={handleFilterForNextMonth}
          functionFilter={handleFilterForName}
        />

        <div className="gridListAllEvents flex">
          <div className="listAllEventsTitle flex">
            <h3 className="titleEvents">
              Eventos que aconteceram na sua cidade
            </h3>

            <p className="numericEvents">
              {allListEvents?.length || 0} eventos encontrados
            </p>
          </div>

          <div className="listEvents grid" id="listEvents">
            {visibleEvents?.map((event, index) => (
              <EventComponent key={index} event={event} />
            ))}
          </div>

          {allListEvents && allListEvents.length > 0 && (
            <div className="navigation-buttons flex">
              <button
                onClick={handlePrev}
                className="prev-button flex"
                disabled={currentPage === 0}
              >
                <GrPrevious />
                Anterior
              </button>

              <p className="button-description">
                {currentPage * 4 + 1} -{" "}
                {Math.min((currentPage + 1) * 4, allListEvents.length)} de{" "}
                {allListEvents.length}
              </p>

              <button
                onClick={handleNext}
                className="next-button flex"
                disabled={(currentPage + 1) * 4 >= allListEvents.length}
              >
                Próximo
                <GrNext />
              </button>
            </div>
          )}
        </div>

        <OptionsDoctorsSlider />
        <Footer systemPages={true} />
      </div>
    </div>
  );
};
