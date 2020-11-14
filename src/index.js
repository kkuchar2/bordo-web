import React from 'react';
import ReactDOM from 'react-dom';
import removeFbclid from "remove-fbclid";
import App from "js/App.jsx";

removeFbclid();

ReactDOM.render(<App/>, document.getElementById('root'));