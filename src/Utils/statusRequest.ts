export const formatStatusRequest = (status: string | undefined) => {
    switch (status) {
        case "Pending":
            return "Pendente";
        case "Approved":
            return "Aprovado";
        case "Rejected":
            return "Rejeitado";
        default:
            return "Pendente";
    }
};

export const formatStatusEvent = (status: string | undefined) => {
    switch (status) {
        case "Pending":
            return "Pendente";
        case "Realized":
            return "Realizado";
        case "Canceled":
            return "Cancelado";
        default:
            return "Pendente";
    }
};