//Importações
import { VaccinationDTO } from "./vaccinationTypes";
import { RequestReservationDTO } from "./requestResevationTypes";

//Definindo interface de tipo
export interface UserDTO {
    id: string;
    name: string;
    password: string;
    image: string;
    email: string;
    telefone: string;
    latitude: number;
    longitude: number;
    vaccination: VaccinationDTO[];
    requestReservation: RequestReservationDTO[];
    createdAt: string;
    updatedAt: string; 
};

//Definindo tipo para criação de usuário
export type CreateUserDTO = Omit<UserDTO, 'id' | 'image' | 'vaccination' | 'requestReservation' | 'createdAt' | 'updatedAt'>;

//Definição de tipo para autenticação de usuário
export type AuthenticateUserDTO = Pick<UserDTO, 'email' | 'password'>;

//Definindo tipo para atualização de usuário
export type UpdateUserDTO = Omit<UserDTO, 'id' | 'password' | 'image' | 'vaccination' | 'requestReservation' | 'createdAt' | 'updatedAt'>;;

//Definindo tipo para ataulização de senaha
export type UpdatePasswordDTO = Pick<UserDTO, 'email' | 'password'>;
