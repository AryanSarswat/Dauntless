import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BlockPage from './pages/BlockPage.js';
import Home from './pages/Home.js';
import IPFSPage from './pages/IPFSPage.js'
import Trace from './pages/Trace.js';
import VerifyPage from './pages/VerifyPage.js';


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
