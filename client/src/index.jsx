import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';
import AppProvider from './contexts/state'

ReactDOM.render(<AppProvider><App /></AppProvider>, document.getElementById('app'));