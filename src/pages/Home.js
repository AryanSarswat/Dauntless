import React from 'react';
import ReactSplit, { SplitDirection } from '@devbookhq/splitter'
import FloatingLabel from "react-bootstrap-floating-label";
import "./Home.css"
import Block from '../components/Block';

function Home(props) {

    const [header, setHeader] = React.useState("")
    const [author, setAuthor] = React.useState("")
    const [parentHash, setParentHash] = React.useState("")
    const [content, setContent] = React.useState("")


    const [newBlockHeader, setNewBlockHeader] = React.useState("")
    const [newBlockdataAddress, setNewBlockdataAddress] = React.useState("")
    const [newBlockdataAddressHash, setNewBlockdataAddressHash] = React.useState("")
    const [newBlockTimeStamp, setNewBlockTimeStamp] = React.useState("")
    const [newBlockParentHash, setNewBlockParentHash] = React.useState("")
    const [newBlockHash, setNewBlockHash] = React.useState("")
    const [newBlockOwnerPublicKey, setNewBlockOwnerPublicKey] = React.useState("")
    const [newBlockSignature, setNewBlockSignature] = React.useState("")
    const [newBlockChildHashes, setNewBlockChildHashes] = React.useState("")

    
    function handleAddBlockClick() {
        let newBlock = Block.createBlock(header, content, content, parentHash, author, author)
        props.blockchain.mine(parentHash || null, newBlock)
        
        setNewBlockHeader(newBlock.header)
        setNewBlockdataAddress(newBlock.dataAddress)
        setNewBlockdataAddressHash(newBlock.dataAddressHash)
        setNewBlockTimeStamp(newBlock.timestamp)
        setNewBlockParentHash(newBlock.parentHash)
        setNewBlockHash(newBlock.hash)
        setNewBlockSignature(newBlock.signature)
        setNewBlockOwnerPublicKey(newBlock.ownerPublicKey)
        setNewBlockChildHashes(newBlock.childHashes)
        
        setHeader("")
        setAuthor("")
        setParentHash("")
        setContent("")
    }


    return (
        <div className="home">
            <div className = "split-pane">
                <ReactSplit  direction={SplitDirection.Horizontal}>
                    <div className="left-side-content">
                        <div className="form-container">
                            <h2> Add Block </h2>
                            
                            <FloatingLabel label="Header " id='header' className= 'floating-label' onChange={event => setHeader(event.target.value)}/>
                            <FloatingLabel label="Author " id='author' className= 'floating-label' onChange={event => setAuthor(event.target.value)}/>
                            <FloatingLabel label="Parent Hash " id='hash' className= 'floating-label' onChange={event => event.target.value !== "" ? setParentHash(event.target.value) : null}/>
                            <FloatingLabel label="Content " id='content' className= 'floating-label' onChange={event => setContent(event.target.value)}/>

                            <button onClick={handleAddBlockClick} className="add-block-btn"><span>Add Block</span></button>

                        </div>
                    </div>

                    <div className="right-side-content">
                        <div className="block-container">
                            <label className="new-block-labels">Header: {newBlockHeader} </label>
                            <label className="new-block-labels">Data Address: {newBlockdataAddress} </label>
                            <label className="new-block-labels">Data Address Hash: {newBlockdataAddressHash} </label>
                            <label className="new-block-labels">Timestamp: {newBlockTimeStamp} </label>
                            <label className="new-block-labels">Parent Hash: {newBlockParentHash} </label>
                            <label className="new-block-labels">Block Hash: {newBlockHash} </label>
                            <label className="new-block-labels">Owner Public Key: {newBlockOwnerPublicKey} </label>
                            <label className="new-block-labels">Signature:  {newBlockSignature}</label>
                            <label className="new-block-labels">Child Hashes: {newBlockChildHashes}</label>
                        </div>
                    </div>
                </ReactSplit>
            </div>
        </div>
    );
}

export default Home;