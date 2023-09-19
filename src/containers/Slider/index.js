import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) => (new Date(evtA.date) > new Date(evtB.date) ? -1 : 1) // changement de signe pour trier par date décroissante
  );
  // console.log(Date);
  console.log(byDateDesc);
  // console.log(index);

  const nextCard = () => {
    setIndex((prevIndex) =>
      prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
    ); // enlever 1 a la longueurdu tableau
  };

  useEffect(() => {
    const timeout = setTimeout(nextCard, 5000);

    return () => clearTimeout(timeout); // Nettoie le timeout lorsqu'il y a un changement de slide
  }, [index, byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${_.date}`} // problème ici, changement de clé pour _.date
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // changer idx par index
                  // faire un changement de slide au click
                  onClick={() => {
                    setIndex(radioIdx);
                  }}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
