/* eslint-disable react-hooks/exhaustive-deps */
import "./Card.css";

import { useDispatch } from "react-redux";
import {
  updateCardValues,
  setSortedKeysArr,
  updateLastUpdateSortedKeys,
} from "../../../redux/slices/cardSlice";

function CardEdit({
  firstValue,
  secondValue,
  exchangeRate,
  cardId,
}) {
  const dispatch = useDispatch();

  const dispathUpdatedValues = (tempFirst, tempSecond) => {
    dispatch(
      updateCardValues({
        id: cardId,
        firstValue: tempFirst,
        secondValue: tempSecond,
      })
    );
  };
  const onFirstValueChange = (event) => {
    let newValue = parseFloat(event.target.value);
    const tempFirst = newValue;
    const tempSecond = parseFloat(newValue * exchangeRate);
    dispathUpdatedValues(tempFirst, tempSecond);
  };

  const onSecondValueChange = (event) => {
    let newValue = parseFloat(event.target.value);
    const tempFirst = parseFloat(newValue / exchangeRate);
    const tempSecond = newValue;
    dispathUpdatedValues(tempFirst, tempSecond);
  };

  const onBlur = () => {
    dispatch(
      updateLastUpdateSortedKeys({
        id: cardId,
      })
    );
    dispatch(setSortedKeysArr());
  };

  return (
    <>
      <input
        className="input-currency"
        type="number"
        maxLength={10}
        value={firstValue}
        onChange={(event) => {
          onFirstValueChange(event);
        }}
        data-testid="input-1"
        onBlur={onBlur}
      />
      <input
        className="input-currency"
        type="number"
        maxLength={10}
        value={secondValue}
        onChange={(event) => {
          onSecondValueChange(event);
        }}
        data-testid="input-2"
        onFocus={onBlur}
      />
    </>
  );
}

export default CardEdit;
