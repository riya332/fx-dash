export const getNewCard = (firstCurrency, secondCurrency, exchangeRate) => {
  return {
    id: firstCurrency + "_" + secondCurrency,
    firstCurrency: firstCurrency,
    secondCurrency: secondCurrency,
    exchangeRate: exchangeRate,
    firstValue: 1,
    secondValue: 1 * exchangeRate,
    createdDate: Date.now(),
    updatedAt: Date.now(),
  };
};

export const cardExists = (cardsObj, firstCurrency, secondCurrency) => {
  if (Object.keys(cardsObj).length !== 0) {
    return cardsObj?.[
      `${firstCurrency?.code}_${secondCurrency?.code}`
    ]
      ? true
      : false;
  }
    return false;
  }
