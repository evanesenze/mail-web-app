import { groupApi } from 'store/api/group.api';
import { mailApi } from 'store/api/mail.api';
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { clientSlice } from './slices/client.slice';

const store = configureStore({
  reducer: {
    [mailApi.reducerPath]: mailApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [clientSlice.name]: clientSlice.reducer
  },
  middleware: get => get().concat(mailApi.middleware, groupApi.middleware)
});

setupListeners(store.dispatch);


export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch