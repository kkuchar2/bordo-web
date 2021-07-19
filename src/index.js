import React from 'react';
import ReactDOM from 'react-dom';
import removeFbclid from "remove-fbclid";
import App from "./App";

removeFbclid();

ReactDOM.render(<App />, document.getElementById('root'));