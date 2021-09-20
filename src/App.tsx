import React from "react";

import {store} from "appRedux/store";
import Dialogs from "components/Dialogs/Dialogs";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {createGlobalStyle} from "styled-components";

import Content from "./Content";

import './i18n';

const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    margin: 0;
    background: linear-gradient(180deg, #538DFF 0%, rgba(158, 115, 229, 0.82) 50%);
    background-size: cover;

    .root {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      display: flex;

      .page {
        width: 100%;
        height: 100%;
        min-height: 0;
        flex: 1;
        user-select: none;
        box-sizing: border-box;
      }
    }
  }
`;

export const App = () => {
    return <Provider store={store}>
        <GlobalStyle/>
        <BrowserRouter>
            <Content/>
            <Dialogs/>
        </BrowserRouter>
    </Provider>;
};