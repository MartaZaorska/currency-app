import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import data from '../data';

const initialState = {
  chart: "EUR",
  base: "PLN",
  rates: [],
  labels: [],
  updatedAt: "",
  loading: false,
  error: null
};

export const fetchCurrency = createAsyncThunk('currency/fetchCurrency', async (symbol, thunkAPI) => {
  try {
    const { getStartAndEndDates, formatCurrencyData } = await import("../utils");
    const { fetchData } = await import("../api");    
    const { CURRENCY_LIST } = await import("../data/constants");

    const [startDate, endDate] = getStartAndEndDates();
    const data = await fetchData(`https://api.apilayer.com/currency_data/timeframe?source=${symbol}&start_date=${startDate}&end_date=${endDate}`);
    
    return formatCurrencyData(data, CURRENCY_LIST);
  }catch(err){
    return thunkAPI.rejectWithValue(err);
  }
});

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setChartSymbol: (state, action) => { state.chart = action.payload; },
    setBase: (state, action) => { state.base = action.payload; }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrency.fulfilled, (state, action) => {
      state.rates = action.payload.rates;
      state.labels = action.payload.labels;
      state.base = action.payload.base;
      state.chart = action.payload.rates[0].symbol;
      state.updatedAt = action.payload.updatedAt;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(fetchCurrency.rejected, (state) => {
      //console.log(action);
      state.loading = false;
      state.error = true;
    });

    builder.addCase(fetchCurrency.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
  }
});


export const { setChartSymbol, setBase } = currencySlice.actions;
export default currencySlice.reducer;