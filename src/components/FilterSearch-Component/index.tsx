//Importações
import { useState } from "react";

//Estilização
import "./style.css";

//Imagens
import mapa from "../../assets/Icons/mapa.png";
import dataLimite from "../../assets/Icons/data-limite.png";
import falando from "../../assets/Icons/falando.png";
import vacina from "../../assets/Icons/vacina.png";

//ícones
import { CiSearch } from "react-icons/ci";

//Props
interface Props {
    filterEntity: "Event" | "User";
    buttonActionFilterOne: () => void;
    buttonActionFilterTwo: () => void;
    buttonActionFilterThree: () => void;
    functionFilter: () => void;
}

//Class
export const FilterSearch = ({filterEntity, buttonActionFilterOne, buttonActionFilterTwo, buttonActionFilterThree, functionFilter}: Props) => {
    const [filter, setFilter] = useState("")
    const [activeButton, setActiveButton] = useState("");

    return(
        <div className="filterSearchComponent-container flex">
            <div className="containerButtons flex">
                <div className={`buttonItem flex ${activeButton === "one" ? "activeSelect" : ""}`} onClick={() => {
                    setActiveButton("one");
                    buttonActionFilterOne();
                }}>
                    <img 
                        src={filterEntity === "User" ? falando : mapa} 
                        alt="Primeiro button de busca" 
                        className="buttonItem-icon" 
                    />

                    <h5 className="buttonItem-title">{filterEntity === "User" ? "Suas informações pessoais" : "Listar eventos em sua cidade"}</h5>
                </div>

                <div className={`buttonItem flex ${activeButton === "two" ? "activeSelect" : ""}`} onClick={() => {
                    setActiveButton("two");
                    buttonActionFilterTwo();
                }}>
                    <img 
                        src={filterEntity === "User" ? vacina : dataLimite} 
                        alt="Segundo button de busca" 
                        className="buttonItem-icon" 
                    />

                    <h5 className="buttonItem-title">{filterEntity === "User" ? "Seus registros de vacinação" : "Listar eventos desse mês"}</h5>
                </div>

                <div className={`buttonItem flex ${activeButton === "three" ? "activeSelect" : ""}`} onClick={() => {
                    setActiveButton("three");
                    buttonActionFilterThree();
                }}>
                    <img 
                        src={filterEntity === "User" ? dataLimite : vacina} 
                        alt="Terceiro button de busca" 
                        className="buttonItem-icon" 
                    />

                    <h5 className="buttonItem-title">{filterEntity === "User" ? "Suas solicitações de agendamento" : "Listar eventos do mês seguinte"}</h5>
                </div>
            </div>

            <form className="containerInput-Search flex" onSubmit={functionFilter}>
                <input 
                    type="text" 
                    placeholder={filterEntity === "User" ? "Pesquisar um registro entre suas vacinações" : "Pesquise eventos por uma vacina específica"} 
                    className="input-Search" 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                />

                <button 
                    className="button-Search" 
                    type="submit"
                >
                    <CiSearch/>
                </button>
            </form>
        </div>    
    )
}