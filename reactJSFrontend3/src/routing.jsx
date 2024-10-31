import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './app';
import App2 from './App2';
import NotFound from './notFound';

const Routing = () => (
<Routes>
    <Route exact path="/onlineShopping/" element={<App />} />
    <Route exact path="/onlineShopping/:username" element={<App2 />} />
    <Route path="*" element={<NotFound />} />
</Routes>
);

const Root = () => (
<BrowserRouter>
    <Routing />
</BrowserRouter>
);

export default Root;