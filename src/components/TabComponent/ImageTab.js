import React from "react";
import './ImageTab.css';
import APIService from "../services/APIService";
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";


function ImageTab(props){

    const [header, setHeader] = React.useState("")
    const [author, setAuthor] = React.useState("")
    const [parentHash, setParentHash] = React.useState("")
    const [file, setFile] = React.useState(null);

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
    
    const onInputChange = (event) => {
        setFile(event.target.files[0]);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        toBase64(file)
        .then(base64 => {
            APIService.addBlock(header, base64, "image", parentHash, author)
            .then((response) => response.json())
            .then((data) => {
                    props.parentProps.setNewBlockHeader(data['header'])
                    props.parentProps.setNewBlockdataAddress(data['data_address'])
                    props.parentProps.setNewBlockTimeStamp(data['timestamp'])
                    props.parentProps.setNewBlockParentHash(data['parent_hash'])
                    props.parentProps.setNewBlockHash(data['hash'])
                    props.parentProps.setNewBlockSignature(data['owner_signature'])
                    props.parentProps.setNewBlockOwnerPublicKey(data['owner_public_key'])
                }
            )
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