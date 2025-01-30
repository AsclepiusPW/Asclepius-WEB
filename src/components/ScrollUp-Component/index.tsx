//Estilização
import "./style.css";

//Ícones
import { FaArrowUp } from "react-icons/fa";

export const ScrollUp = () => {
    window.addEventListener("scroll", () => {
        const scrollup = document.querySelector(".scrollup");
        if(scrollY >= 560) scrollup?.classList.add("showScroll");
        else scrollup?.classList.remove("showScroll");
    });

    return(
        <a href="#" className="scrollup">
            <p className="scrollUp-icon">
                <FaArrowUp/>
            </p>
        </a>
    )
};