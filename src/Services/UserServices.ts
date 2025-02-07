//Importações
import { apiAsclepius } from "../connection/axios";

//Serviços
import { getAuthHeaders } from "./UtilsServices";

//Types
import { CreateUserDTO, AuthenticateUserDTO, UpdateUserDTO, UpdatePasswordDTO } from "../types/userTypes";

//Estrutura base de acesso a api
const baseApi = "user";

// ========= METODOS SEM AUTENTICAÇÃO ============
//Método para criar um usuário
export const createUser = async (data: CreateUserDTO) => {
    try {
        const response = await apiAsclepius.post(`${baseApi}/`, data);
        return response.data;
    } catch (error: any) {
        console.log("Error ao criar usuário: ", error);
        // Verifique se o erro é uma resposta da API
        if (error.response) {
            throw new Error(error.response.data.error || "Erro ao criar usuário");
        } else {
            // Se o erro não for relacionado a uma resposta da API, você pode retornar um erro genérico
            throw new Error("Erro desconhecido durante a criação de usuário");
        }
    }
};

//Método para autenticar um usuário
export const authenticateUser = async (data: AuthenticateUserDTO) => {
    try {
        const response = await apiAsclepius.post(`${baseApi}/authentication`, data);
        return response.data;
    } catch (error: any) {
        // Verifique se o erro é uma resposta da API
        if (error.response) {
            throw new Error(error.response.data.error || "Erro ao autenticar usuário");
        } else {
            // Se o erro não for relacionado a uma resposta da API, você pode retornar um erro genérico
            throw new Error("Erro desconhecido durante a autenticação de usuário");
        }
    }
};

//Método para atualizar a senha do usuário
export const updateUserPassword = async (data: UpdatePasswordDTO) => {
    try {
        const response = await apiAsclepius.patch(`${baseApi}/resetPassword`, data);
        return response;
    } catch (error: any) {
        console.log("Error: ", error);
        // Verifique se o erro é uma resposta da API
        if (error.response) {
            throw new Error(error.response.data.error || "Erro ao atualizar senha");
        } else {
            // Se o erro não for relacionado a uma resposta da API, você pode retornar um erro genérico
            throw new Error("Erro desconhecido durante a atualização da senha");
        }
    }
};

//Método para buscar as imagens de usuário
export const findProfileImage = async (image: string) => {
    try {
        const response = await apiAsclepius.get(`images/${image}`);
        return response;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data || "Error ao pesquisar imagem do usuário");
        }
    }
};

// ========= METODOS COM AUTENTICAÇÃO ============
//Método para verificar se o usuário está autenticado
export const tokenIsValid = async (token: string) => {
    try {
        const response = await apiAsclepius.get(`${baseApi}/authentication/isValid`, getAuthHeaders(token));
        return response.status;
    } catch (error: any) {
        // Verifique se o erro é uma resposta da API
        if (error.response) {
            throw new Error(error.response.data.error || "Erro ao verificar autenticação");
        } else {
            // Se o erro não for relacionado a uma resposta da API, você pode retornar um erro genérico
            throw new Error("Erro desconhecido durante a verificação de autenticação");
        }
    }
};

//Método para atualizar usuario
export const updateDataUser = async (data: UpdateUserDTO, token: string) => {
    try {
        const response = await apiAsclepius.put(`${baseApi}/update`, data, getAuthHeaders(token));
        return response.data;
    } catch (error: any) {
        // Verifique se o erro é uma resposta da API
        if (error.response) {
            throw new Error(error.response.data.error || "Erro ao atualizar usuário");
        } else {
            // Se o erro não for relacionado a uma resposta da API, você pode retornar um erro genérico
            throw new Error("Erro desconhecido durante a atualização de usuário");
        }
    }
};

//Método para listar usuário
export const listUser = async (token: string) => {
    try {
        const response = await apiAsclepius.get(`${baseApi}/profile`, getAuthHeaders(token));
        return response.data;
    } catch (error: any) {
        // Verifique se o erro é uma resposta da API
        if (error.response) {
            throw new Error(error.response.data.error || "Erro ao listar usuário");
        } else {
            // Se o erro não for relacionado a uma resposta da API, volunteiro pode retornar um erro genérico
            throw new Error("Erro desconhecido durante a listagem de usuário");
        }
    }
};

//Método para ataulizar imagem de usuário
export const updateProfileImage = async (image: File, token: string) => {
    try {
        const formData = new FormData();
        formData.append("image", image);

        const response = await apiAsclepius.patch(`${baseApi}/upload`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error: any) {
        // Verifique se o erro é uma resposta da API
        if (error.response) {
            throw new Error(error.response.data.error || "Erro ao atualizar imagem do usuário");
        } else {
            // Se o erro não for relacionado a uma resposta da API, volunteiro pode retornar um erro genérico
            throw new Error("Erro desconhecido durante a atualização da imagem do usuário");
        }
    }
};