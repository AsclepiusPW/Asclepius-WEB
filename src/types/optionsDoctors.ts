//Importando imagens
import doctorOne from "../assets/Doctors-options/doctor-one.png";
import doctorTwo from "../assets/Doctors-options/doctor-two.png";
import doctorThree from "../assets/Doctors-options/doctor-three.png";
import doctorFour from "../assets/Doctors-options/doctor-four.png";
import doctorFive from "../assets/Doctors-options/doctor-five.png";

//Definindo um tipo
export type optionDoctors = {
    id: number;
    image: string;
    option: string;
    nameDoctor: string;
    actionDoctor: string;
};

//Defindo a data
export const optionsDoctorsData: optionDoctors[] = [
    {
        id: 1,
        image: doctorOne,
        nameDoctor: "Dra. Beatriz Nunes",
        actionDoctor: "Geriatra",
        option: "A simplicidade e a eficiência do <b>Asclepius</b> ajudam as famílias a manterem a imunização em dia, protegendo todos de doenças graves."
    },
    {
        id: 2,
        image: doctorTwo,
        nameDoctor: "Dr. Ricardo Alves",
        actionDoctor: "Infectologista",
        option: "O <b>Asclepius</b> é uma ferramenta essencial para garantir que nenhum paciente perca suas doses de imunização. Ele ajuda a salvar vidas ao facilitar o acesso às vacinas."
    },
    {
        id: 3,
        image: doctorThree,
        nameDoctor: "Dra. Clara Fonseca",
        actionDoctor: "Médica de Família e Comunidade",
        option: "O <b>Asclepius</b> é um aliado tanto para os profissionais de saúde quanto para os pacientes, oferecendo segurança e organização no acompanhamento das vacinas."
    },
    {
        id: 4,
        image: doctorFour,
        nameDoctor: "Dr. Lucas Andrade",
        actionDoctor: "Clínico Geral",
        option: "Com o <b>Asclepius</b>, estamos um passo mais perto de eliminar lacunas na imunização. É o futuro do gerenciamento em saúde."
    },
    {
        id: 5,
        image: doctorFive,
        nameDoctor: "Dr. Gustavo Pereira & Dra. Camila Moreira",
        actionDoctor: "Médicos Preventivos",
        option: "O <b>Asclepius</b> oferece uma solução moderna para um dos desafios mais antigos da medicina: garantir que todos tenham acesso às vacinas necessárias."
    },
]