//Importações
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Estilização
import "./style.css";

//Componentes
import { Header } from "../../components/Header-Component";
import { ApresentationSystemSlider } from "../../Sliders/ApresentationSystem-slider";
import { OptionsDoctorsSlider } from "../../Sliders/OptionsDoctors-slider";
import { EventComponent } from "../../components/Event-Component";
import { Footer } from "../../components/Footer-Component";

//Icones
import { TbVaccine } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { FaRegCalendarCheck } from "react-icons/fa";

//Types
import { EventVaccinationCalendarDTO } from "../../types/eventVaccinationCalendar";
import { RequestReservationDTO } from "../../types/requestResevationTypes";

//Datas
interface ourServices {
    id: string;
    icon: JSX.Element;
    title: string;
    description: string;
}

//Data exempla
export const ourServicesData: ourServices[] = [
    {
        id: "1",
        icon: <TbVaccine />,
        title: "Vacinas",
        description: "+ 15 mil",
    },
    {
        id: "2",
        icon: <FaUserDoctor />,
        title: "Médicos",
        description: "+ 10 mil"
    },
    {
        id: "3",
        icon: <GrMapLocation />,
        title: "Cidades",
        description: "+ 12 mil",
    },
    {
        id: "4",
        icon: <FaRegCalendarCheck />,
        title: "Eventos",
        description: "+ 18 mil"
    }
];

//Contextos
import { useEvent } from "../../Contexts/EventContext";
import { useUser } from "../../Contexts/UserContext";
import { RequestVaccinationComponent } from "../../components/RequestVaccination-Component";
import { scrollToId } from "../../Utils/scrollFunctions";
import { NotFoundDatas } from "../../components/NotFoundDatas-Component";

//Class
export function HomePage() {
    //Definindo o contexto
    const {allEvents} = useEvent();
    const {user} = useUser();
    
    //States
    const [maximized, setMaximinized] = useState<boolean>(true);
    const [latestedvents, setLastedEvents] = useState<EventVaccinationCalendarDTO[]>();
    const [latestedRequests, setLastedRequests] = useState<RequestReservationDTO[]>();

    //Definindo o useNavigate
    const navigate = useNavigate();

    //Effect 
    useEffect(() => {
        if (allEvents) {
            setLastedEvents(allEvents.reverse().slice(0, 4));
        }
    },[allEvents]);

    useEffect(() => {
        if (user?.requestReservation?.length) {
            setLastedRequests([...user.requestReservation].reverse().slice(0, 4));
        }
        scrollToId("homePage");
    }, [user]);    

    return (
        <div className="container flex apresentation HomeScreen" id="homePage">
            <Header userVisibility={false} actionPage="Home" setAlterFather={setMaximinized} />

            <div className={maximized ? "homePage-apresentation flex margim-maxinized" : "margim-minimized homePage-apresentation flex"}>
                <div className="ourServices-apresentation flex">
                    <h2>Nossos serviços</h2>

                    <div className="ourServices-list flex">
                        {ourServicesData.map((services) => (
                            <div className="ourService-item flex" key={services.id}>
                                <p className="service-icon">{services.icon}</p>
                                <h5 className="service-title">{services.title}</h5>
                                <p className="service-description">{services.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ourServices-apresentation flex">
                    <h2>Apresentação</h2>

                    <div className="apresentation-slider flex">
                        <ApresentationSystemSlider/>
                    </div>
                </div>

                <div className="listLatestedEvents flex">
                    <div className="listLatestedEvents-title flex">
                        <h2>Eventos recentes</h2>
                        <button className="button-opacity" onClick={() => navigate("/events")}>Ver mais</button>
                    </div>

                    {latestedvents && latestedvents?.length > 0 ? (
                        <div className="listLatestedEvents-list grid">
                            {latestedvents?.map((event) => (
                                <EventComponent event={event} key={event.id} />
                            ))}
                        </div>
                    ) : (
                        <NotFoundDatas title="Nenhum evento encontrado"/>
                    )}
                </div>

                {latestedRequests && latestedRequests.length > 0 && (
                    <div className="listLatestedEvents flex">
                        <div className="listLatestedEvents-title flex">
                            <h2>Suas últimas solicitações</h2>
                            <button className="button-opacity" onClick={() => navigate("/requestVaccination")}>Ver mais</button>
                        </div>

                        {user && user?.requestReservation.length > 0 ? (
                            <div className="listLatestedEvents-list grid">
                                {latestedRequests?.map((request) => (
                                        <RequestVaccinationComponent calendar={request} key={request.id} />
                                ))}
                            </div>
                        ) : (
                            <NotFoundDatas/>
                        )}
                    </div>
                )}

                <div className="ourServices-apresentation flex">
                    <h2>Opiniões dos nossos médicos</h2>

                    <OptionsDoctorsSlider/>
                </div>
            </div>

            <Footer systemPages={true} />
        </div>
    );
};