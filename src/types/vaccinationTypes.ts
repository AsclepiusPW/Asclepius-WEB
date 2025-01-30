//Importações
import { VaccineDTO } from "./vaccineTypes";
import { UserDTO } from "./userTypes";

//Defindo interface de tipo
export interface VaccinationDTO {
    id: string;
    date: string;
    quantityApplied: number;
    idUser?: string;
    idVaccine: string;
    vaccine: VaccineDTO;
    user: UserDTO;
};