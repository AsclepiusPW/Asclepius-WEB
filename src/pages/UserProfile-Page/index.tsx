//Importações
import React, { useEffect, useState } from "react";

//Estilização
import "./style.css";

//Imagens
import userDefault from "../../assets/UserDefault.jpg";

//Icones
import { MdChecklist } from "react-icons/md";

//Types
import { UserDTO } from "../../types/userTypes";

//Componentes
import { Header } from "../../components/Header-Component";
import { FilterSearch } from "../../components/FilterSearch-Component";
import { InformationsProfile } from "../../components/InformationsProfile-Component";
import { RegisterVaccination } from "../../components/RegisterVaccination-Component";
import { RequestVaccinationComponent } from "../../components/RequestVaccination-Component";
import { Footer } from "../../components/Footer-Component";

//Utils
import { scrollToInformationUser, scrollToVaccinantionRegisters, scrollToVaccinationRequets } from "../../Utils/scrollFunctions";

//Contextos
import { useUser } from "../../Contexts/UserContext";
import { LoadingDatasComponent } from "../../components/LoadingDatas-Component";
import { NotFoundDatas } from "../../components/NotFoundDatas-Component";
import { OptionsDoctorsSlider } from "../../Sliders/OptionsDoctors-slider";

//Class
export const UserProfilePage: React.FC = () => {
    //Defindo funções do contexto
    const { user, profileImage } = useUser();

    //States
    const [userDetails, setUserDetails] = useState<UserDTO | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //Effect
    useEffect(() => {
        setIsLoading(true);
        setUserDetails(user);
        setIsLoading(false);
    }, [user]);

    return (
        <div className="container flex apresentation UserScreen" id="userProfile">
            <Header userVisibility={true} actionPage="Profile" />


            {isLoading ? (
                <LoadingDatasComponent />
            ) : (
                <>
                    <div className="sectionUser-apresentation flex">
                        <img
                            src={profileImage ? profileImage : userDefault}
                            alt="Imagem de perfil de usuário"
                            className="apresentationUser-image"
                        />

                        <div className="apresentationUser-content flex">
                            <h1 className="apresentationContent-nameUser">
                                {userDetails ? userDetails.name : "Nome do usuário"}
                            </h1>

                            <div className="apresentationContentList-informations flex">
                                <div className="apresentationInformation-item flex">
                                    <div className="itemList-circle flex">
                                        <p className="circleTitle">
                                            {userDetails ? userDetails.requestReservation.length : "0"}
                                        </p>
                                    </div>

                                    <h5 className="itemList-description">Pedidos de agendamento</h5>
                                </div>

                                <div className="apresentationInformation-item flex">
                                    <div className="itemList-circle flex">
                                        <p className="circleTitle">
                                            {userDetails ? userDetails.vaccination.length : "0"}
                                        </p>
                                    </div>

                                    <h5 className="itemList-description">Participação em eventos</h5>
                                </div>

                                <div className="apresentationInformation-item flex">
                                    <div className="itemList-circle flex">
                                        <p className="circleTitle">{userDetails ? userDetails.vaccination.length : "0"}</p>
                                    </div>

                                    <h5 className="itemList-description">Vacinas tomadas</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sectionUser-filter flex">
                        <h3 className="filterTitle">O que deseja analisar?</h3>

                        <FilterSearch
                            filterEntity="User"
                            buttonActionFilterOne={scrollToInformationUser}
                            buttonActionFilterThree={scrollToVaccinationRequets}
                            buttonActionFilterTwo={scrollToVaccinantionRegisters}
                            functionFilter={() => { alert("Filter") }}
                        />
                    </div>

                    <InformationsProfile />

                    <div className="sectionUser-vaccinationRegisters flex" id="sectionUser-vaccinationRegisters">
                        <div className="vacciantionRegister-header flex">
                            <h3 className="registerHeader-Title">Registro de Vacinação</h3>
                            <button className="registerHeader-button flex">
                                <MdChecklist />  Ver mais
                            </button>

                        </div>
                        {userDetails && userDetails.vaccination.length > 0 ? (
                            <div className="vaccinationRegisters grid">
                                {userDetails?.vaccination.slice(0, 4).map((vaccination, index) => (
                                    <RegisterVaccination
                                        vaccination={vaccination}
                                        key={index}
                                    />
                                ))}
                            </div>
                        ) : (
                            <NotFoundDatas />
                        )}
                    </div>

                    <div className="sectionUser-vaccinationRequests flex" id="sectionUser-vaccinationRequests">
                        <div className="vacciantionRequestes-header flex">
                            <h3 className="requestsHeader-Title">Solicitação de Vacinação</h3>
                            <button className="requestsHeader-button flex">
                                <MdChecklist />  Ver mais
                            </button>

                        </div>
                        {userDetails && userDetails.vaccination.length > 0 ? (
                            <div className="vaccinationRequests grid">
                                {userDetails?.requestReservation.slice(0, 4).map((vaccination, index) => (
                                    <RequestVaccinationComponent
                                        calendar={vaccination}
                                        key={index}
                                    />
                                ))}    
                            </div>
                        ) : (
                            <NotFoundDatas />
                        )}
                    </div>
                </>
            )}

            <div className="sectionSlidersPages flex">
                <OptionsDoctorsSlider/>
            </div>

            <Footer systemPages={true} />
        </div>
    )
}