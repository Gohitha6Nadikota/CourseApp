import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import MyStore from './utils/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={MyStore}>
      <div className="m-0 p-0">
        <App />
      </div>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
