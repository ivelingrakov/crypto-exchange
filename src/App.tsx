import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Content from './components/Content/Content';
import { ExchangeProvider } from './exchange/exchange-context';

import "antd/dist/antd.css";

const App: React.FC = () => <BrowserRouter>
    <ExchangeProvider>
        <Content />
    </ExchangeProvider>
</BrowserRouter>

export default App;
