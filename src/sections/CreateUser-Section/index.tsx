//Importações
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//Estilização
import "./style.css";

//Types
type formCreateUser = {
    name: string;
    password: string;
    email: string;
    telefone: string;
    confirmPassword: string; 
    acceptLocation?: boolean
}

//Validações
import { createUserschema } from "../../validations/createUserValidations";

//Ícones
import { LuEye, LuEyeClosed } from "react-icons/lu";

//Definindo class
export const CreateUserSection = () => {
    //State
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState<boolean>(false);

    //Funções
    // Configuração do formulário com react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<formCreateUser>({
        resolver: yupResolver(createUserschema),
    });

    // Função de envio do formulário
    const onSubmit: SubmitHandler<formCreateUser> = (data) => {
        console.log("Dados enviados:", data);
    };

    return (
        <section className="leadingAside-createUser flex section" id="leading-singUp">
            <form className="createUser-form flex" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="formCreate-title">Faça o seu cadastro</h2>
                <p className="formCreate-description">
                    Preencha todos os campos do formulário corretamente para poder ter acesso a uma conta.
                </p>

                <label className="formCreate-label flex">
                    <h5>Seu nome:</h5>
                    <input
                        placeholder="Nome"
                        type="text"
                        className="formCreate-input"
                        {...register("name")}
                    />
                    <span className="form-error">{errors.name?.message}</span>
                </label>

                <label className="formCreate-label flex">
                    <h5>Seu E-mail:</h5>
                    <input
                        placeholder="E-mail"
                        type="text"
                        className="formCreate-input"
                        {...register("email")}
                    />
                    <span className="form-error">{errors.email?.message}</span>
                </label>

                <label className="formCreate-label flex">
                    <h5>Seu telefone:</h5>
                    <input
                        placeholder="Telefone"
                        type="text"
                        className="formCreate-input"
                        {...register("telefone")}
                    />
                    <span className="form-error">{errors.telefone?.message}</span>
                </label>

                <label className="formCreate-label flex">
                    <h5>Sua senha:</h5>
                    <div className="formCreate-input inputPassword flex">
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

                <label className="formCreate-label flex">
                    <h5>Confirme sua senha:</h5>
                    <div className="formCreate-input inputPassword flex">
                        <input
                            placeholder="Confirmar senha"
                            type={visibleConfirmPassword ? "text" : "password"}
                            {...register("confirmPassword")}
                        />
                        <p className="seePassword" onClick={() => setVisibleConfirmPassword(!visibleConfirmPassword)}>
                            {visibleConfirmPassword ? <LuEyeClosed /> : <LuEye />}
                        </p>
                    </div>
                    <span className="form-error">{errors.confirmPassword?.message}</span>
                </label>

                <label className="formCreate-label flex">
                    <div className="formCreate-checkbox flex">
                        <input type="checkbox" {...register("acceptLocation")} />
                        <p className="checkbox-title">
                            Permita o sistema acessar a sua localização para fornecer as informações pertinentes para sua região.
                        </p>
                    </div>
                    <span className="form-error">{errors.acceptLocation?.message}</span>
                </label>

                <button type="submit" className="formCreate-button">
                    Criar perfil
                </button>
            </form>

            <div className="asideCreator-content flex">
                <p className="asideCreator-description">
                    <span>Asclepius</span> é um sistema de gerenciamento eletrônico de vacinação
                    que permite aos usuários realizarem seu cadastro e acompanhar, de forma prática
                    e segura, as vacinas e os calendários de vacinação disponíveis em sua região.
                    Com funcionalidades que facilitam o acesso à informação e o monitoramento de doses e
                    agendamentos, o <span>Asclepius</span> oferece um ambiente centralizado e digital para que usuários
                    estejam sempre atualizados quanto às recomendações de saúde e imunização, promovendo a
                    proteção da saúde de forma rápida e acessível.
                </p>
            </div>
        </section>
    )
}