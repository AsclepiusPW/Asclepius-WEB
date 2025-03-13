//Importações
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

//Types
import { CreateUserDTO, UserDTO } from "../types/userTypes";

//Serviços
import { createUser, listUser, updateDataUser, updateProfileImage } from "../Services/UserServices";

//Contextos
import { useAuth } from "./AuthContext";

//Utils
import { findUserProfileImage } from "../Utils/findProfileImageUser";

//Definido o contexto
interface UserContextProps {
    user: UserDTO | null;
    profileImage: string | undefined;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<UserDTO | null>>;
    createNewUser: (data: CreateUserDTO) => Promise<void>;
    loadUserByToken: () => Promise<void>;
    updadeProfileImage: (imageFile: File) => Promise<void>;
    handleEditDataUser: () => Promise<void>;
    editUser: (data: { name: string, email: string, telefone: string }) => Promise<void>;
}

//Criando o contexto
const UserContext = createContext<UserContextProps>({} as UserContextProps);

//Props
interface UserProviderProps {
    children: React.ReactNode
}

//Criando o provider
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    //Definindo funções do contexto
    const { token, signIn } = useAuth();

    //States
    const [user, setUser] = useState<UserDTO | null>(null);
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    //Método para criar um novo usuário
    const createNewUser = async (data: CreateUserDTO) => {
        console.log("Context: ", data);
        if (!data) {
            toast.error("Dados indisiponíveis, tente novamente mais tarde.");
            return;
        }
        setLoading(true);
        try {
            toast.loading("Criando seu perfil...")
            const response = await createUser(data);

            if (response) {
                toast.dismiss();
                setUser(response);
                toast.success("Usuário criado com sucesso!");
                await signIn({ email: data.email, password: data.password });
            }
        } catch (error) {
            toast.dismiss();
            toast.error("Erro ao criar usuário, tente novamente mais tarde.");
            console.error("Error ao criar usuário: ", error);
            if (error instanceof Error) {
                if (error.message === "Existing user with this e-mail" || error.message === "Existing user with this telefone") {
                    throw new Error(error.message);
                } else {
                    handleUserContextErrors(error);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    //Carregar dados do usuário
    const loadUserByToken = async () => {
        if (!token) {
            toast.error("Erro ao carregar usuário, tente novamente mais tarde.");
            return;
        }

        setLoading(true);
        try {
            // Verifica se o cookie já contém as recomendações
            const cachedUser = Cookies.get("detailsUser");

            if (cachedUser) {
                console.log("Dados do usuário está em cache");
                setUser(JSON.parse(cachedUser));
            } else {
                //Buscando dados
                const response = await listUser(token);
                if (response) {
                    //Salvando no Cokkies
                    Cookies.set("detailsUser", JSON.stringify(response), { expires: 1 });
                    setUser(response);
                }
            }
        } catch (error) {
            toast.error("Erro ao carregar usuário, tente novamente mais tarde.");
            console.error("Error ao carregar usuário: ", error);
            if (error instanceof Error) {
                handleUserContextErrors(error);
            }
        } finally {
            setLoading(false);
        }
    };

    //Carregar imagem do usuário
    const loadProfileImage = async () => {
        setLoading(true);
        try {
            if (user?.image) {
                const findProfileImage = await findUserProfileImage(user.image);
                setProfileImage(findProfileImage);
            }
        } catch (error) {
            console.error("Error ao buscar a imagem do usuário: ", error);
        } finally {
            setLoading(false);
        }
    };

    //Função para editar usuário
    const editUser = async (data: { name: string, email: string, telefone: string }) => {
        setLoading(true);
        if (!user || !token) return;

        try {
            toast.loading("Editando usuário...");
            const response = await updateDataUser({ ...data, latitude: user.latitude, longitude: user.longitude }, token);
            const { updateUser } = response;

            if (updateUser) {
                toast.dismiss();
                const newDataUser = { ...user, ...updateUser };
                Cookies.set("detailsUser", JSON.stringify(newDataUser), { expires: 1 });
                setUser(newDataUser);
                toast.success("Usuário editado com sucesso!");
            }
        } catch (error) {
            toast.dismiss();
            toast.error("Erro ao editar usuário, tente novamente mais tarde.");
            if (error instanceof Error) {
                if (error.message === "E-mail is already being used by another user" || error.message === "Phone is already being used by another user") {
                    throw new Error(error.message);
                } else {
                    handleUserContextErrors(error);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    //Função para editar a imagem de perfil de um usuário
    const updadeProfileImage = async (imageFile: File) => {
        if (!imageFile || !token || !user) {
            console.error("Dados não disponívies");
            return;
        }

        setLoading(true);
        try {
            toast.loading("Atualizando imagem...");
            const response = await updateProfileImage(imageFile, token);
            const { image } = response;

            if (image) {
                toast.dismiss();
                setUser({ ...user, image });
                //Salvando no Cookies
                Cookies.set("detailsUser", JSON.stringify({ ...user, image }), { expires: 1 });

                toast.success("Imagem de perfil atualizada!");
            }

        } catch (error) {
            console.error("Error ao ataulizar a imagem do usuário: ", error);
            handleUserContextErrors(error);
        } finally {
            setLoading(false);
        }
    };

    //Função para atualizar dados do usuário
    const handleEditDataUser = async () => {
        if (!token) {
            toast.error("Erro ao carregar usuário, tente novamente mais tarde.");
            return;
        }

        setLoading(true);
        try {
            //Buscando dados
            const response = await listUser(token);
            if (response) {
                //Salvando no Cokkies
                Cookies.set("detailsUser", JSON.stringify(response), { expires: 1 });
                setUser(response);
            }
        } catch (error) {
            toast.error("Erro ao carregar usuário, tente novamente mais tarde.");
            console.error("Error ao carregar usuário: ", error);
            if (error instanceof Error) {
                handleUserContextErrors(error);
            }
        } finally {
            setLoading(false);
        }
    }

    // Função para lidar com erros
    const handleUserContextErrors = (error: unknown) => {
        if (error instanceof Error) {
            console.error("Erro no contexto:", error.message);
        } else {
            console.error("Erro inesperado:", error);
        }
    };

    //Busca os dados do usuário
    useEffect(() => {
        if (token) {
            loadUserByToken();
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            loadProfileImage();
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, profileImage, setUser, createNewUser, loadUserByToken, editUser, updadeProfileImage, loading, handleEditDataUser }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => {
    return useContext(UserContext);
}