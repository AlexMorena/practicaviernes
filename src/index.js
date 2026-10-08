import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import EmpleadosOficiosPracticar from './components/EmpleadosOficiosPracticar';
import EmpleadosOficiosPracticar2 from './components/EmpleadosOficiosPracticar2';
import EmpleadosDepartamento from './components/EmpleadosDepartamento';
import EmpleadosDepartamento2 from './components/EmpleadosDepartamento2';
import EmpleadosOficiosPracticar3 from './components/EmpleadosOficiosPracticar3';
import EmpleadosId from './components/EmpleadosId';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EmpleadosId  />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
