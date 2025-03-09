//Importações
import * as yup from "yup";

// Esquema de validação com Yup
export const editUserschema = yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
    email: yup.string().email("Digite um e-mail válido").required("O e-mail é obrigatório"),
    telefone: yup.string().matches(/^(\+\d{1,2}\s?)?(\()?\d{2,4}(\))?\s?(\d{4,5}(-|\s)?\d{4})$/, 'Telefone inválido').required("O telefone é obrigatório"),
});