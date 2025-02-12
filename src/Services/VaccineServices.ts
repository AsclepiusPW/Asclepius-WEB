//Importações
import { apiAsclepius } from "../connection/axios";

//Types
import { VaccineDTO } from "../types/vaccineTypes";

//Estrutura base de acesso a api
const baseApi = "vaccine";

// ========= METODOS SEM AUTENTICAÇÃO ============
//Método para listar todas as vacinas
export const findAllVaccines = async (): Promise<VaccineDTO[]> => {
    try {
        const response = await apiAsclepius.get(`${baseApi}/`);
        return response.data;
    } catch (error: any) {
        // Verifique se o erro é uma resposta da API
        if (error.response) {
            throw new Error(error.response.data.error || "Erro ao listar vacinas");
        } else {
            // Se o erro não for relacionado a uma resposta da API, volunteiro pode retornar um erro genérico
            throw new Error("Erro desconhecido durante a listagem de vacinas");
        }
    }
}