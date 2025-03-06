//Importações
import { useState, useEffect, useMemo } from "react";

//Estilização
import "./style.css";

//Componentes
import { Header } from "../../components/Header-Component";
import { OptionsDoctorsSlider } from "../../Sliders/OptionsDoctors-slider";
import { VaccineComponent } from "../../components/Vaccine-Component";
import { Footer } from "../../components/Footer-Component";

//Types
import { VaccineDTO } from "../../types/vaccineTypes";

//Contextos
import { useVaccine } from "../../Contexts/VaccineContext";

//Icons
import { GrPrevious, GrNext } from "react-icons/gr";

//Class
export const VaccinesPage = () => {
  //Definindo o contexto
  const { allVaccines } = useVaccine();

  //State
  const [allListVaccines, setAllListVaccines] = useState<VaccineDTO[]>();
  const [visibleVaccines, setVisibleVaccines] = useState<VaccineDTO[]>();
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState<string>("");

  //Effect
  useEffect(() => {
    (() => {
      setAllListVaccines(allVaccines);
      setVisibleVaccines(allVaccines);
    })();
  }, [allVaccines]);

  const filteredVaccines = useMemo(() => {
    if (!filter) return allListVaccines;

    switch (filter) {
      case "withEvents":
      case "inEvents": // Combinação de filtros idênticos
        return allListVaccines?.filter(
          (vaccine) => vaccine.vaccinationCalendar.length > 0
        );

      case "recent":
        return [...allVaccines].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      default:
        return allListVaccines;
    }
  }, [filter, allListVaccines]);

  useEffect(() => {
    setVisibleVaccines(filteredVaccines);
  }, [filteredVaccines]);

  //Controle de listagem de vacinas
  useEffect(() => {
    //Ordenando o array
    const sortedVaccines = [...allVaccines].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const startIndex = currentPage * 6; // Índice inicial do bloco
    const endIndex = startIndex + 6; // Índice final do bloco
    const currentVaccines = sortedVaccines.slice(startIndex, endIndex);

    setVisibleVaccines(currentVaccines);
  }, [currentPage, allVaccines]);

  //Funções
  const handleNext = () => {
    if ((currentPage + 1) * 6 < allVaccines.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSearch = (query: string) => {
    if (query === "") {
      setVisibleVaccines(allListVaccines);
    } else {
      setVisibleVaccines(
        allListVaccines?.filter((vaccine) =>
          vaccine.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div
      className="container flex apresentation vaccineScreen"
      id="vaccineScreen"
    >
      <Header
        searchVisibility={true}
        actionPage="Vaccine"
        titleMenu="Vacinas cadastradas"
        functionSearch={handleSearch}
      />

      <div className="apresentationContainer flex">
        <div className="filter-container flex">
          <h3 className="filterVaccines">Listar vacinas por:</h3>
          <select
            className="filterSelect"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Selecione um filtro</option>
            <option value="withEvents">Vacinas com eventos</option>
            <option value="recent">Vacinas recentes adicionadas</option>
            <option value="inEvents">Vacinas em eventos</option>
          </select>
        </div>

        <div className="listVaccines grid">
          {visibleVaccines?.map((vaccine) => (
            <VaccineComponent vaccine={vaccine} key={vaccine.id} />
          ))}
        </div>

        <div className="navigation-buttons flex">
          <button
            onClick={handlePrev}
            className="prev-button flex"
            disabled={currentPage === 0}
          >
            <GrPrevious />
            Anterior
          </button>

          <p className="button-description">
            {currentPage * 6 + 1} -{" "}
            {Math.min((currentPage + 1) * 6, allVaccines.length)} de{" "}
            {allVaccines.length}
          </p>

          <button
            onClick={handleNext}
            className="next-button flex"
            disabled={(currentPage + 1) * 6 >= allVaccines.length}
          >
            Próximo
            <GrNext />
          </button>
        </div>

        <div className="gridListVaccines flex"></div>

        <OptionsDoctorsSlider />
        <Footer systemPages={true} />
      </div>
    </div>
  );
};
