import React from 'react';
import { render,screen } from '@testing-library/react';
import CardInfo from './CardInfo';

describe('CardInfo', () => {
  it('should render the first and second currency and exchange rate', () => {
    const firstCurrency = 'USD';
    const secondCurrency = 'EUR';
    const exchangeRate = 0.85;
    render(
      <CardInfo
        firstCurrency={firstCurrency}
        secondCurrency={secondCurrency}
        exchangeRate={exchangeRate}
      />
    );

    expect(screen.getByText(firstCurrency)).toBeInTheDocument();
    expect(screen.getByText(secondCurrency)).toBeInTheDocument();
    expect(screen.getByText(exchangeRate)).toBeInTheDocument();
  });
});