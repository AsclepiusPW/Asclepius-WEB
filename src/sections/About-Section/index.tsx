//Estilização
import "./style.css";

//Ícones
import { FaUserDoctor } from "react-icons/fa6";
import { TbVaccine } from "react-icons/tb";
import { FaMapLocationDot } from "react-icons/fa6";

//Imagens
import asideImage from "../../assets/About-LeadingPage.png";

//Definindo class
export const AboutSection = () => {
    return(
        <section className="leadingAside-about flex section" id="leading-about">
            <div className="asideAbout-image">
                <img src={asideImage} alt="Imagem de apresentação" className="imageAbout" />
            </div>

            <div className="asideAbout-content flex">
                <h3 className="contentAbout-title">Asclepius</h3>

                <p className="contentAbout-description">
                    <span>Asclepius</span> é um sistema de gerenciamento eletrônico de vacinação 
                    que permite aos usuários realizarem seu cadastro e acompanhar, de forma prática 
                    e segura, as vacinas e os calendários de vacinação disponíveis em sua região. 
                    Com funcionalidades que facilitam o acesso à informação e o monitoramento de doses e 
                    agendamentos, o <span>Asclepius</span> oferece um ambiente centralizado e digital para que usuários 
                    estejam sempre atualizados quanto às recomendações de saúde e imunização, promovendo a 
                    proteção da saúde de forma rápida e acessível.
                </p>

                <div className="contentList-details flex">
                    <div className="itemListDetails flex">
                        <p className="itemList-icon">
                            <TbVaccine/>
                        </p>

                        <p className="itemList-title">
                            Vacinas
                        </p>

                        <p className="itemList-quantity">
                            +5 Mil vacinas
                        </p>
                    </div>

                    <div className="itemListDetails flex">
                        <p className="itemList-icon">
                            <FaUserDoctor/>
                        </p>

                        <p className="itemList-title">
                            Vacinas
                        </p>

                        <p className="itemList-quantity">
                            +8 Mil Médicos
                        </p>
                    </div>

                    <div className="itemListDetails flex">
                        <p className="itemList-icon">
                            <FaMapLocationDot/>
                        </p>

                        <p className="itemList-title">
                            Localização
                        </p>

                        <p className="itemList-quantity">
                            +5 Mil Cidades
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}