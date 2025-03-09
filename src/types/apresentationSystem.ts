//Images
import mentoria from "../assets/Icons/mentoria.png"
import caminhates from "../assets/Icons/caminhantes.png"
import equipe from "../assets/Icons/equipe.png"
import influenciador from "../assets/Icons/influenciador.png"

export interface apresntationSystem {
    id: string;
    title: string;
    description: string;
    image: string;
    alt: string
}

export const apresntationSystemData: apresntationSystem[] = [
    {
        id: "1",
        title: "Sistema Asclepius",
        description: `<b>Asclepius</b> é uma plataforma digital 
            inovadora que simplifica o gerenciamento de vacinas 
            e calendários de vacinação. Com uma interface intuitiva, 
            o sistema conecta os usuários a informações essenciais 
            sobre imunização, permitindo o acompanhamento de doses, 
            agendamentos e notificações de forma centralizada e prática. 
            A saúde nunca esteve tão acessível e organizada.`,
        image: mentoria,
        alt: "Mentoria de Desenvolvimento"
    },
    {
        id: "2",
        title: "Vacinas e Saúde na Era Digital",
        description: `O <b>Asclepius</b> transforma a maneira como gerenciamos 
            a imunização. Permitindo acesso rápido e seguro a informações 
            sobre vacinas disponíveis, o sistema promove uma melhor adesão 
            às recomendações de saúde, incentivando a proteção coletiva e 
            individual de maneira eficiente e tecnológica.`,
        image: caminhates,
        alt: "Caminhates"
    },
    {
        id: "3",
        title: "Segurança e Confiabilidade",
        description: `Com a segurança como prioridade, o <b>Asclepius</b> 
            utiliza autenticação robusta e protocolos de criptografia 
            avançados para proteger as informações dos usuários. 
            Garantimos que os dados pessoais e históricos de vacinação 
            sejam armazenados de forma segura, promovendo confiança e 
            tranquilidade no uso do sistema.`,
        image: equipe,
        alt: "Equipe"
    },
    {
        id: "4",
        title: "Conectando Usuários e Saúde Pública",
        description: `<b>Asclepius</b> atua como um elo entre os usuários e 
            os programas de vacinação regionais. Com funcionalidades 
            como lembretes automáticos e atualizações em tempo real, 
            o sistema facilita a adesão aos calendários de vacinação, 
            contribuindo para o bem-estar coletivo e uma sociedade mais 
            saudável.`,
        image: influenciador,
        alt: "Influenciador"
    }
];