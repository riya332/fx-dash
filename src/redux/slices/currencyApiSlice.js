import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const fxCurrencyApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.exchangerate.host' }, {cache: "no-store"}),
  tagTypes: ['FxRate'],
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getFxCurrencies: builder.query({
      query: () => '/symbols',
    }),
    getFxRate: builder.query({
        query: (queryParam) => `/convert?from=${queryParam.fromCurrency}&to=${queryParam.toCurrency}`,
        providesTags: (result, error, arg) => ['FxRate'],
        invalidatesTags: () => [{ type: 'FxRate' }],
    }),
  }),
  extraReducers: (builder) => {
    builder.addCase(fxCurrencyApi.endpoints.getFxRate.fulfilled, (state, action) => {
    });
  },
})

export const { useGetFxCurrenciesQuery, useGetFxRateQuery } = fxCurrencyApi