import { createSlice } from "@reduxjs/toolkit";

export interface tableData{
  data: string[];
  loading?: boolean;
  error?: string | null;
  data2?: unknown;
}

const initialState: tableData = {
  data: [],
  loading: false,
  error: null,
};

export const slice = createSlice({
  name: 'tableData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setData2: (state, action) => {
      state.data2 = action.payload;
    }
  }
})

export const { setData, setLoading, setError, setData2 } = slice.actions; 
export default slice.reducer;