//Importações
import { apiAsclepius } from "../connection/axios";

//Serviços
import { getAuthHeaders } from "./UtilsServices";

//Types
import { EventVaccinationCalendarDTO } from "../types/eventVaccinationCalendar";

//Estrutura base de acesso a api
const baseApi = "event";
const resevationBaseApi = "reservation";

// ========= METODOS SEM AUTENTICAÇÃO ============
//Método para listar todos os eventos
export const findAllEvents = async (): Promise<EventVaccinationCalendarDTO[]> => {
    try {
        const response = await apiAsclepius.get(`${baseApi}/`);
        return response.data;
    } catch (error: any) {
        // Verifique se o erro é uma resposta da API
        if (error.response) {
            throw new Error(error.response.data.error || "Erro ao listar eventos");
        } else {
            // Se o erro não for relacionado a uma resposta da API, volunteiro pode retornar um erro genérico
            throw new Error("Erro desconhecido durante a listagem de eventos");
        }
    }
};

//Método para agendar reseva
export const createReservation = async (idCalendar: string, date: string, token: string): Promise<void> => {
    try {
        const response = await apiAsclepius.post(`${resevationBaseApi}/`, { idCalendar, date }, getAuthHeaders(token));
        return response.data;

    } catch (error: any) {
        console.error("Error ao agendar evento: ", error);
        // Verifique se o erro é uma resposta da API
        if (error.response) {
            throw new Error(error.response.data.message || "Erro ao listar eventos");
        } else {
            // Se o erro não for relacionado a uma resposta da API, volunteiro pode retornar um erro genérico
            throw new Error("Erro desconhecido durante a listagem de eventos");
        }
    }
};