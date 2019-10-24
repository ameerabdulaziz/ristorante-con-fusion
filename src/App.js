import React from 'react';
import './App.css';
import Main from "./components/MainCommponent";
import {BrowserRouter} from "react-router-dom";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Main />
            </BrowserRouter>
        </div>
    );
};

export default App;