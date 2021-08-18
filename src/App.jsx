import {store} from "appRedux/store.js";
import Dialogs from "components/Dialogs/Dialogs";
import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {createGlobalStyle} from "styled-components";
import AppManager from "./AppManager";
import Content from "./Content";
import './i18n';

const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    background: #dee1e7;
  }

  body {
    height: 100%;
    margin: 0;

    .root {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      display: flex;

      .page {
        overflow-y: auto;
        height: 100%;
        min-height: 0;
        flex: 1;
        user-select: none;
        box-sizing: border-box;
      }
    }
  }
`;

const App = () => {
    return <Provider store={store}>
        <GlobalStyle/>
        <BrowserRouter>
            <AppManager/>
            <Content/>
            <Dialogs/>
        </BrowserRouter>
    </Provider>;
};

export default App;