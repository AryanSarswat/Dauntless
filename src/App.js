import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home.js';
import Block from './pages/Block.js';
import Trace from './pages/Trace.js';
import Graph from './pages/Graph.js';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/Blocks" element={<Block />} />
            <Route path="/Trace" element={<Trace />} />
            <Route path="/Graph" element={<Graph />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App;
