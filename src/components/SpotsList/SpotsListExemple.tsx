import React from "react";
import SpotCard from "../SpotCard/SpotCard";
import "./SpotsList.css";

const SpotsListExemple = (): React.ReactElement => {
  const exampleSpots = {
    spots: [
      {
        _id: "650b35179a56c4d46c7319dd",
        name: "Camp Nou Stadium",
        imageUrl:
          "https://media-edg.barcelona.cat/wp-content/uploads/2018/04/12183422/RENDER-5-ok.jpg",
        spotUse: "Stadium",
        visited: true,
        user: "64ff3f0a057a1406690b8bd1",
        openingYear: 1957,
        description:
          "El Camp Nou (Campo Nuevo en español), denominado actualmente Spotify Camp Nou por motivos de patrocinio,11​ es un recinto deportivo propiedad del Fútbol Club Barcelona, ubicado en el distrito de Les Corts de la ciudad de Barcelona, España. Se inauguró el 24 de septiembre de 1957, siendo el estadio con mayor capacidad de Europa y el tercero a nivel mundial.Actualmente está cerrado debido a una remodelación del estadio. 12​La capacidad del estadio ha variado desde su aforo inicial de alrededor de noventa mil localidades, a su máximo aforo de ciento veinte mil espectadores, con la construcción con motivo del Mundial de España 1982, de la tercera gradería.13​ Su aforo actual desde 1998 está por debajo de los cien mil espectadores, tras implantar las localidades de asiento para todo el estadio y ser catalogado por la UEFA con la máxima distinción, «estadio de élite».14​15​",
        isVisited: true,
      },
      {
        _id: "650b35bd9a56c4d46c7319de",
        name: "Montjuïc Castle",
        imageUrl:
          "https://estatics-nasia.dtibcn.cat/nasia-pro/media/visitescastell.760x428.48d2973e.jpg",
        spotUse: "Historic Castle",
        visited: false,
        user: "64ff3f0a057a1406690b8bd1",
        openingYear: 1640,
        description:
          "El castillo de Montjuic (en catalán: Castell de Montjuïc; pronunciación: español local [moncʝ͡uˈik], catalán [mun̪ʒuˈik]) es una antigua fortaleza militar situada en la montaña de Montjuic, en la ciudad de Barcelona. La fortaleza fue una instalación del Ejército español, aunque posteriormente fue cedida al ayuntamiento de la ciudad, quien la gestiona actualmente. Históricamente, el castillo ha tenido un importante papel en diversos episodios de la historia de Barcelona.",
        isVisited: false,
      },
      {
        _id: "650b3aa59a56c4d46c7319e3",
        name: "Palau de la música",
        imageUrl:
          "https://www.barcelona.de/images/palau-de-la-musica/480300-palau-de-la-musica-konzertsaal-2.jpg",
        visited: true,
        user: "64ff3f0a057a1406690b8bd1",
        openingYear: 1676,
        description:
          "El Palau de la Música Catalana es propiedad de la Associació Orfeó Català, que tiene por objeto, conforme a su tradición, el fomento de la cultura catalana, en especial en la vertiente musical y con una atención preferente a la música coral. La Asociación desarrolla sus objetivos a través de la Fundación Orfeón Catalán-Palacio de la Música Catalana, que concentra la gestión de toda la actividad de los coros del Orfeó y del Palau de la Música Catalana.",
        spotUse: "Auditorio",
        isVisited: true,
      },
    ],
  };

  return (
    <ul className="spots-list">
      {exampleSpots.spots.map((spot, listPosition) => (
        <li key={spot.name} className="spots-list__spot">
          <SpotCard spot={spot} listPosition={listPosition} />
        </li>
      ))}
    </ul>
  );
};

export default SpotsListExemple;
