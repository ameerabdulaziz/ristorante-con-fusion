import React from 'react';
import './App.css';
import Main from "./components/MainCommponent";
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <BrowserRouter>
                    <Main />
                </BrowserRouter>
            </div>
        </Provider>
    );
};

export default App;