import React from 'react';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Collapse from './Collapsible';
import APIService from '../components/services/APIService';
import './Trace.css'

function Trace(props) {

    const [traceHistory, setTraceHistory] = React.useState([]);
    const [blockToTraceForm, setBlockToTraceForm] = React.useState("");

    function handleTraceBlockClick() {
        APIService.traceBlock(blockToTraceForm)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setTraceHistory(data)
        })
    }

    return (
        <Grid className='traceGrid' container direction={"column"} spacing={2}>
            <Grid item>
                <h1>Trace Block</h1>
            </Grid>
            <Grid item>
                {traceHistory.map(data => {
                // eslint-disable-next-line
                return <Collapse id={data[0]['header']} key={data[0]['hash']} header={<mark  className={data[1] ? 'mark-trace-green' : 'mark-trace-red'}>{data[0]['header']}</mark>}>
                    <ul>
                        <li id={data[0]['hash']} key={data[0]['hash']} className='collapsible-label'>Hash: {data[0]['hash']}</li>
                        <li id={data[0]['nonce']} key={data[0]['nonce']} className='collapsible-label'>Nonce: {data[0]['nonce']}</li>
                        <li id={data[0]['timestamp']} key={data[0]['timestamp']} className='collapsible-label'>Timestamp: {data[0]['timestamp']}</li>
                        {data[0]['parent_hash'] && <li id={data[0]['parent_hash']} key={data[0]['parent_hash']} className='collapsible-label'>Parent Hash: {data[0]['parent_hash']}</li>}
                        <li id={data[0]['data_address']} key={data[0]['data_address']} className='collapsible-label'>Data Address: {data[0]['data_address']}</li>
                        <li id={data[0]['header']} key={data[0]['header']} className= 'collapsible-label'>Is verified: {data[1] ? "Yes" : "No"}</li>
                    </ul>
                        </Collapse>
                })}
            </Grid>
            <Grid item>
                <TextField id="blockToTrace" className='block-trace' label="Block To Trace" variant="filled" onChange={event => setBlockToTraceForm(event.target.value)}/>
            </Grid>
            <Grid item>
                <button   button onClick={handleTraceBlockClick} className="trace-block-btn"><span>Trace Block</span></button>
            </Grid>
        </Grid>
    );
}

export default Trace;