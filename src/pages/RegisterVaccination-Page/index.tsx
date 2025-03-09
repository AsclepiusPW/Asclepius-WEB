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
import { NotFoundDatas } from "../../components/NotFoundDatas-Component";
import { NotFoundSearchItems } from "../../components/NotFoundSearchItems";

//Types
import { UserDTO } from "../../types/userTypes";

//Contextos
import { useUser } from "../../Contexts/UserContext";
import { VaccinationDTO } from "../../types/vaccinationTypes";
import { RegisterVaccination } from "../../components/RegisterVaccination-Component";
import { scrollToId } from "../../Utils/scrollFunctions";

//Class
export const RegisterVaccinationPage = () => {
    //Defininfo funções do contexto
    const { user } = useUser();

    //State
    const [userDetails, setUserDetails] = useState<UserDTO | null>();
    const [visibleRegister, setVisibleRegisters] = useState<VaccinationDTO[] | null>();
    const [visibleInformation, setVisibleInformation] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //Effect
    useEffect(() => {
        setIsLoading(true);
        setUserDetails(user);
        setVisibleRegisters(user?.vaccination);
        setIsLoading(false);
    }, [user]);

    useEffect(() => {
        scrollToId("requestVaccination")
    },[]);

    //Função
    const handleSearch = (query: string) => {
        if (query === "") {
            setVisibleRegisters(user?.vaccination);
            setVisibleInformation(true);
        } else {
            setVisibleRegisters(user?.vaccination?.filter(register => register.vaccine.name.toLowerCase().includes(query.toLowerCase())));
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
                        <h1 className="apresentationContentRequest-title">Registros de Vacinação</h1>

                        { visibleInformation && <InformationsProfile />}

                        {userDetails?.requestReservation && userDetails?.requestReservation.length > 0 ? (
                            (visibleRegister && visibleRegister.length > 0 ? (
                                <div className="apresentationListRequests grid" id="sectionUser-vaccinationRequests">
                                    {visibleRegister.map((vaccination, index) => (
                                        <RegisterVaccination
                                            vaccination={vaccination}
                                            key={index}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="notFoundItems flex">
                                    <NotFoundSearchItems message="Nenhum registro encontrado" />
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