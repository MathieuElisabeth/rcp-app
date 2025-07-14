import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./src/reducers";
// import { AnyAction } from 'redux';

// return async(dispatch: Dispatch<AnyAction>, getState: () => State)

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
})

export type AppDispatch = typeof store.dispatch // you can use this Dispatch type in your thunks
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store;