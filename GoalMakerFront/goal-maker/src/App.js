import React, { useState } from 'react' ; 
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom"; 
import {FiSettings} from "react-icons/fi" ; 
import {TooltipComponent} from "@syncfusion/ej2-react-popups" ;  
import { Navbar, Footer, Sidebar, ThemeSettings } from './components/Index';
import { Home, Goals} from './pages/Index';
import { useStateContext } from './contexts/ContextProvider';
import KeyResults from './pages/KeyResults';
import KeyResult from './pages/KeyResult';
import Login from './pages/Login/Login';
import Welcome from './pages/Welcome';

const App = () => {
  return (
    <div>
      <BrowserRouter>       
        <Routes>
        <Route path="/login" element={(<Login/>)} />
        <Route path="*" element={(<Welcome />)} />
        </Routes>
      
      </BrowserRouter>

    </div>
  )
}

export default App