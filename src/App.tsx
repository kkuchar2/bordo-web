import React, {useEffect, useMemo, useState} from "react";

import {store} from "appRedux/store";
import Dialogs from "components/DialogSystem/Dialogs";
import {Toaster} from "react-hot-toast";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {createGlobalStyle} from "styled-components";

import Content from "./Content";

import './i18n';

import i18n from "./i18n";

const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    margin: 0;
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

    const [translationsLoaded, setTranslationsLoaded] = useState(false);

    useEffect(() => {
        const lang = localStorage.getItem('i18nextLng');

        console.log('Initializing i18n with language: ', lang);

        i18n.init({
            lng: lang,
            backend: {
                loadPath: '{{ns}}/{{lng}}.json'
            },
            fallbackLng: 'en',
            preload: ['en', 'pl'],
            react: {
                useSuspense: false
            },
            debug: true,
            ns: ['assets/translation'],
            defaultNS: 'assets/translation',
            keySeparator: false,
            interpolation: {
                escapeValue: false,
                formatSeparator: ','
            }
        }).then(() => {
            console.log('Loaded translations');
            setTranslationsLoaded(true);
        });
    }, []);

    const renderContent = useMemo(() => {
        if (!translationsLoaded) {
            console.log("Loading translations...");
            return null;
        }
        console.log("Translations loaded.");
        return <>
            <Content/>
            <Dialogs/>
        </>;
    }, [translationsLoaded]);

    return <Provider store={store}>
        <GlobalStyle/>
        <BrowserRouter>
            {renderContent}
        </BrowserRouter>
        <Toaster/>
    </Provider>;
};