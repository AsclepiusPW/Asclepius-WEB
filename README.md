# **Asclepius-WEB**

## **Descrição do Projeto**

O **Asclepius-WEB** é um sistema web desenvolvido como parte da disciplina **Programação para Web 2 (PW2)**. Esse projeto foi criado com **TypeScript e React**, conectando-se à API Asclepius, que foi desenvolvida anteriormente na disciplina de Programação para Web I (PWI) do curso de Análise e Desenvolvimento de Sistemas (ADS) do IFPB - Campus Cajazeiras no ano de 2024.2.

O objetivo deste sistema é fornecer uma interface web intuitiva para o gerenciamento de vacinação, permitindo aos usuários realizarem agendamentos, acompanharem registros e interagirem com suas informações de saúde de forma eficiente.

## **Asclepius API**

O aplicativo se comunica com a API **Asclepius**, que está em constante evolução para desempenhar um papel fundamental nos registros eletrônicos de vacinas. O Asclepius foi projetado como uma API especializada para gerenciar vacinas eletrônicas de forma eficiente, abordando conceitos importantes como autenticação de usuário, uploads de arquivos e gerenciamento de banco de dados.

A API do Asclepius foi originalmente desenvolvida como parte da matéria de Programação para Web I (PWI). Ela foi criada para implementar sistemas robusto e funcional para gerenciar registros de vacinação.

- **API Repository**: [Asclepius API](https://github.com/AsclepiusPW/Asclepius.git)

## **Funcionalidades**

- **Autenticação do usuário**: Login seguro do usuário para gerenciar os registros de vacinação.
- **Solicitações de vacinação**: Os usuários podem visualizar, solicitar e gerenciar as consultas de vacinação.
- **Dados em tempo real**: Conecta-se à API do Asclepius para obter informações atualizadas sobre vacinação.
- **Rastreamento e histórico**: Permite que os usuários acompanhem seu status de vacinação e visualizem o histórico.
- **Upload de fotos**: Apresenta um ambiente integrado para os usuários enviarem e editarem as imagens do seu perfil.

## **Tecnologia Utilizada**
- **React**: Biblioteca para desenvolvimento de interfaces de usuário.
- **TypeScript**: Linguagem de programação com tipagem forte usada para desenvolver código confiável.
- **Axios**: Usado para fazer solicitações HTTP para a API do Asclepius.
- **API do Asclepius**: Sistema de back-end que lida com o gerenciamento de vacinação.

## **Pré-requisitos**

- [Node.js](https://nodejs.org/) instalado
- [Visual Studio Code](https://code.visualstudio.com) instalado
- [Asclepius API](https://github.com/AsclepiusPW/Asclepius.git) iniciado

## Estrutura dos diretórios

```bash
├── public/
├── src/
│   └── Contexts/
│   └── Services/
|   └── Sliders/
|   └── utils/
|   └── assets/
│   └── components/
│   └── connection/
|   └── pages/
|   └── section/
|   └── types/
|   └── validations/
│   └── App.tsx
│   └── main.tsx
|   └── index.css
|   └── vite-env.d.ts
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.json
```

## **Instalação**

0. Incialmente, clone e configure, com forme é apresentado, o repositório do Asclepius API:

```bash
https://github.com/AsclepiusPW/Asclepius.git
```

1. Clone o repositório do Asclepius-WEB:

```bash
https://github.com/AsclepiusPW/Asclepius-WEB.git
```

2. Instale as dependências:
```bash
npm install
```
ou
```bash
yarn install
```

## **Uso**

1. Inicie o servidor do React com Vite:
```bash
npm run dev
```

ou

```bash
yarn dev
```

2. O sistema estará disponível no navegador em:
```bash
http://localhost:5173
```

3. Siga para o diretório de **conection** dentro da pasta **Source**, e configure a rota da API com base no IP do aplicativo:

```bash
export const portApi = "http://localhost:{porta_que_api_esteja_rodando}/"
```

4. Verifique a conexão, se tudo ocorrer bem, o sistema estará pronto para uso.

## **Desenvolvedores**

### Douglas Silva
- [GitHub](https://github.com/7-Dodi)
- Papel: Frontend
- Resumo: Douglas Silva desempenhou um papel fundamental no desenvolvimento da interface do usuário, focando na usabilidade e experiência do usuário. Sua expertise foi vital para garantir uma navegação fluida e intuitiva no sistema Asclepius.

### Jose Gabriel
- [GitHub](https://github.com/J-Gabriel-F-D)
- Papel: Frontend
- Resumo: Jose Gabriel contribuiu de maneira significativa para o design e implementação das interfaces do sietma, assegurando uma integração harmoniosa entre o design visual e a funcionalidade. Sua dedicação foi essencial para a criação de uma experiência de usuário agradável.

### Marcos Paulo
- [GitHub](https://github.com/KingZabitus)
- Papel: Frontend
- Resumo: Marcos Paulo desempenhou um papel crucial no desenvolvimento da arquitetura do frontend, contribuindo para a construção de componentes reutilizáveis e responsivos. Sua atuação garantiu a eficiência do aplicativo, proporcionando uma interação otimizada para os usuários.

Agradecemos a todos os desenvolvedores por suas valiosas contribuições para o frontend do projeto Asclepius. Se você tiver dúvidas, sugestões ou deseja colaborar, sinta-se à vontade para entrar em contato com a equipe de desenvolvimento.

## **Conclusão**

O projeto **Asclepius-WEB** foi desenvolvido como uma iniciativa acadêmica para explorar conceitos fundamentais na disciplina de **Programação para Web 2**. Este aplicativo de gerenciamento eletrônico de vacinação, em integração com a API Asclepius, proporcionou uma experiência prática e valiosa no desenvolvimento de soluções mobile modernas, utilizando tecnologias como TypeScript e React.

Apesar de ser um projeto acadêmico, o Asclepius representa um marco importante no processo de aprendizado, abordando desde a criação de interfaces amigáveis até a integração com serviços externos de maneira eficiente e segura.

Agradecemos a todos os envolvidos neste projeto, reconhecendo o esforço e dedicação que contribuíram para sua conclusão bem-sucedida. Esperamos que esta experiência tenha sido enriquecedora e que sirva como base para futuras iniciativas.

Para mais informações ou para compartilhar feedback, explore a [página no GitHub](https://github.com/AsclepiusPW/Asclepius-Mobile.git) ou abra uma [issue](https://github.com/AsclepiusPW/Asclepius-Mobile.git/issues). Este projeto conclui sua trajetória como parte do processo de avaliação acadêmica, mas permanece disponível como referência e exemplo de aplicação prática.

Obrigado por fazer parte do projeto Asclepius-Mobile!
