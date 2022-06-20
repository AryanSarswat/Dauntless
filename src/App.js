import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BlockChain from './components/Blockchain.js';
import Block from './components/Block.js';
import Home from './pages/Home.js';
import Trace from './pages/Trace.js';
import Graph from './pages/Graph.js';


function App() {

    let [blockChain, setChain] = React.useState(new BlockChain())

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home blockchain={blockChain} setBlockChain={setChain}/>} />
            <Route path="/Blocks" element={<Block blockchain={blockChain} setBlockChain={setChain}/>} />
            <Route path="/Trace" element={<Trace blockchain={blockChain} setBlockChain={setChain}/>} />
            <Route path="/Graph" element={<Graph blockchain={blockChain} setBlockChain={setChain}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App;
