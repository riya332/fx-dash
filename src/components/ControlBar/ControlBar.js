/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./ControlBar.css";
import { useGetFxCurrenciesQuery } from "../../redux/slices/currencyApiSlice";
import { fetchExchangeRate, deleteCards } from "../../redux/slices/cardSlice";
import { useSelector, useDispatch } from "react-redux";
import CurrencySelectors from "./CurrencySelectors";
function ControlBar() {
  const { data = {}, error, isFetching, isError } = useGetFxCurrenciesQuery();
  const {
    errorInFetchingExchangeRate,
    cardAlreadyPresent,
    fetchingExchangeRate,
    cardsObj,
    firstCurrency,
    secondCurrency,
  } = useSelector((state) => state.cards);
  const [duplicateError, setDuplicateError] = useState(false);
  const [noCardsPresent, setNoCardPresent] = useState(true);
  const [noSelection, setNoSelection] = useState(true);

  const dispatch = useDispatch();

  const onAddCard = async () => {
    if (!cardAlreadyPresent) {
      await dispatch(fetchExchangeRate()).unwrap();
    } else {
      setDuplicateError(cardAlreadyPresent);
    }
  };

  useEffect(() => {
    if (Object.keys(cardsObj).length > 0) {
      setNoCardPresent(false);
    } else {
      setNoCardPresent(true);
    }
  }, [cardsObj]);

  useEffect(() => {
    setDuplicateError(cardAlreadyPresent);
    if (
      Object.keys(firstCurrency).length &&
      Object.keys(secondCurrency).length
    ) {
      setNoSelection(false);
    } else {
      setNoSelection(true);
    }
  }, [firstCurrency, secondCurrency]);

  const onDeleteCards = () => {
    dispatch(deleteCards());
    setDuplicateError(false);
    setNoCardPresent(true);
  };
  return (
    <>
      <div className="controlbar">
        <CurrencySelectors allCurrencies={data.symbols}></CurrencySelectors>
        <button
          disabled={
            noSelection || duplicateError || fetchingExchangeRate || isFetching
          }
          className="control-btn add"
          onClick={onAddCard}
        >
          ADD CARD
        </button>
        <button
          disabled={noCardsPresent || isFetching}
          className="control-btn delete"
          onClick={onDeleteCards}
        >
          DELETE ALL CARDS
        </button>
      </div>
      {isError && (
        <div className="errordiv-controlbar">
          Error in fetching symbols {error.error}
        </div>
      )}
      {errorInFetchingExchangeRate && (
        <div className="errordiv-controlbar">
          Error in fetching Exchange Rate
        </div>
      )}
      {duplicateError && (
        <div className="errordiv-controlbar">Currency pair already exists</div>
      )}
    </>
  );
}

export default ControlBar;
