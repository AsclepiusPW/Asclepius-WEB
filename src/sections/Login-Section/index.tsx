//Importações
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//Estilização
import "./style.css";

//Imagens
import asideLogin from "../../assets/About-LeadingPage.png";

//Ícones
import { LuEye, LuEyeClosed } from "react-icons/lu";

//Types
import { AuthenticateUserDTO } from "../../types/userTypes";

//Validação
import { authenticateUserschema } from "../../validations/authenticateUserValidator";

//Definindo classe
export const LoginSection = () => {
    //State
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

    //Funções
    // Configuração do formulário com react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthenticateUserDTO>({
        resolver: yupResolver(authenticateUserschema),
    });

    // Função de envio do formulário
    const onSubmit: SubmitHandler<AuthenticateUserDTO> = (data) => {
        console.log("Dados de login enviados:", data);
    };

    return (
        <section className="leadingAside-login flex section" id="leading-login">
            <div className="imageLogin-image">
                <img src={asideLogin} alt="Apresentação de médicos" className="imageLogin" />
            </div>

            <form className="loginUser-form flex" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="loginUser-title">Faça o seu Login</h2>

                <p className="loginUser-description">
                    Preencha todos os campos do formulário corretamente para poder ter acesso a uma conta.
                </p>

                <label className="loginUser-label flex">
                    <h5>Seu E-mail:</h5>
                    <input
                        placeholder="E-mail"
                        type="text"
                        className="loginUser-input"
                        {...register("email")}
                    />
                    <span className="form-error">{errors.email?.message}</span>
                </label>

                <label className="loginUser-label flex">
                    <h5>Seu senha:</h5>
                    <div className="loginUser-input inputPassword flex">
                        <input
                            placeholder="Criar senha"
                            type={visiblePassword ? "text" : "password"}
                            {...register("password")}
                        />
                        <p className="seePassword" onClick={() => setVisiblePassword(!visiblePassword)}>
                            {visiblePassword ? <LuEyeClosed /> : <LuEye />}
                        </p>
                    </div>
                    <span className="form-error">{errors.password?.message}</span>
                </label>

                <p className="seeSetPassword">
                    Esqueceu sua senha? <a href="">Clique aqui</a>
                </p>

                <button type="submit" className="loginUser-button">
                    Fazer Login
                </button>
            </form>
        </section>
    )
}