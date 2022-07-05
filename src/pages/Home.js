import React from 'react';
import ReactSplit, { SplitDirection } from '@devbookhq/splitter'
import FloatingLabel from "react-bootstrap-floating-label";
import "./Home.css"
import Collapsible from './Collapsible';
import axios from 'axios';



function Home(props) {

    const [header, setHeader] = React.useState("")
    const [author, setAuthor] = React.useState("")
    const [parentHash, setParentHash] = React.useState("")
    const [content, setContent] = React.useState("")


    const [newBlockHeader, setNewBlockHeader] = React.useState("")
    const [newBlockdataAddress, setNewBlockdataAddress] = React.useState("")
    const [newBlockTimeStamp, setNewBlockTimeStamp] = React.useState("")
    const [newBlockParentHash, setNewBlockParentHash] = React.useState("")
    const [newBlockHash, setNewBlockHash] = React.useState("")
    const [newBlockOwnerPublicKey, setNewBlockOwnerPublicKey] = React.useState("")
    const [newBlockSignature, setNewBlockSignature] = React.useState("")
    const [file, setFile] = React.useState(null);

    const onInputChange = (event) => {
        setFile(event.target.files[0]);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const data = new FormData();

        var hash = require('object-hash');

        console.log(hash(file))

        data.append('file', file);

        axios.post('http://localhost:8000/upload', data)
            .then(res => {
                console.log('Success');
                const newBlock = props.blockchain.addBlock(header, res.data.filename, parentHash, author)

                setNewBlockHeader(newBlock.header)
                setNewBlockdataAddress(newBlock.dataAddress)
                setNewBlockTimeStamp(newBlock.time)
                setNewBlockParentHash(newBlock.parentHash)
                setNewBlockHash(newBlock.hash)
                setNewBlockSignature(newBlock.signature)
                setNewBlockOwnerPublicKey(newBlock.ownerPublicKey.slice(26, newBlock.ownerPublicKey.length - 25))
                
                setHeader("")
                setAuthor("")
                setParentHash("")
                setContent("")
            })
            .catch(error =>{
                console.log("Error", error);
            })
    }

    return (
        <div className="home">
            <div className = "split-pane">
                <ReactSplit  direction={SplitDirection.Horizontal}>
                    <div className="left-side-content">
                        <div className="form-container">
                            <h2> Add Block </h2>
                            
                            <FloatingLabel label="Header " id='header' className= 'floating-label-home' onChange={event => setHeader(event.target.value)}/>
                            <FloatingLabel label="Author " id='author' className= 'floating-label-home' onChange={event => setAuthor(event.target.value)}/>
                            <FloatingLabel label="Parent Hash " id='hash' className= 'floating-label-home' onChange={event => event.target.value !== "" ? setParentHash(event.target.value) : null}/>
                            <FloatingLabel label="Content " id='content' className= 'floating-label-home' onChange={event => setContent(event.target.value)}/>
                            <form method="post" action="#" id="#" onSubmit={onSubmit}>
                                <div className="form-group files">
                                    <input type="file" className="form-control" id="file" multiple="" onChange={onInputChange} />
                                </div>
                                <button className="add-block-btn"><span>Add Block</span></button>
                            </form>
                        </div>
                    </div>

                    <div className="right-side-content">
                        <div className="block-container">
                            { newBlockHeader && <Collapsible className='collapsible-home' header={newBlockHeader} id={newBlockHash}>
                                <ul>
                                    <li className='collapsible-label-home'>Hash: <mark className='block-info'>{newBlockHash}</mark></li>
                                    <li className='collapsible-label-home'>Data Address: <mark className='block-info'>{newBlockdataAddress}</mark></li>
                                    <li className='collapsible-label-home'>Timestamp: <mark className='block-info'>{newBlockTimeStamp}</mark></li>
                                    {newBlockParentHash && <li className='collapsible-label-home'>Parent Hash: <mark className='block-info'>{newBlockParentHash}</mark></li>}
                                    <li className='collapsible-label-home'>Block Hash: <mark className='block-info'>{newBlockHash}</mark></li>
                                    <li className='collapsible-label-home'>Owner Public Key: <mark className='block-info'>{newBlockOwnerPublicKey}</mark></li>
                                    <li className='collapsible-label-home'>Signature: <mark className='block-info'>{newBlockSignature}</mark></li>
                                </ul>
                            </Collapsible>}
                        </div>
                    </div>
                </ReactSplit>
            </div>
        </div>
    );
}

export default Home;