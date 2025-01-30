//Importações
import { RequestReservationDTO } from "./requestResevationTypes";
import { VaccineDTO } from "./vaccineTypes";

//Definindo interface de tipo
export interface EventVaccinationCalendarDTO {
    id: string,
    local: string;
    latitude: string;
    longitude: string;
    date: string;
    places: number;
    status?: string;
    observation?: string;
    responsible: string;
    idVaccine: string;
    vaccine: VaccineDTO;
    requestReservation: RequestReservationDTO[];
    createdAt: string;
    updatedAt: string;
};