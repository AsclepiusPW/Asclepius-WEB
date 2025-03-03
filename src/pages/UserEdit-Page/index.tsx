//Importações
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

//Estilização 
import "./style.css";

//Imagens
import userDefault from "../../assets/UserDefault.jpg";

//Componentes
import { Header } from "../../components/Header-Component";
import { BackPage } from "../../components/BackPage-Component";
import { LoadingDatasComponent } from "../../components/LoadingDatas-Component";
import { Footer } from "../../components/Footer-Component";

//Types
import { UserDTO } from "../../types/userTypes";
type formEditUser = {
    name: string;
    email: string;
    telefone: string;
};

//Contextos
import { useUser } from "../../Contexts/UserContext";
import { editUserschema } from "../../validations/editUserValidator";
import { toast } from "react-toastify";

//Class
export const UserEditPage = () => {
    //Definindo funções do contexto
    const { user, profileImage, editUser, updadeProfileImage } = useUser();

    //States
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [photoUser, setPhotoUser] = useState<string>(profileImage || userDefault);
    const [file, setFile] = useState<File | undefined>(undefined);

    //Configuração do formulário
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm<formEditUser>({
        resolver: yupResolver(editUserschema),
    });

    //Função de envio do formulário
    const onSubmit: SubmitHandler<formEditUser> = async (data) => {
        setIsLoading(true);

        try {
            await editUser(data);
        } catch (error: any) {
            if (error?.message === "E-mail is already being used by another user") {
                setError("email", { type: "manual", message: "Email já cadastrado" });
            }
            if (error?.message === "Phone is already being used by another user") {
                setError("telefone", { type: "manual", message: "Telefone já cadastrado" });
            }
        } finally {
            setIsLoading(false);
        }
    };

    //Função de definição do file
    const handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFile(file);
        if (file) {
            const urlImage = URL.createObjectURL(file);
            setPhotoUser(urlImage);
        }
    };

    //Funão para salvar a imagem do usuário
    const handleSavedProfileImage = async () => {
        if (!file) {
            toast.info("Por favor, escolha uma imagem");
            return;
        }

        setIsLoading(true);
        try {
            await updadeProfileImage(file);
        } catch (error) {
            console.error("Error ao atualizar imagem de perfil: ", error);
            toast.error("Error ao salvar a imagem de perfil");
        } finally {
            setIsLoading(false);
        }
    }

    //Effect
    useEffect(() => {
        if (!user) return;

        (() => {
            setValue("name", user.name);
            setValue("email", user.email);
            setValue("telefone", user.telefone);
        })();
    }, [user]);

    return (
        <div className=" flex apresentation userEditScreen" id="userEditScreen">
            <Header userVisibility={true} actionPage="edit" />


            {isLoading ? (
                <LoadingDatasComponent />
            ) : (
                <div className="section-editUser flex">
                    <BackPage title="Voltar para perfil" />

                    <div className="editUserContainer flex">
                        <h2 className="editUser-title">Edite suas informações</h2>
    
                        <div className="formContinerEditImage flex">
                            <img src={photoUser} alt="Imagem de perfil" className="editUserContainer-image" />

                            {!file ? (
                                <>
                                    <label htmlFor="FileProfile" className="button-opacity">
                                        Escolher Imagem
                                    </label>
                                    <input id="FileProfile" type="file" accept="image/*" onChange={handleChangeFileInput} />
                                </>
                            ) : (
                                <button
                                    className="button-totality"
                                    onClick={handleSavedProfileImage}
                                >
                                    Definir Imagem
                                </button>
                            )}
                        </div>

                        <form className="formEditProfile-informations flex" onSubmit={handleSubmit(onSubmit)}>
                            <h3 className="formUserEdit-title">Edite suas informações</h3>
                            
                            <label className="formEditUser-label flex">
                                <h5>Seu Nome:</h5>
                                <input
                                    placeholder="Nome"
                                    type="text"
                                    className="formEditUser-input"
                                    {...register("name")}
                                />
                                <span className="form-error">{errors.name?.message}</span>
                            </label>

                            <label className="formEditUser-label flex">
                                <h5>Seu E-mail:</h5>
                                <input
                                    placeholder="E-mail"
                                    type="text"
                                    className="formEditUser-input"
                                    {...register("email")}
                                />
                                <span className="form-error">{errors.email?.message}</span>
                            </label>

                            <label className="formEditUser-label flex">
                                <h5>Seu Telefone:</h5>
                                <input
                                    placeholder="Telefone"
                                    type="text"
                                    className="formEditUser-input"
                                    {...register("telefone")}
                                />
                                <span className="form-error">{errors.telefone?.message}</span>
                            </label>

                            <button 
                                type="submit" 
                                className="button-totality">
                                    {isLoading ? "Carregando..." : "Salvar"}
                                </button>
                        </form>
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
};