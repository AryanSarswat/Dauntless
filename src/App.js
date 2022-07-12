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
    
    let [blockChain, setChain] = React.useState("");

    React.useEffect(() => {
        fetch("/")
        .then(res => res.json())
        .then(data => {
            setChain(data)
        })
        .catch(err => console.log(err))
    }, [blockChain])

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home blockchain={blockChain} setBlockChain={setChain}/>}/>
            <Route path="/Blocks" element={<BlockPage blockchain={blockChain} setBlockChain={setChain}/>}/>
            <Route path="/Trace" element={<Trace blockchain={blockChain} setBlockChain={setChain}/>}/>
            <Route path="/IPFS" element={<IPFSPage blockchain={blockChain} setBlockChain={setChain}/>}/>
            <Route path="/Verify" element={<VerifyPage blockchain={blockChain} setBlockChain={setChain}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App;
