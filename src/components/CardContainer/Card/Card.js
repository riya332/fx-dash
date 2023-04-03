import "./Card.css";
import React from "react";
import CardInfo from "./CardInfo";
import CardEdit from "./CardEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useGetFxRateQuery } from "../../../redux/slices/currencyApiSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  updateCardExchangeRate,
  updateLastUpdateSortedKeys,
  updateFxRateSortedKeys,
  setSortedKeysArr,
} from "../../../redux/slices/cardSlice";

function Card({ card }) {
  const {
    firstCurrency,
    secondCurrency,
    exchangeRate,
    firstValue,
    secondValue,
    id,
    updatedAt,
  } = card;
  // skip is set to true to avoid sending api call on load.
  const [skip, setSkip] = useState(true);
  const dispatch = useDispatch();

  const {
    data = {},
    isError,
    refetch,
    isSuccess,
    isLoading,
  } = useGetFxRateQuery(
    {
      fromCurrency: firstCurrency,
      toCurrency: secondCurrency,
    },
    { skip }
  );

  const onRefresh = async () => {
    if (skip) {
      setSkip(false);
      return;
    }
    await refetch();
  };
  useEffect(() => {
    if (data && data.result) {
      dispatch(updateCardExchangeRate({ id, result: data.result }));
      dispatch(updateLastUpdateSortedKeys({ id }));
      if (exchangeRate !== data.result) {
        dispatch(updateFxRateSortedKeys({ id }));
      }
      dispatch(setSortedKeysArr());
    }
  }, [isSuccess]);

  return (
    <div className="card" key={id}>
      <CardInfo
        firstCurrency={firstCurrency}
        secondCurrency={secondCurrency}
        exchangeRate={exchangeRate}
      ></CardInfo>
      <div className="right-elem">
        <button
          onClick={onRefresh}
          className="refresh-btn"
          data-testid="refresh-btn"
        >
          <FontAwesomeIcon
            spin={isLoading}
            border
            icon={faRotateRight}
            size="2xl"
            color={"gray"}
          />
        </button>
        <CardEdit
          firstValue={firstValue}
          secondValue={secondValue}
          exchangeRate={exchangeRate}
          cardId={id}
        ></CardEdit>
        <div className="last-updated">
          Updated: {new Date(updatedAt).toLocaleString()}
        </div>
      </div>

      {(isError || (isSuccess && !data.result)) && (
        <span>Error while fetching value</span>
      )}
    </div>
  );
}

export default Card;
