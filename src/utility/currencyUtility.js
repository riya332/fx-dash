export const convertCurrecyObjintoList = (currencyObj, removeCurrCode) => {
  const objCopy = { ...currencyObj };
  if(removeCurrCode){
    delete objCopy[removeCurrCode];
  }
  const currencyList = Object.values(objCopy).map((curr) => {
    return {
      value: curr.code,
      label: `${curr.code} - ${curr.description}`,
    };
  });
  return currencyList;
};
