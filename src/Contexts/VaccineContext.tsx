//Importações
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

//Types
import { VaccineDTO } from "../types/vaccineTypes";

//Serviços
import { findAllVaccines } from "../Services/VaccineServices";

//Contexto
import { useUser } from "./UserContext";

//Definindo o contexto
interface VaccineContextProps {
    allVaccines: VaccineDTO[];
}

//Criando contexto
const VaccineContext = createContext<VaccineContextProps>({} as VaccineContextProps);

//Props
interface VaccineProviderProps {
    children: React.ReactNode;
}

//Criando o provider
export const VaccineProvider = ({ children }: VaccineProviderProps) => {
    //Definindo funções do contexto
    const { user } = useUser();

    //States
    const [allVaccines, setAllVaccines] = useState<VaccineDTO[]>([]);

    //Métodos
    const loadAllVaccines = async () => {
        try {
            toast.loading("Carregando vacinas...");
            const response = await findAllVaccines();
            setAllVaccines(response);
            toast.dismiss();
        } catch (error) {
            toast.dismiss();
            toast.error("Erro ao carregar vacinas");
            console.error("Error ao carregar vacinas: ", error);
        }
    };

    //Effect
    useEffect(() => {
            loadAllVaccines();
    }, []); 

    return (
        <VaccineContext.Provider value={{ allVaccines }}>
            {children}
        </VaccineContext.Provider>
    );
};

export const useVaccine = () => {
    return useContext(VaccineContext);
};