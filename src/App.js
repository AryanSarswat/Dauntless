import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BlockPage from './pages/BlockPage/BlockPage.js';
import Home from './pages/HomePage/Home.js';
import IPFSPage from './pages/IPFSPage/IPFSPage.js'
import Trace from './pages/TracePage/Trace.js';
import VerifyPage from './pages/VerifyPage/VerifyPage.js';


function App() {
    
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="/Blocks" element={<BlockPage />}/>
            <Route path="/Trace" element={<Trace />}/>
            <Route path="/IPFS" element={<IPFSPage />}/>
            <Route path="/Verify" element={<VerifyPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App;
