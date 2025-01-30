//Importações
import { EventVaccinationCalendarDTO } from "./eventVaccinationCalendar";
import { UserDTO } from "./userTypes";

//Defindo interface de tipo
export interface RequestReservationDTO {
    id: string;
    status: string;
    data: string;
    idUser?: string;
    idCalendar?: string;
    calendar: EventVaccinationCalendarDTO;
    user: UserDTO;
};