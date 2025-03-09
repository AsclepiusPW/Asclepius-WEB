// Funções para scroll suave
export const scrollToInformationUser = () => {
    const formElement = document.getElementById('informationsProfile-container');
    if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
    }
};

export const scrollToVaccinantionRegisters = () => {
    const formElement = document.getElementById('sectionUser-vaccinationRegisters');
    if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
    }
};

export const scrollToVaccinationRequets = () => {
    const formElement = document.getElementById('sectionUser-vaccinationRequests');
    if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
    }
};

export const scrollToEvents = () => {
    const formElement = document.getElementById('listEvents');
    if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
    }
};

export const scrollToId = (name:string) => {
    const formElement = document.getElementById(name);
    if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
    }
};