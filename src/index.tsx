import React from "react";

import ReactDOM from 'react-dom/client';

import {App} from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));

// NOTE: Strict mode will cause double rendering
// root.render(<StrictMode><App/></StrictMode>);

root.render(<App/>);