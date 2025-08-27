import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import dataReducer from '../reducers/Slice.ts';
import fetchData from '../saga/saga.ts';

const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    tableData: dataReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(saga),
});
saga.run(fetchData);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;