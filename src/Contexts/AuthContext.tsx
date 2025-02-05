//Importações
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

//Types
import { AuthenticateUserDTO } from "../types/userTypes";

//Api services
import { authenticateUser, tokenIsValid } from "../Services/UserServices";

//Defenindo o contexto
interface AuthContextProps {
    isAuthenticated: boolean;
    token: string | null;
    loading: boolean;
    signIn: (data: AuthenticateUserDTO) => Promise<void>;
    logout: () => void;
}

//Criando o contexto
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

//Props
interface AuthProviderProps {
    children: React.ReactNode;
}

//Criando o provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const isAuthenticated = !!token;
    const navigate = useNavigate();

    useEffect(() => {
        const loadCookieData = async () => {
            const storedToken = Cookies.get("authUserToken");

            if (storedToken) {
                try {
                    setToken(storedToken);
                    await checkTokenValidity(storedToken);

                    // Redireciona apenas se o usuário não estiver na página Home
                    if (location.pathname === "/") {
                        navigate("/home"); //Trocar para home
                    }
                } catch (error) {
                    logout();
                }
            } else {
                setLoading(false);
                if (location.pathname !== "/") {
                    navigate("/"); // Redireciona para Login apenas se necessário
                }
            }
        };

        loadCookieData(); // Aguarda a leitura do cookie
    }, []);

    //Verificando se o token é valido
    const checkTokenValidity = async (token: string) => {
        try {
            const response = await tokenIsValid(token);
            if (response === 200) {
                setLoading(false);
                return;
            } else if (response === 401) {
                logout();
                navigate("/");
            } else {
                throw new Error(`Erro ao verificar autenticação com status: ${response}`);
            }
        } catch (error) {
            handleAuthContextErrors(error);
            logout();
            navigate("/");
        }
    };

    //Autenticando o usuário
    const signIn = async (data: AuthenticateUserDTO) => {
        setLoading(true);
        try {
            toast.loading("Autenticando usuário...");

            const response = await authenticateUser(data);
            const { token } = response;
            if (!token) {
                toast.error("Erro ao autenticar usuário");
                return;
            }

            Cookies.set("authUserToken", token, {
                expires: 1,
                sameSite: "Strict",
            });
            
            toast.dismiss();
            setToken(token);
            navigate("/home");

            toast('👋 Bem-vindo(a)!');
        } catch (error) {
            toast.dismiss();
            toast.error("Erro ao autenticar usuário, tente novamente mais tarde.");
            console.error("Error ao autenticar usuário: ", error);
            if (error instanceof Error) {
                if (error.message === "User does not exist" || error.message === "Invalid password") {
                    throw new Error(error.message);
                }else{
                    handleAuthContextErrors(error);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    //Deslogando o usuário
    const logout = () => {
        Cookies.remove("authUserToken");
        Cookies.remove("detailsUser");
        setToken(null);
        navigate("/")
    };

    // Função para lidar com erros
    const handleAuthContextErrors = (error: unknown) => {
        if (error instanceof Error) {
            console.error("Erro de autenticação:", error.message);

            if (error.message === "User with email not found" || error.message === "Invalid password") {
                throw new Error(error.message);
            }
        } else {
            console.error("Erro inesperado:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, loading, token, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

// Hook para acessar o contexto
export const useAuth = () => {
    return useContext(AuthContext);
};