import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) => (new Date(evtA.date) < new Date(evtB.date) ? -1 : 1) // changement de signe pour trier par date décroissante
  );
  // console.log(Date);
  // console.log(`byDateDesc.length : ${byDateDesc.length}`);
  console.log(`index : ${index}`);

  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    ); // enlever 1 a la longueur du tableau
  };

  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.description}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt={event.title} />{" "}
          {/* ajout d'un alt pour l'image pour le test unitaire */}
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((_, radioIdx) => (
            <input
              key={`${_.title}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
