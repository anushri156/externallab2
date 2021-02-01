import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import './../node_modules/bootstrap/dist/css/bootstrap.min.css';

import MainComponent from './day18project/maincomponent';


import {BrowserRouter} from 'react-router-dom';


import reportWebVitals from './reportWebVitals';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <MainComponent></MainComponent>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();