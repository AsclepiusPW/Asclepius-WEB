//Importações
import { EventVaccinationCalendarDTO } from "./eventVaccinationCalendar";

//Definindo interface de tipo
export interface VaccineDTO {
    id: string;
    name: string;
    type: string;
    manufacturer: string;
    description: string;
    contraIndication: string;
    createdAt: string;
    updatedAt: string; 
    vaccinationCalendar: EventVaccinationCalendarDTO[];
};