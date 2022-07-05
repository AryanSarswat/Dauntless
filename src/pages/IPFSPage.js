import React from 'react';
import FloatingLabel from "react-bootstrap-floating-label";
import './IPFSPage.css'

function IPFSPage(props) {

    const images = require.context('../../public/uploads/', true);
    const [blockToFetch, setblockToFetch] = React.useState("");
    const [blockToFetchForm, setBlockToFetchForm] = React.useState("");

    function handleFetchData() {
        const path = props.blockchain.ipfs.retrieve(blockToFetchForm)
        const url = images(`./${path}`)
        setblockToFetch(url)
    }

    return (
        <div className="fetch-data-container">
            <h1>IPFS Retrival</h1>
            <div className='content-container'>
                {blockToFetch && <img src={blockToFetch} alt="" className='blockImage' />}  
            </div> 
            <FloatingLabel label="Address of Data " id='address-fetch' className= 'floating-label-IPFS' onChange={(event) => setBlockToFetchForm(event.target.value)}/>
            <button onClick={handleFetchData} className="fetch-data-btn"><span>Get Block content</span></button>
        </div>
    );
}

export default IPFSPage;