//Importações
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

//Estilização
import "./style.css";

//Componentes
import { Header } from "../../components/Header-Component";
import { OptionsDoctorsSlider } from "../../Sliders/OptionsDoctors-slider";
import { RegisterVaccination } from "../../components/RegisterVaccination-Component";
import { Footer } from "../../components/Footer-Component";

//Types
import { VaccineDTO } from "../../types/vaccineTypes";

//Contextos
import { useVaccine } from "../../Contexts/VaccineContext";

//Class
export const VaccinesPage = () => {
  //Definindo o contexto
  const { allVaccines } = useVaccine();

  //State
  const [allListVaccines, setAllListVaccines] = useState<VaccineDTO[]>();
  const [visibleVaccines, setVisibleVaccines] = useState<VaccineDTO[]>();
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

  useEffect(() => {
    (() => {
      if (filter !== "") {
        switch (filter) {
          case "withEvents":
            setVisibleVaccines(
              allListVaccines?.filter(
                (vaccine) => vaccine.vaccinationCalendar.length > 0
              )
            );
            break;
          case "recent":
            setVisibleVaccines(
              allListVaccines?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
            );
            break;
          case "inEvents":
            setVisibleVaccines(
              allListVaccines?.filter(
                (vaccine) => vaccine.vaccinationCalendar.length > 0
              )
            );
            break;
          default:
            setVisibleVaccines(allListVaccines);
            break;
        }
      }
    })();
  }, [filter]);

  //Funções
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

        <div className="gridListVaccines flex">
          <div className="listVaccines grid">
            {visibleVaccines?.map((vaccine) => (
              <div className="itemVaccine flex" key={vaccine.id}>
                <p className="itemVaccine-name">{vaccine.name}</p>
              </div>
            ))}
          </div>

          <div className="calendarVaccines"></div>
        </div>

        <OptionsDoctorsSlider />
        <Footer systemPages={true} />
      </div>
    </div>
  );
};
