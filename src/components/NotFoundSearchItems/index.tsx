//Importações

//Estilização
import "./style.css"; 

//Icons
import { LuSearchX } from "react-icons/lu";

//Props
type Props = {
    message: string;
};

export const NotFoundSearchItems: React.FC<Props> = ({ message }) => {
    return (
        <div className="not-found-search-items flex">
            <h1>Ops!</h1>
            <p><LuSearchX /></p>
            <h3>{message}</h3>
        </div>
    );
}