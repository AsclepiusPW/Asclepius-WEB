//Importações
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

//Types
import { EventVaccinationCalendarDTO } from "../types/eventVaccinationCalendar";

//Serviços
import { findAllEvents, createReservation } from "../Services/EventServices";

//Contexto
import { useAuth } from "./AuthContext";
import { useUser } from "./UserContext";

//Definindo o contexto
interface EventContextProps {
    allEvents: EventVaccinationCalendarDTO[];
    handleRequestEvent: (id: string) => void;
}

//Criando contexto
const EventContext = createContext<EventContextProps>({} as EventContextProps);

//Props
interface EventProviderProps {
    children: React.ReactNode;
}

//Criando o provider
export const EventProvider = ({ children }: EventProviderProps) => {
    //Definindo funções do contexto
    const {token} = useAuth();
    const { handleEditDataUser } = useUser();

    //States
    const [allEvents, setAllEvents] = useState<EventVaccinationCalendarDTO[]>([]);

    //Métodos
    const loadAllEvents = async () => {
        try {
            toast.loading("Carregando eventos...");
            const response = await findAllEvents();
            setAllEvents(response);
            toast.dismiss();
        } catch (error) {
            toast.dismiss();
            toast.error("Erro ao carregar eventos");
            console.error("Error ao carregar eventos: ", error);
        }
    };

    //Função para agendar uma evento
    const handleRequestEvent = async (id: string) => {
        if (!token) return toast.error("Você precisa estar logado para agendar um evento");
        
        const date = new Date().toISOString();

        try {
            toast.loading("Agendando evento...");
            await createReservation(id, date, token);
            toast.dismiss();
            await handleEditDataUser();
            toast.success("Evento agendado com sucesso!");
        } catch (error) {
            toast.dismiss();
            if (error instanceof Error) {
                if (error.message === "Request reservation already exists for this user and calendar" || error.message === "Phone is already being used by another user") {
                    toast.info("Você já possui um agendamento para esse evento!");
                } else {
                    toast.error("Erro ao agendar evento");
                    console.error("Error ao agendar evento: ", error);
                }
            }
        }
    };

    //Effect
    useEffect(() => {
            loadAllEvents();
    }, []); 

    return (
        <EventContext.Provider value={{ allEvents, handleRequestEvent }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvent = () => {
    return useContext(EventContext);
};