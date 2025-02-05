//Importações
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

//Types
import { CreateUserDTO, UserDTO } from "../types/userTypes";

//Serviços
import { createUser, listUser } from "../Services/UserServices";

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
            const response = await createUser(data);

            if (response) {
                setUser(response);
                toast.success("Usuário criado com sucesso!");
                await signIn({ email: data.email, password: data.password });
            }
        } catch (error) {
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
                    localStorage.setItem("user", JSON.stringify(response));
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
        <UserContext.Provider value={{ user, profileImage, setUser, createNewUser, loadUserByToken, loading }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => {
    return useContext(UserContext);
}