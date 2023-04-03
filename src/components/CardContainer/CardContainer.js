import Card from "./Card/Card";
import "./CardContainer.css";
import { useSelector } from "react-redux";
import React, {useEffect, useRef} from 'react';
import { sortOptions as sortConstants } from "../../constants";
function CardContainer() {
  const {sortedKeys = [],  cardsObj={}} = useSelector((state) => state.cards);
  const  startElemRef  = useRef();
  const { fetchingExchangeRate, sortOptions } = useSelector(
    (state) => state.cards
  );
  const scrollToNewElement = () => {
    if(sortOptions.selectedDirection === sortConstants.ASC){
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    } else {
      startElemRef.current.scrollIntoView({ behavior: "smooth" })
    }
  };

  useEffect(() => {
    if (!fetchingExchangeRate) {
      scrollToNewElement()
    }
  }, [fetchingExchangeRate]);
  
  return (
    <div className="container">
      <div ref={startElemRef}></div>
      {sortedKeys.map((cardId, index) => {
        return (
          <Card
            key = {`${cardId}_${index}`}
            card = {cardsObj[cardId]}
          />
        );
      })}
    </div>
  );
}

export default CardContainer;
