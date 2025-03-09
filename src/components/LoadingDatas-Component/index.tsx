//Importações
import { TailSpin } from 'react-loader-spinner';

//Estilização
import "./style.css";

//Imagens
import logo from "../../assets/logo.png";

//Props
interface Props{
    title?: string;
}

//Componente
export function LoadingDatasComponent({ title }: Props) {
    return (
        <div className="loading-datas-container flex">
            <img src={logo} alt="Logo" className="loading-datas-logo" />

            <TailSpin
                    visible={true}
                    height="40"
                    width="40"
                    color="var(--green-aqua-color)"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                />

            <h3 className="loading-datas-title">{title ? title : "Carregando..."}</h3>
        </div>
    );
};