import '../src/assets/CSS/bootstrap.min.css';
import '../src/assets/CSS/custom.css';
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRoute from './router/AppRoute';
import UserProvider from './components/Context/UserContext';

function App() {
  return (

    <BrowserRouter>
    <UserProvider>
      <AppRoute />
    </UserProvider>
    </BrowserRouter>
  );
}

export default App;
