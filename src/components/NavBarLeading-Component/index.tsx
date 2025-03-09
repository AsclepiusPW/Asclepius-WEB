//Importações
import { useState, useEffect } from "react";

//Imagens
import logo from "../../assets/logo.png";

//Estilização
import "./style.css";

//Props

export const NavBarLeading = () => {
    //States
    const [activeLink, setActiveLink] = useState('leading-home')

    const handleNavLinkClick = (link: string) => {
        setActiveLink(link);
        console.log("link:", link);
    };

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const header = document.querySelector("header");
        if (header) {
            if (scrollY >= 80) {
                header.classList.add("scrollHeader");
            } else {
                header.classList.remove("scrollHeader");
            }
        }

        // Verifica a posição das seções na página
        const sections = document.querySelectorAll("section");
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollY >= sectionTop - 10 && scrollY < sectionTop + sectionHeight - 10) {
                if (sectionId) {
                    console.log("SectionId: ", sectionId);
                    setActiveLink(sectionId);
                }
            }
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        (() => {
            console.log("Active: ", activeLink)
        })()
    }, [setActiveLink])

    return (
        <nav className="leadingPage-menu flex header">
            <div className="menu-logo">
                <img src={logo} alt="Asclepius" className="home" />
            </div>

            <div className="menu-contents flex">
                <ul className="menu-list flex">
                    <li className="menuList-item">
                        <a 
                            href="#leading-home" 
                            className={`item-navlink ${activeLink === 'leading-home' ? 'activeLink' : ''}`}
                            onClick={() => handleNavLinkClick("leading-home")}
                        >Home</a>
                    </li>
                    <li className="menuList-item">
                        <a 
                            href="#leading-about"
                            className={`item-navlink ${activeLink === 'leading-about' ? 'activeLink' : ''}`}
                            onClick={() => handleNavLinkClick("leading-about")}
                        >Sobre</a>
                    </li>
                    <li className="menuList-item">
                        <a 
                            href="#leading-singUp"
                            className={`item-navlink ${activeLink === 'leading-singUp' ? 'activeLink' : ''}`}
                            onClick={() => handleNavLinkClick("leading-singUp")}
                        >Cadastrar</a>
                    </li>
                    <li className="menuList-item">
                        <a 
                            href="#leading-review"
                            className={`item-navlink ${activeLink === 'leading-review' ? 'activeLink' : ''}`}
                            onClick={() => handleNavLinkClick("leading-review")}
                        >Opiniões</a>
                    </li>
                </ul>

                <button className="menu-button button" onClick={() => handleNavLinkClick("leading-login")}>
                    <a href="#leading-login">Login</a>
                </button>
            </div>
        </nav>
    )
}