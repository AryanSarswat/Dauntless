import React from "react";
import './ImageTab.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";


function ImageTab(props){

    const [header, setHeader] = React.useState("")
    const [author, setAuthor] = React.useState("")
    const [parentHash, setParentHash] = React.useState("")
    const [file, setFile] = React.useState(null);
    
    const onInputChange = (event) => {
        setFile(event.target.files[0]);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append('file', file);

        axios.post('http://localhost:8000/upload', data)
            .then(res => {
                console.log('Success');
                const newBlock = props.parentProps.blockchain.addBlock(header, res.data.filename, 'image', parentHash, author)

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
        <Grid container direction={"column"} spacing={2}>
            <Grid item className="input-fields">
                <TextField className='text-field-ImageTab' label="Header" variant="filled" onChange={event => setHeader(event.target.value)}/>
            </Grid>
            <Grid item className="input-fields">
                <TextField className='text-field-ImageTab' label="Ministry" variant="filled" onChange={event => setAuthor(event.target.value)}/>
            </Grid>
            <Grid item className="input-fields">
                <TextField className='text-field-ImageTab' label="Parent Hash" variant="filled" onChange={event => event.target.value !== "" ? setParentHash(event.target.value) : null}/>
            </Grid>
            <Grid item className="file-input">
                <form method="post" action="#" id="#" onSubmit={onSubmit}>
                    <div className="form-group-files">
                        <input type="file" className="form-control-input" id="file" onChange={onInputChange} />
                    </div>
                    <button className="add-block-btn-ImageTab"><span>Add Block</span></button>
                </form>
            </Grid>
        </Grid>
    </div>
    );
};
export default ImageTab;