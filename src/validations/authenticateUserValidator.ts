//Importações
import * as yup from "yup";

// Esquema de validação com Yup
export const authenticateUserschema = yup.object().shape({
    email: yup.string().email("Digite um e-mail válido").required("O e-mail é obrigatório"),
    password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("A senha é obrigatória"),
});