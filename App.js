import React from 'react';
import Root from './src/native/index';
import configureStore from './src/store/index';
import { createRootNavigator } from "./src/native/router.js";

const { persistor, store } = configureStore();

export default function App() {
  return <Root store={store} persistor={persistor} />;
}
