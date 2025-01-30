//Importações

//Types
import { optionDoctors } from "../../types/optionsDoctors";

//Estilização
import "./style.css";

//Imagns
import doctorDefault from "../../assets/Doctors-options/doctor-one.png";

//Props
interface Props {
    option: optionDoctors;
};

//Definindo o compoenente
export const OptionDoctor: React.FC<Props> = ({option}) => {
    return(
        <div className="optionDoctor-component flex">
            <img src={option ? option.image : doctorDefault} alt="Imagem do doctor" className="imageDoctor" />

            <div className="optionDoctor-content flex">
                <p className="contentDescription"
                    dangerouslySetInnerHTML={{
                        __html: option ? option.option : "Option of doctor not exist"
                    }}
                />

                <p className="nameDoctor-action">
                    {option ? ` - ${option.nameDoctor}, ${option.actionDoctor}` : "Doctor's name and action not found"}
                </p>
            </div>
        </div>
    )
}