import React from "react";
import './VerifyImageTab.css';
import { Grid } from "@material-ui/core";


function ImageTab(props){

    const [file, setFile] = React.useState(null);
    const [verified, setVerified] = React.useState(false)
    
    const onInputChange = (event) => {
        setFile(event.target.files[0]);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const data = new FormData();

        var hash = require('object-hash');

        console.log(hash(file))

        data.append('file', file);

        const [toCheck, type] = [data, 'image']

        setVerified(props.parentProps.blockchain.verifyContent(toCheck, type))
    }

    return (
    <div className="VerifyImageTab">
        <Grid container direction={"column"} spacing={2}>
                <Grid item>
                    <form method="post" action="#" id="#" onSubmit={onSubmit}>
                        <div className="verify-form-group files">
                            <input type="file" className="verify-form-control" id="file" multiple="" onChange={onInputChange} />
                        </div>
                    </form>
                </Grid>
                <Grid>
                    {verified ? <label className="verified-TextTab">Verified</label> : <label className="not-verified-TextTab">Not Verified</label>}
                </Grid>
                <Grid item>
                    <button className="add-block-btn-VerifyImageTab"><span>Verify Content</span></button>
                </Grid>
        </Grid>
    </div>
    );
};
export default ImageTab;