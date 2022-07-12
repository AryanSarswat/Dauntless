import React from 'react';
import Collapse from './Collapsible';
import FloatingLabel from "react-bootstrap-floating-label";
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
        <div className="trace-page-container">
            <h1>Trace</h1>
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
            } )}
            <FloatingLabel label="Block To Trace " id='block-trace' className= 'floating-label' onChange={(event) => setBlockToTraceForm(event.target.value)}/>
            <button onClick={handleTraceBlockClick} className="trace-block-btn"><span>Trace Block</span></button>
        </div>
    );
}

export default Trace;