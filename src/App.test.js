import React from 'react';
import { render,screen } from '@testing-library/react';
import App from './App';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { sortDir,sortOptions } from './constants';
const mockStore = configureStore({});

jest.mock('./components/ControlBar/ControlBar', () => {
  return () => <div>Mock ControlBar Component</div>;
});
jest.mock('./components/SortToolBar/SortToolBar', () => {
  return () => <div>Mock ToolBar Component</div>;
});
jest.mock('./components/CardContainer/CardContainer', () => {
  return () => <div>Mock CardContainer Component</div>;
});
describe('App', () => {
  let state, store;

  beforeAll(()=>{
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
    };;
    store = mockStore(state);
  })
  it('renders ControlBar component', () => {
    render(<Provider store={store}><App /></Provider>);
    expect(screen.getByText('Mock ControlBar Component')).toBeInTheDocument();
  });

  it('renders ToolBar component', () => {
    render(<Provider store={store}><App /></Provider>);
    expect(screen.getByText('Mock ToolBar Component')).toBeInTheDocument();

  });

  it('renders CardContainer component', () => {
    render(<Provider store={store}><App /></Provider>);
    expect(screen.getByText('Mock CardContainer Component')).toBeInTheDocument();

  });
});