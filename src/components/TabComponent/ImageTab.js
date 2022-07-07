import React from "react";
import FloatingLabel from "react-bootstrap-floating-label";
import './ImageTab.css';
import axios from 'axios';


function ImageTab(props){

    const [header, setHeader] = React.useState("")
    const [author, setAuthor] = React.useState("")
    const [parentHash, setParentHash] = React.useState("") //! TODO Change to such that genesis block is used if no parentHash is provided
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
                const newBlock = props.parentProps.blockchain.addBlock(header, res.data.filename, parentHash, author)

                props.parentProps.setNewBlockHeader(newBlock.header)
                props.parentProps.setNewBlockdataAddress(newBlock.dataAddress)
                props.parentProps.setNewBlockTimeStamp(newBlock.time)
                props.parentProps.setNewBlockParentHash(newBlock.parentHash)
                props.parentProps.setNewBlockHash(newBlock.hash)
                props.parentProps.setNewBlockSignature(newBlock.signature)
                props.parentProps.setNewBlockOwnerPublicKey(newBlock.ownerPublicKey.slice(26, newBlock.ownerPublicKey.length - 25))
                
                setHeader("")
                setAuthor("")
                setParentHash("")
            })
            .catch(error =>{
                console.log("Error", error);
            })
    }

    return (
    <div className="ImageTab">
        <div className="form-container-ImageTab">
            <FloatingLabel label="Header " id='header' className= 'floating-label-ImageTab' onChange={event => setHeader(event.target.value)}/>
            <FloatingLabel label="Author " id='author' className= 'floating-label-ImageTab' onChange={event => setAuthor(event.target.value)}/>
            <FloatingLabel label="Parent Hash " id='hash' className= 'floating-label-ImageTab' onChange={event => event.target.value !== "" ? setParentHash(event.target.value) : null}/>
            <form method="post" action="#" id="#" onSubmit={onSubmit}>
                <div className="form-group files">
                    <input type="file" className="form-control" id="file" multiple="" onChange={onInputChange} />
                </div>
                <button className="add-block-btn-ImageTab"><span>Add Block</span></button>
            </form>
        </div>
    </div>
    );
};
export default ImageTab;