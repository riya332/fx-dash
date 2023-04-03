import { render, screen,fireEvent } from "@testing-library/react";
import Card from "./Card";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { sortOptions, sortDir } from "../../../constants";
import { useGetFxRateQuery } from "../../../redux/slices/currencyApiSlice";

// Mock the currency API slice
jest.mock("../../../redux/slices/currencyApiSlice", () => ({
    useGetFxRateQuery: jest.fn(() => (
    {
      data: {
        result: 0.82,
      },
      isError: false,
      refetch: jest.fn(),
      isSuccess: true,
      isLoading: false,
    })),
  }));
  
  // Mock the card slice functions
  jest.mock("../../../redux/slices/cardSlice", () => ({
    updateCardExchangeRate: jest.fn(),
    updateLastUpdateSortedKeys: jest.fn(),
    updateFxRateSortedKeys: jest.fn(),
    setSortedKeysArr: jest.fn(),
  }));
const mockStore = configureStore({});

jest.mock("./CardEdit", () => {
  return () => <div>CardEdit Component</div>;
});
jest.mock("./CardInfo", () => {
  return () => <div>Card Info Component</div>;
});
describe("tests for card component", () => {
  let state, store;
  const card = {
    firstCurrency: "USD",
    secondCurrency: "EUR",
    exchangeRate: 0.82,
    firstValue: 100,
    secondValue: 82,
    id: "USD_EUR",
    updatedAt: new Date(),
  };
  beforeAll(() => {
    state = {
      cardsObj: {},
      sortedKeys: [],
      cardAlreadyPresent: false,
      errorInFetchingExchangeRate: false,
      firstCurrency: {},
      secondCurrency: {},
      sortOptions: {
        selectedDirection: sortDir.ASC,
        selectedType: sortOptions.CREATE_DATE,
      },
      createdDateSortedKeys: [],
      fxRateSortedKeys: [],
      lastUpdateSortedKeys: [],
    };
    store = mockStore(state);
  });
  test("renders Card component", () => {

    render(
      <Provider store={store}>
        <Card card={{ card }} />
      </Provider>
    );
    expect(screen.getByText("CardEdit Component")).toBeInTheDocument();
    expect(screen.getByText("Card Info Component")).toBeInTheDocument();
  });
  // it('should call refresh', () => {
  //   render(
  //       <Provider store={store}>
  //         <Card card={{ card }} />
  //       </Provider>
  //   );
  //   const refreshbutton = screen.getByTestId('refresh-btn');
  //   expect(refreshbutton).toBeInTheDocument();
  //   fireEvent.click(refreshbutton);
  //   expect(useGetFxRateQuery).toHaveBeenCalledWith(
  //       {
  //         fromCurrency: "USD",
  //         toCurrency: "EUR",
  //       },
  //       { skip: true }
  //     );
  //     expect(useGetFxRateQuery.mock.results[0].value.refetch).toHaveBeenCalled();
  // });
});
