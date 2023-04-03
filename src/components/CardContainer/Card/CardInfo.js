/* eslint-disable react-hooks/exhaustive-deps */
import "./Card.css";

function CardInfo({firstCurrency,
    secondCurrency,
    exchangeRate}) {
  return (
      <div className="left-elem">
        <div className="currency currency-1">{firstCurrency}</div>
        <div className="exchange-rate">{exchangeRate}</div>
        <div className="currency currency-2">{secondCurrency}</div>
      </div>
  );
}

export default CardInfo;
