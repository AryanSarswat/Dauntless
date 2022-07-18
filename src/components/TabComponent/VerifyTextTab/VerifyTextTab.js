import React from "react";
import './VerifyTextTab.css';
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import APIService from "../../services/APIService";

function TextTab(props){
    const [content, setContent] = React.useState("")
    const [verified, setVerified] = React.useState("")
    const [dataAddress, setDataAddress] = React.useState("")
    const [dataHash, setDataHash] = React.useState("")
    const [dataHeader, setDataHeader] = React.useState("")
    const [dataOwnerKey, setDataOwnerKey] = React.useState("")
    const [dataTimeStamp, setDataTimeStamp] = React.useState("")
    const [dataType, setDataType] = React.useState("")


    const onSubmit = (event) => {
        event.preventDefault();

        APIService.verifyInformation(content)
        .then(response => response.json())
        .then(data => {
            setVerified(data['verified'])
            setDataHeader(data['header'])
            setDataAddress(data['data_address'])
            setDataHash(data['hash'])
            setDataOwnerKey(data['owner_public_key'])
            setDataTimeStamp(data['timestamp'])
            setDataType(data['type'])
        })
        setContent("")
    }

    return (
        <div className="verify-text-tab">
            <Grid container direction={"column"} spacing={2}>
                <Grid item>
                <TextField className='text-field-verifed-textTab-content' id='content' label="Content" value={content} onChange={event => setContent(event.target.value)}
                    minRows={15}
                    maxRows={15}
                    multiline
                    placeholder="Enter your text here"
                    variant="filled"/>
                </Grid>
                <Grid item>
                {verified ? <label header={dataHeader} className='collapsible-label'>
                                    <ul className='list'>
                                        <li>Verified Block</li>
                                        <li id={dataHeader} key ={1} className="list-pointer">Header: {dataHeader}</li>
                                        <li id={dataHash} key={2} className="list-pointer">Hash: {dataHash}</li>
                                        <li id={dataTimeStamp} key={3} className="list-pointer">Timestamp: {dataTimeStamp}</li>
                                        <li id={dataAddress} key={4} className="list-pointer">Data Address: {dataAddress}</li>
                                        <li id={dataOwnerKey} key={6} className="list-pointer">Owner Key: {dataOwnerKey}</li>
                                        <li id={dataType} key={7} className="list-pointer">Type: {dataType}</li>
                                    </ul>
                                </label> 
                        :       <label>
                                    Not Verified
                                </label>}
                </Grid>
                <Grid item>
                    <button className="add-block-btn-VerifyTextTab" onClick={onSubmit}><span>Verify Content</span></button>
                </Grid>
            </Grid>
        </div>
    );
};
export default TextTab;