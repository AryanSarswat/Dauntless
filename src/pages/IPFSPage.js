import { Grid } from '@material-ui/core';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import './IPFSPage.css'

function IPFSPage(props) {

    //!TODO Change to have tabs one for text based, one for image based
    const images = require.context('../../public/uploads/', true);
    const [blockToFetch, setblockToFetch] = React.useState("");
    const [blockToFetchForm, setBlockToFetchForm] = React.useState("");

    function handleFetchData() {
        const content = props.blockchain.ipfs.retrieve(blockToFetchForm)
        setblockToFetch(content)
    }

    return (
        <div className='main-grid'>
            <Grid container direction={"column"} spacing={2} >
                <Grid item>
                    <h1>IPFS Retrival</h1>
                </Grid>
                {blockToFetch && 
                <Grid item className='content-container'>
                    {blockToFetch[1] === 'text' ? <p>{blockToFetch[0]}</p> : <img className='blockImage' src={images(`./${blockToFetch[0]}`)} alt=""/>}
                </Grid>
                }
                <Grid item>
                    <TextField id="text-field-Tab" className='text-field-TextTab' label="Address of Data" variant="filled" onChange={event => setBlockToFetchForm(event.target.value)}/>
                </Grid>
                <Grid item>
                    <button onClick={handleFetchData} className="fetch-data-btn"><span>Get Block content</span></button>
                </Grid>
            </Grid>
        </div>
    );
}

export default IPFSPage;