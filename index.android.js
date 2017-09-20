import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import TaxiNativeClient from "./app/index";
import reducers from "./app/reducers";

const defaultState = {
  ciudad: "Ciudad Pulentax",
  destino: "otracosa"
};

const store = createStore(reducers, defaultState);

const app = () => (
  <Provider store={store}>
    <TaxiNativeClient />
  </Provider>
);

AppRegistry.registerComponent("TaxiNativeClient", () => app);
