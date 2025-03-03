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