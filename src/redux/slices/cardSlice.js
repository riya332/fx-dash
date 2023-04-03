import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../utility/clientApi";
import { sortOptions as sortConstants , sortDir as sortDirConstants } from "../../constants";
import { getNewCard, cardExists } from "../../utility/cardsUtility";

export const initialState = {
  cardsObj: {},
  sortedKeys: [],
  cardAlreadyPresent: false,
  errorInFetchingExchangeRate: false,
  fetchingExchangeRate: false,
  firstCurrency: {},
  secondCurrency: {},
  sortOptions: {
    selectedDirection: sortDirConstants.ASC,
    selectedType: sortConstants.CREATE_DATE,
  },
  createdDateSortedKeys: [],
  fxRateSortedKeys: [],
  lastUpdateSortedKeys: [],
};
export const fetchExchangeRate = createAsyncThunk(
  "card.fetchExchangeRate",
  async (_, { getState }) => {
    const {cards} = getState();
    if (cards.cardAlreadyPresent || !Object.keys(cards.firstCurrency).length || !Object.keys(cards.secondCurrency).length) {
      return;
    }
    const response = await client.get(
      `https://api.exchangerate.host/convert?from=${cards.firstCurrency.code}&to=${cards.secondCurrency.code}`
    );
    return { response: response.data, fromCurrency: cards.firstCurrency.code , toCurrency: cards.secondCurrency.code };
  }
);
export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    selectFirstCurrency: (state, action) => {
      state.firstCurrency = action.payload;
      state.cardAlreadyPresent = cardExists(state.cardsObj, state.firstCurrency, state.secondCurrency);
      state.errorInFetchingExchangeRate = false;
    },
    selectSecondCurrency: (state, action) => {
      state.secondCurrency = action.payload;
      state.cardAlreadyPresent = cardExists(state.cardsObj, state.firstCurrency, state.secondCurrency);
      state.errorInFetchingExchangeRate = false;
    },
    addCard: (state, payload) => {

      let id = payload.id;
      // add in cards OBJ
      state.cardsObj[id] = payload;
      state.cardAlreadyPresent = true;
      //inset into keys array
      cardSlice.caseReducers.updateCreatedDateSortedKeys(state, {
        id
      });
      cardSlice.caseReducers.updateLastUpdateSortedKeys(state,{payload:{
        id
      }});
      cardSlice.caseReducers.updateFxRateSortedKeys(state, {payload:{ id }});

      cardSlice.caseReducers.setSortedKeysArr(state);
    }, // calll only when a card is added
    updateCreatedDateSortedKeys: (state, payload) => {
      state.createdDateSortedKeys[state.createdDateSortedKeys.length] =
        payload.id;
    }, // calll only when a card is added or edited
    updateLastUpdateSortedKeys: (state, action) => {
      let index = state.lastUpdateSortedKeys.findIndex((x) => x === action.payload.id); 
      if(index >= 0){
        let keysArr = [...state.lastUpdateSortedKeys]
        keysArr.splice(index, 1); 
        keysArr.push(action.payload.id)
        state.lastUpdateSortedKeys = keysArr;
      } else {
        state.lastUpdateSortedKeys[state.lastUpdateSortedKeys.length] =
        action.payload.id;
      }
    }, // call when card is edited or added
    updateFxRateSortedKeys: (state, action) => {
      let index = state.fxRateSortedKeys.findIndex((x) => x === action.payload.id);
      if(index < 0){
        state.fxRateSortedKeys.push(action.payload.id);
      }
      if(state.fxRateSortedKeys.length > 1){
        state.fxRateSortedKeys = state.fxRateSortedKeys.sort(
          (a, b) =>
          parseFloat(state.cardsObj[a].exchangeRate) -
           parseFloat(state.cardsObj[b].exchangeRate)
        );
      }
    },
    updateCardExchangeRate: (state, action) => {
      const card = state.cardsObj[action.payload.id];
      card.exchangeRate = action.payload.result;
      card.firstValue = 1;
      card.secondValue = action.payload.result;
      card.updatedAt = Date.now();

    },
    updateCardValues: (state, action) => {
      const card = state.cardsObj[action.payload.id];
      card.firstValue = action.payload.firstValue;
      card.secondValue = action.payload.secondValue;
      card.updatedAt = Date.now();
    },
    deleteCards: (state) => {
      state.cardsObj = {};
      state.sortedKeys = [];
      state.cardAlreadyPresent = false;
      state.createdDateSortedKeys = [];
      state.fxRateSortedKeys = [];
      state.lastUpdateSortedKeys = [];
      state.errorInFetchingExchangeRate = false;
    },

    updateSort: (state, action) => {
      state.sortOptions.selectedType = action.payload.sortType;
      state.sortOptions.selectedDirection = action.payload.sortDir;
      cardSlice.caseReducers.setSortedKeysArr(state);
    },

    setSortedKeysArr: (state) => {
      let arr = [];
      switch (state.sortOptions.selectedType) {
        case sortConstants.CREATE_DATE:
          arr = state.createdDateSortedKeys.slice();
          break;
        case sortConstants.LAST_UPDATE:
          arr = state.lastUpdateSortedKeys.slice();
          break;
        case sortConstants.FX_RATE:
          arr = state.fxRateSortedKeys.slice();
          break;
        default:
          state.sortedKeys = state.createdDateSortedKeys;
      }
      state.sortedKeys =
        state.sortOptions.selectedDirection === sortDirConstants.ASC ? arr : arr.reverse();
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchExchangeRate.fulfilled, (state, action) => {
      state.fetchingExchangeRate = false;
      if (action.payload.response.success && action.payload.response.result) {
        state.errorInFetchingExchangeRate = false;
        const newCard = getNewCard(
          action.payload.fromCurrency,
          action.payload.toCurrency,
          action.payload.response.result
        );
        cardSlice.caseReducers.addCard(state, newCard);
      } else {
       state.errorInFetchingExchangeRate = true;
      }
    }).addCase(fetchExchangeRate.pending, (state, action)=>{
      state.fetchingExchangeRate = true;
    }).addCase(fetchExchangeRate.rejected, (state, action) =>{
      state.fetchingExchangeRate = false;
      state.errorInFetchingExchangeRate = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  addCard,
  updateCardExchangeRate,
  updateCardValues,
  deleteCards,
  selectFirstCurrency,
  selectSecondCurrency,
  updateSort,
  updateLastUpdateSortedKeys,
  setSortedKeysArr,
  updateFxRateSortedKeys
} = cardSlice.actions;

export default cardSlice.reducer;
