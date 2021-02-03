import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
//import EmployeeComponent from './day12Components/day12employeecomponent/employeecomponent';
import  ValidationComponent from './day13/validation';
import  DepartmentComponent from './day14sir/project1/departmentcomponent';
import EmployeeComponent from './day14sir/project1/employeecomponent';
import {BrowserRouter} from 'react-router-dom';
import MainComponent from './mernapp/project2/maincomponent';
import CalculatorComponent from "./day11/mycal";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"


ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <MainComponent></MainComponent>
  </BrowserRouter>

  
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
