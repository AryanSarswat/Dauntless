import React from "react";
import './VerifyImageTab.css';
import { Grid } from "@material-ui/core";

function ImageTab(props){

    const [file, setFile] = React.useState(null);
    const [verified, setVerified] = React.useState(false)
    
    const onInputChange = (event) => {
        setFile(event.target.files[0]);
    }

    const onClick = (event) => {
        event.preventDefault();

        const fileName = file.name;

        const arr = props.parentProps.blockchain.ipfs.getAll()

        for (const item of arr) {
            if (item[1][0].slice(14, item[1][0].length) === fileName) {
                setVerified(true)
                return
            }
        }
        
    }

    return (
    <div className="VerifyImageTab">
        <Grid container direction={"column"} spacing={2}>
                <Grid item>
                    <form method="post" action="#" id="#" onSubmit={onClick}>
                        <div className="verify-form-group files">
                            <input type="file" className="verify-form-control" id="file" onChange={onInputChange} />
                        </div>
                        <Grid item>
                            <button className="add-block-btn-VerifyImageTab"><span>Verify Content</span></button>
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