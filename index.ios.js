import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./app/reducers";
import TaxiNativeClient from "./app/navigators/AppNavigator";

const store = createStore(reducers);

const app = () => (
  <Provider store={store}>
    <TaxiNativeClient />
  </Provider>
);

AppRegistry.registerComponent("TaxiNativeClient", () => app);
