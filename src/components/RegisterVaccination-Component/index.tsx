//Importações
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Estilização
import "./style.css";

//Imagens
import vacina from "../../assets/Icons/vacina.png";

//Icones
import { MdMedicalInformation } from "react-icons/md";

//Types
import { VaccinationDTO } from "../../types/vaccinationTypes";

//Props
type Props = {
    vaccination: VaccinationDTO | undefined;
}   

//Class
export const RegisterVaccination = ({ vaccination }: Props) => {
    return (
        <div className="registerVaccination-component flex">
            <h3 className="registerVaccination-title">
                Vacina: 
                    <span>
                        {vaccination ? vaccination.vaccine.name: " Sem vacina"}
                    </span>
            </h3>
            
            <div className="registerVaccination-container flex">
                <img 
                    src={vacina} 
                    alt="Vacina" 
                    className="registerVaccination-icon" 
                />

                <div className="registerVaccination-content flex">
                    <p className="registerVaccination-details">
                       <MdMedicalInformation/> Data: 
                            <span>
                                {vaccination ? vaccination.date : " 00/00/0000"}
                            </span>
                    </p>
                    <p className="registerVaccination-details">
                        <MdMedicalInformation/> Dosagem: 
                            <span>
                                {vaccination ? vaccination.quantityApplied : " 0"}
                            </span> 
                    </p>
                </div>
            </div>

            <p className="registerVaccination-description">
                <MdMedicalInformation/> Descrição:
                    <span>
                        {vaccination ? vaccination.vaccine.description : " Descricao da vacina apresenta até então. Testando espaçamento"}
                    </span>
            </p>
 
            <button className="button-totality">Ver Vacina</button>
        </div>
    )
}