//Importações
import * as yup from "yup";

// Esquema de validação com Yup
export const createUserschema = yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
    email: yup.string().email("Digite um e-mail válido").required("O e-mail é obrigatório"),
    telefone: yup.string().matches(/^(\+\d{1,2}\s?)?(\()?\d{2,4}(\))?\s?(\d{4,5}(-|\s)?\d{4})$/, 'Telefone inválido').required("O telefone é obrigatório"),
    password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("A senha é obrigatória"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "As senhas não coincidem")
        .required("Confirmação de senha é obrigatória"),
    acceptLocation: yup.bool().oneOf([true], "Você deve permitir o acesso à localização"),
    latitude: yup.number().optional(),
    longitude: yup.number().optional(),
});