//Importações

//Estilização
import "./style.css";

//Imagens
import erroPage from "../../assets/error-image.png";

//Class
export const ErrorPage = () => {
    return(
        <div className="container apresentation flex errorPage">
            <h1 className="erroPage-title">
                Página não encontrada!
            </h1>

            <img src={erroPage} alt="Mulher acenando, enquanto mexe numa planilha" className="errorPage-image" />
        
            <p className="errorPage-description">
                <b>Ops! Lamentamos muito pelo o erro!</b> Por favor, <b>retorne a tela inicial</b>, clicando no butão abaixo.
            </p>

            <button className="button-totality" onClick={() => window.location.href = "/home"}>Voltar a Home</button>
        </div>
    )
}