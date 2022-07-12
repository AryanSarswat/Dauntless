import React from "react";
import './VerifyImageTab.css';
import { Grid } from "@material-ui/core";
import APIService from "../../services/APIService";

function ImageTab(props){

    const [file, setFile] = React.useState(null);
    const [verified, setVerified] = React.useState(false)
    
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
                    {verified ? <label className="verified-TextTab">Verified</label> : <label className="not-verified-TextTab">Not Verified</label>}
                </Grid>

        </Grid>
    </div>
    );
};
export default ImageTab;