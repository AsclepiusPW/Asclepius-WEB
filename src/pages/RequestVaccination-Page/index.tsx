//Importações
import { useState, useEffect } from "react";

//Estilização
import "./style.css";

//Componentes
import { Header } from "../../components/Header-Component";
import { BackPage } from "../../components/BackPage-Component";
import { LoadingDatasComponent } from "../../components/LoadingDatas-Component";
import { InformationsProfile } from "../../components/InformationsProfile-Component";
import { Footer } from "../../components/Footer-Component";
import { OptionsDoctorsSlider } from "../../Sliders/OptionsDoctors-slider";
import { RequestVaccinationComponent } from "../../components/RequestVaccination-Component";
import { NotFoundDatas } from "../../components/NotFoundDatas-Component";
import { RequestReservationDTO } from "../../types/requestResevationTypes";
import { NotFoundSearchItems } from "../../components/NotFoundSearchItems";

//Types
import { UserDTO } from "../../types/userTypes";

//Contextos
import { useUser } from "../../Contexts/UserContext";
import { scrollToId } from "../../Utils/scrollFunctions";

//Class
export const RequestVaccinationPage = () => {
    //Defininfo funções do contexto
    const { user } = useUser();

    //State
    const [userDetails, setUserDetails] = useState<UserDTO | null>();
    const [visibleRequests, setVisibleRequests] = useState<RequestReservationDTO[] | null>();
    const [visibleInformation, setVisibleInformation] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //Effect
    useEffect(() => {
        setIsLoading(true);
        setUserDetails(user);
        setVisibleRequests(user?.requestReservation);
        setIsLoading(false);
    }, [user]);

    useEffect(() => {
        scrollToId("requestVaccination")
    }, []);

    //Função
    const handleSearch = (query: string) => {
        if (query === "") {
            setVisibleRequests(user?.requestReservation);
            setVisibleInformation(true);
        } else {
            setVisibleRequests(user?.requestReservation?.filter(request => request.calendar.local.toLowerCase().includes(query.toLowerCase())));
            setVisibleInformation(false);
            const formElement = document.getElementById('sectionUser-vaccinationRequests');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="container flex apresentation RequestScren" id="requestVaccination">
            <Header
                userVisibility={true}
                actionPage="Profile"
            />

            {isLoading ? (
                <LoadingDatasComponent />
            ) : (
                <>
                    <div className="apresentationRequestVaccination flex">
                        <BackPage title="Voltar" pagesStyem={true} />

                        <h1 className="apresentationContentRequest-title">Solicitações de Vacinação</h1>

                        { visibleInformation && <InformationsProfile />}

                        {userDetails?.requestReservation && userDetails?.requestReservation.length > 0 ? (
                            (visibleRequests && visibleRequests.length > 0 ? (
                                <div className="apresentationListRequests grid" id="sectionUser-vaccinationRequests">
                                    {visibleRequests.map((vaccination, index) => (
                                        <RequestVaccinationComponent
                                            calendar={vaccination}
                                            key={index}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="notFoundItems flex">
                                    <NotFoundSearchItems message="Nenhuma solicitação encontrada" />
                                </div>
                            ))
                        ) : (
                            <div className="notFoundItems">
                                <NotFoundDatas />
                            </div>
                        )}

                    </div>
                </>
            )}

            <div className="sectionSlidersPages flex">
                <OptionsDoctorsSlider />
            </div>

            <Footer systemPages={true} />

        </div>
    );
};