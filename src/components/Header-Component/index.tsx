//Importações
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Estilização
import "./style.css";

//Imagens
import logo from "../../assets/logo.png";
import videoConferencia from "../../assets/Icons/videoconferencia.png";

//Types
import { VaccineDTO } from "../../types/vaccineTypes";
import { EventVaccinationCalendarDTO } from "../../types/eventVaccinationCalendar";

//Icones
import { IoMenu, IoSearchOutline } from "react-icons/io5";
import { FaHouse, FaUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { TbVaccine } from "react-icons/tb";
import { MdEvent } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp  } from "react-icons/io";

//Contextos
import { useAuth } from "../../Contexts/AuthContext";
import { useUser } from "../../Contexts/UserContext";

//Props
interface Props {
    userVisibility?: boolean; //Caso seja o menu do usuário
    actionPage: string;
    searchVisibility?: boolean; //Caso seja um menu com campo de busca
    titleMenu?: string; //Fornece o título
    placheholderInput?: string; //Fornece um placeholder
    functionSearch?: (query: string) => void; // Fornece a função
    onStateInSearch?: React.Dispatch<React.SetStateAction<VaccineDTO[] | EventVaccinationCalendarDTO[] | []>>;
}

//Class
export const Header: React.FC<Props> = ({ userVisibility, actionPage, functionSearch, searchVisibility, titleMenu, placheholderInput, onStateInSearch }) => {
    //Defindo funções do contexto
    const { logout } = useAuth();
    const { user } = useUser();

    //Definindo navegação
    const navigate = useNavigate();

    //States
    const [maximinized, setMaximinized] = useState<boolean>(true);
    const [search, setSearch] = useState<string>();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    //Funções
    //Definir os atributos escritos no input
    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearch(query);

        if (query === "") {
            if (onStateInSearch) {
                onStateInSearch([]);
            }
        }
    }

    //Pesquisar de fato o que se vem do input
    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (functionSearch && search) {
            try {
                functionSearch(search);
            } catch (error) {
                console.error("Error ao listar as respostas da pesquisa: ", error);
            }
        }
    };


    // Função para monitorar o scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={maximinized ? "headerPages flex borderRadiusHeader" : "headerPages flex"}>
            <div className="navToggle" onClick={() => setToggleMenu(!toggleMenu)}>
                <IoMenu />
            </div>

            <div className="headerPages-itens flex">
                <img src={logo} alt="Asclepius" className="headerPages-logo" />

                <ul className={toggleMenu ? "navMenu showMenu" : "headerPages-list flex"}>
                    <li className="headerPagesList-item">
                        <p className={actionPage === "Home" ? "active-item listItemIcon" : "listItemIcon"}><FaHouse /></p>
                        <a
                            href="/home"
                            className={actionPage === "Home" ? "active-item" : "listItemLink"}
                        >Home</a>
                    </li>

                    <li className="headerPagesList-item">
                        <p className={actionPage === "Vaccine" ? "active-item listItemIcon" : "listItemIcon"}><TbVaccine /></p>
                        <a
                            href="/vaccine"
                            className={actionPage === "Vaccine" ? "active-item" : "listItemLink"}
                        >Vacinas</a>
                    </li>

                    <li className="headerPagesList-item">
                        <p className={actionPage === "Event" ? "active-item listItemIcon" : "listItemIcon"}><MdEvent /></p>
                        <a
                            href=""
                            className={actionPage === "Event" ? "active-item" : "listItemLink"}
                        >Eventos</a>
                    </li>

                    <li className="headerPagesList-item">
                        <p className={actionPage === "Profile" ? "active-item listItemIcon" : "listItemIcon"}><FaUser /></p>
                        <a
                            href="/user"
                            className={actionPage === "Profile" ? "active-item" : "listItemLink"}
                        >Perfil</a>
                    </li>

                    <li className="headerPagesList-item" onClick={logout}>
                        <p className="listItemIcon"><FiLogOut /></p>
                        <a
                            className="listItemLink"
                        >Sair</a>
                    </li>
                </ul>
            </div>

            {isVisible && (
                <div className="headerPages-content flex">
                    {userVisibility && (
                        <div className="headerPages-user flex">
                            <div className="pagesUser-header flex">

                                <img src={videoConferencia} alt="Video conferência" className="pagesUser-img" />

                                <h2 className="headerUser-title">Olá, <span>{user?.name.split(" ")[0]}</span> !</h2>
                            </div>

                            {actionPage === "edit" ? (
                                <button className="button-totality" onClick={() => navigate("/user")}>Ver perfil</button>
                            ) : (
                                <button className="button-totality" onClick={() => navigate("/edit")}>Editar perfil</button>
                            )}
                        </div>
                    )}

                    {searchVisibility && (
                        <div className="headerPages-search flex">
                            <h2 className="headerSearch-title">{titleMenu ? titleMenu : "Título da página"}</h2>

                            <form className="headerSearch-form flex" onSubmit={handleSubmitForm}>
                                <input
                                    type="text"
                                    placeholder={placheholderInput ? placheholderInput : "Pesquisar..."}
                                    className="headerSearchForm-input"
                                    onChange={handleOnChangeInput}
                                />

                                <button
                                    type="submit"
                                    className="headerSearchForm-button">
                                    <IoSearchOutline/>
                                </button>
                            </form>
                        </div>
                    )}

                    {!userVisibility && !searchVisibility && maximinized && (
                        <div className="headerPages-empty flex">
                            <img src={videoConferencia} alt="Vídeo Conferência" className="videoConferencia-image" />

                            <h3 className="headerPagesEmpty-title">
                                Bem-vindo(a),
                                <br /><span>{user? user.name : "Nome do usuário"}</span>
                            </h3>

                            <div className="headerPagesEmpty-buttons flex">
                                <button className="button-opacity">
                                    <a href="">
                                        Visualizar eventos
                                    </a>
                                </button>

                                <button className="button-totality">
                                    <a href="/user">
                                        Ver Perfil
                                    </a>
                                </button>
                            </div>

                        </div>
                    )}

                    {isVisible && !userVisibility && !searchVisibility && (
                        <button className="headerPages-manipulation" onClick={() => setMaximinized(!maximinized)}>
                            {!maximinized ? <IoIosArrowDown/> : <IoIosArrowUp/>}
                        </button>
                    )}
                </div>
            )}
        </header>
    )
}