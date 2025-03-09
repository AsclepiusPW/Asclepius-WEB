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
    acceptLocation?: boolean;
}

//Validações
import { createUserschema } from "../../validations/createUserValidations";

//Ícones
import { LuEye } from "react-icons/lu";
import { FaEyeSlash } from "react-icons/fa";

//Contexto
import { useUser } from "../../Contexts/UserContext";

//Definindo class
export const CreateUserSection = () => {
    //Defindo funções do contexto
    const { createNewUser } = useUser();

    //State
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState<boolean>(false);
    const [acceptLocation, setAcceptLocation] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    //Funções
    // Configuração do formulário com react-hook-form
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<formCreateUser>({
        resolver: yupResolver(createUserschema),
    });

    // Capturar a localização quando o usuário aceita compartilhar
    const getLocation = async (): Promise<{ latitude?: number; longitude?: number }> => {
        return new Promise((resolve) => {
            if (acceptLocation && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    (error) => {
                        console.error("Erro ao obter localização:", error);
                        resolve({}); // Retorna um objeto vazio caso haja erro
                    }
                );
            } else {
                resolve({});
            }
        });
    };

    // Função de envio do formulário
    const onSubmit: SubmitHandler<formCreateUser> = async (data) => {
        setLoading(true);
        // Aguarda a obtenção da localização
        const location = await getLocation();
        
        if (!location.latitude || !location.longitude) {
            setError("acceptLocation", { type: "manual", message: "Aceite compartilhar localização" });
            return;
        }

        try {
            await createNewUser({
                email: data.email,
                password: data.password,
                name: data.name,
                telefone: data.telefone,
                latitude: location.latitude,
                longitude: location.longitude,
            });
        } catch (error: any) {
            if (error?.message === "Existing user with this e-mail") {
                setError("email", { type: "manual", message: "Email já cadastrado" });
            }
            if (error?.message === "Existing user with this telefone") {
                setError("telefone", { type: "manual", message: "Telefone já cadastrado" });
            }   
        } finally {
            setLoading(false);
        }
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
                            {visiblePassword ? <FaEyeSlash /> : <LuEye />}
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
                            {visibleConfirmPassword ? <FaEyeSlash /> : <LuEye />}
                        </p>
                    </div>
                    <span className="form-error">{errors.confirmPassword?.message}</span>
                </label>

                <label className="formCreate-label flex">
                    <div className="formCreate-checkbox flex">
                        <input type="checkbox" {...register("acceptLocation")} onChange={() => setAcceptLocation(!acceptLocation)}/>
                        <p className="checkbox-title">
                            Permita o sistema acessar a sua localização para fornecer as informações pertinentes para sua região.
                        </p>
                    </div>
                    <span className="form-error">{errors.acceptLocation?.message}</span>
                </label>

                <button type="submit" className="formCreate-button">
                    {loading ? "Carregando..." : "Cadastrar"}
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