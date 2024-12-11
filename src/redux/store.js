import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Sử dụng localStorage
import adminReducer from "./slices/adminSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, adminReducer);

const store = configureStore({
  reducer: {
    admin: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };