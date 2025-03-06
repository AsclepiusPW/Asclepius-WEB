//Importações

//Estilização
import "./style.css";

//Data
import { apresntationSystem } from "../../types/apresentationSystem";

//Props
interface apresentationSystemProps {
    data: apresntationSystem;
}

//Componente
export const ApresentationSystem = ({ data }: apresentationSystemProps) => {
    return (
        <div className="componentApresentation flex">
            <img src={data.image} alt={data.alt} className="imageData" />

            <div className="contentData flex">
                <h2 className="titleData">{data.title}</h2>
                <p className="descriptionData"
                    dangerouslySetInnerHTML={{ __html: data ? data.description : "Data not found" }}
    />
            </div>
        </div>
    )
}