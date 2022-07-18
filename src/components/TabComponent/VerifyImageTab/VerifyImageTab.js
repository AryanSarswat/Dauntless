import React from "react";
import './VerifyImageTab.css';
import { Grid } from "@material-ui/core";
import APIService from "../../services/APIService";

function ImageTab(props){

    const [file, setFile] = React.useState(null);
    const [verified, setVerified] = React.useState(false)
    const [dataAddress, setDataAddress] = React.useState("")
    const [dataHash, setDataHash] = React.useState("")
    const [dataHeader, setDataHeader] = React.useState("")
    const [dataOwnerKey, setDataOwnerKey] = React.useState("")
    const [dataTimeStamp, setDataTimeStamp] = React.useState("")
    const [dataType, setDataType] = React.useState("")

    
    const onInputChange = (event) => {
        setFile(event.target.files[0]);
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })

    const onClick = (event) => {
        event.preventDefault();

        toBase64(file)
        .then(base64 => {
            console.log(base64)
            APIService.verifyInformation(base64)
            .then(verified => verified.json())
            .then(data => {
                console.log(data)
                setVerified(data['verified'])
                setDataHeader(data['header'])
                setDataAddress(data['data_address'])
                setDataHash(data['hash'])
                setDataOwnerKey(data['owner_public_key'])
                setDataTimeStamp(data['timestamp'])
                setDataType(data['type'])
                setFile(null)
            })
        })
        .catch(error => {
            if (error.name === "TypeError") {
                alert("Please re-upload the file");
            }
        })
    }

    return (
    <div className="VerifyImageTab">
        <Grid container direction={"column"} spacing={2}>
                <Grid item>
                    <form method="post" action="#" id="#">
                        <div className="verify-form-group files">
                            <input type="file" className="verify-form-control" id="file" onChange={onInputChange} />
                        </div>
                        <Grid item>
                            <button className="add-block-btn-VerifyImageTab" onClick={onClick}><span>Verify Content</span></button>
                        </Grid>
                    </form>
                </Grid>
                <Grid>
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

        </Grid>
    </div>
    );
};
export default ImageTab;