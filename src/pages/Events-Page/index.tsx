//Importações
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

//Estilização
import "./style.css";

//Componentes
import { Header } from "../../components/Header-Component";
import { OptionsDoctorsSlider } from "../../Sliders/OptionsDoctors-slider";
import { Footer } from "../../components/Footer-Component";

//Types
import { EventVaccinationCalendarDTO } from "../../types/eventVaccinationCalendar";
import { FilterSearch } from "../../components/FilterSearch-Component";

//Class
export const EventsPages = () => {
    //Defininfo funções do contexto
    const allEvents:EventVaccinationCalendarDTO[] = [];

    //State
    const [allListEvents, setAllListEvents] = useState<EventVaccinationCalendarDTO[]>();
    const [visibleEvents, setVisibleEvents] = useState<EventVaccinationCalendarDTO[]>();
    const [filter, setFilter] = useState<string>("");

    //Effect
    useEffect(() => {
        (() => {
            setAllListEvents(allEvents);
            setVisibleEvents(allEvents);
        })();
    }, [allEvents]);

    useEffect(() => {
        (() => {
            if (filter !== "") {
                
            }
        })();
    }, [filter]);

    //Funções
    const handleSearch = (query: string) => {
        if (query === "") {
            setVisibleEvents(allListEvents);
        } else {
            setVisibleEvents(allListEvents?.filter(event => event.local.toLowerCase().includes(query.toLowerCase())));
        }
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
                    buttonActionFilterOne={() => {}}
                    buttonActionFilterThree={() => {}}
                    buttonActionFilterTwo={() => {}}
                    functionFilter={() => {}}
                />

                <div className="gridListAllEvents flex">
                    <div className="listAllEventsTitle flex">
                        <h3 className="titleEvents">Eventos que acontentceram na sua cidade</h3>

                        <p className="numericEvents">{allListEvents?.length || 0} eventos encontrados</p>
                    </div>

                    <div className="listEvents grid">
                    </div>
                </div>

                <OptionsDoctorsSlider />
                <Footer systemPages={true} />
            </div>
        </div>
    )
}