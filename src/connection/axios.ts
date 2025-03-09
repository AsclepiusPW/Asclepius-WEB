//Importações
import axios from "axios";

//Configurações
export const portApi = "http://localhost:5000/"

export const apiAsclepius = axios.create({
    baseURL: portApi,
});