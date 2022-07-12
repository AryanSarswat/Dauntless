import React from "react";
import './VerifyTextTab.css';
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import APIService from "../../services/APIService";

function TextTab(props){
    const [content, setContent] = React.useState("")
    const [verified, setVerified] = React.useState("")

    const onSubmit = (event) => {
        event.preventDefault();

        APIService.verifyInformation(content)
        .then(response => response.json())
        .then(data => {
            setVerified(data['verified'])
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
                    {verified ? <label className="verified-TextTab">Verified</label> : <label className="not-verified-TextTab">Not Verified</label>}
                </Grid>
                <Grid item>
                    <button className="add-block-btn-VerifyTextTab" onClick={onSubmit}><span>Verify Content</span></button>
                </Grid>
            </Grid>
        </div>
    );
};
export default TextTab;