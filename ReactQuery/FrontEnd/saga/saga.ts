import { all, call, fork, put, takeLeading } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setData, setData2, setError, setLoading } from '../reducers/Slice';

function* getData(): Generator<unknown, void, unknown> {
  try {
    yield put(setLoading(true));
    const response: Response = (yield call(fetch, 'http://localhost:3003/data1', {
      method: 'GET',
      cache: 'no-cache',
    })) as Response;
    if(!response.ok)
      yield put(setError(response.statusText));
    const data = yield response.json();
    yield put(setData(data));
  } 
  catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setError(error.message));
    } else {
      yield put(setError('An unknown error occurred'));
    }
  }
  finally{
    yield put(setLoading(false));
  }
}

function* postData(action: PayloadAction<{ id: number; name: string } | undefined>): Generator<unknown, void, unknown> {
  try {
    const body = action?.payload ?? { id: 1, name: 'Pratik Raj' };
    const response = (yield call(
      fetch,
      'http://localhost:3003/create1',
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )) as Response;
    if (!response.ok) {
      throw new Error(response.statusText || 'Failed to create');
    }
    const data = yield response.json();
    yield put(setData2(data));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(setError(error.message));
    } else {
      yield put(setError('An unknown error occurred'));
    }
  }
}

function* watchFetchData() {
  yield takeLeading('tableData/fetchData', getData);
}

function* watchPostData() {
  yield takeLeading('tableData/postData', postData);
}

function* fetchData() {
  yield all([
    fork(watchFetchData),
    fork(watchPostData),
  ]);
}

export default fetchData;