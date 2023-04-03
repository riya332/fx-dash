/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { convertCurrecyObjintoList } from "../../utility/currencyUtility";
import { selectSecondCurrency, selectFirstCurrency} from "../../redux/slices/cardSlice";
import { useSelector ,useDispatch } from "react-redux";

function CurrencySelectors({allCurrencies}) {
  const {firstCurrency, secondCurrency } = useSelector((state) => state.cards);
  const [CurrList1, setCurrList1] = useState([]);
  const [CurrList2, setCurrList2] = useState([]);  
  const dispatch = useDispatch();

  useEffect(() => {
    if (allCurrencies && Object.keys(allCurrencies).length !== 0) {
      setCurrList1(convertCurrecyObjintoList(allCurrencies));
      setCurrList2(convertCurrecyObjintoList(allCurrencies));
    }
  }, [allCurrencies]);

  const onCurrencyChange = ({value}, first) => {
    if(first){
      dispatch(selectFirstCurrency(allCurrencies[value]))
    } else {
      dispatch(selectSecondCurrency(allCurrencies[value]))
    }
  };
  
  useEffect(() => {
    if (allCurrencies &&  Object.keys(allCurrencies).length !== 0) {
      setCurrList2([...convertCurrecyObjintoList(allCurrencies, firstCurrency.code)]);
    }
  }, [firstCurrency]);

  useEffect(() => {
    if ( allCurrencies &&  Object.keys(allCurrencies).length !== 0) {
      setCurrList1([...convertCurrecyObjintoList(allCurrencies, secondCurrency.code)]);
    }
  }, [secondCurrency]);

  return (
    <>
      <Select
        onChange={(code) => onCurrencyChange(code, true)}
        placeholder={"From Currency"}
        className="select-currency"
        options={CurrList1}
      ></Select>
      <Select
        onChange={(code) => onCurrencyChange(code, false)}
        placeholder={"To Currency"}
        className="select-currency"
        options={CurrList2}
      ></Select>
    </>
  );
}

export default CurrencySelectors;
