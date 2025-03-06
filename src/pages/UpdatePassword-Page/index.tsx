//Importações
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

//Estilização
import "./style.css";

//Imagens
import logo from "../../assets/logo.png";

//Componentes
import { BackPage } from "../../components/BackPage-Component";

//ícones
import { LuEye } from "react-icons/lu";
import { FaEyeSlash } from "react-icons/fa";

//Types
type FormDataUpdatePassword = {
    email: string;
    password: string;
    confirmPassword: string;
}

//Service
import { updateUserPassword } from "../../Services/UserServices";

//Validações
import { updatePasswordSchema } from "../../validations/updatePasswordValidator";
import { toast } from "react-toastify";

//Página
export const UpdatePasswordPage = () => {
    //Definindo navagação
    const navigate = useNavigate();

    //State
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState<boolean>(false);

    //Form
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormDataUpdatePassword>({
        resolver: yupResolver(updatePasswordSchema),
    });

    //Função de envio do form
    const onSubmit: SubmitHandler<FormDataUpdatePassword> = async (data) => {
        setIsLoading(true);

        try {
            toast.loading("Atualizando senha...");

            const response = await updateUserPassword(data);

            if (response.status === 200) {
                toast.dismiss();
                toast.success("Senha atualizada com sucesso!");
                navigate("/");
            }
        } catch (error: any) {
            toast.dismiss();
            toast.error("Error ao atualizar senha...");
            console.log("Error:", error);
            if (error?.message === "Not existing user") {
                setError("email", { type: "manual", message: "Usuário não encontrado" });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="apresentation apresentationUpdatePassword flex" id="updatePassword">
            <BackPage title="Voltar..." />

            <img src={logo} alt="Asclepius" className="updatePassword-image" />

            <form className="formUpdatePassword flex" onSubmit={handleSubmit(onSubmit)}>
                <label className="formUpdatePassword-label flex">
                    <h5>Seu E-mail:</h5>
                    <input
                        placeholder="E-mail"
                        type="text"
                        className="formUpdatePassword-input"
                    {...register("email")}
                    />
                    <span className="form-error">{errors.email?.message}</span>
                </label>

                <label className="formUpdatePassword-label flex">
                    <h5>Sua senha:</h5>
                    <div className="formUpdatePassword-input inputPassword flex">
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

                <label className="formUpdatePassword-label flex">
                    <h5>Confirme sua senha:</h5>
                    <div className="formUpdatePassword-input inputPassword flex">
                        <input
                            placeholder="Confirmar senha"
                            type={visibleConfirmPassword ? "text" : "password"}
                            {...register("confirmPassword")}
                        />
                        <p className="seePassword" onClick={() => setVisibleConfirmPassword(!visibleConfirmPassword)}>
                            {visibleConfirmPassword ? <FaEyeSlash/> : <LuEye />}
                        </p>
                    </div>
                    <span className="form-error">{errors.confirmPassword?.message}</span>
                </label>

                <button type="submit" className="button-totality">
                    {isLoading ? "Atualizando..." : "Atualizar"}
                </button>
            </form>
        </div>
    )
}