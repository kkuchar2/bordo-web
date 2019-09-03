import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';

const title = 'First client app';

ReactDOM.render(
    <App title={title} />,
    document.getElementById('root')
);