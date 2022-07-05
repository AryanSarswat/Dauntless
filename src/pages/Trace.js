import React from 'react';
import Collapse from './Collapsible';
import FloatingLabel from "react-bootstrap-floating-label";
import './Trace.css'

function Trace(props) {

    const [blockToTrace, setBlockToTrace] = React.useState("");
    const [blockToTraceForm, setBlockToTraceForm] = React.useState("");

    function handleTraceBlockClick() {
        setBlockToTrace(blockToTraceForm);
        console.log(props.blockchain.traceBlock(blockToTraceForm));
    }

    return (
        <div className="trace-page-container">
            <h1>Trace</h1>
            {props.blockchain.traceBlock(blockToTrace).map(data => {
                return <Collapse header={<mark className={data.block.verified ? 'mark-trace-green' : 'mark-trace-red'}>{data.block.header}</mark>} id={data.block.hash} >
                    <ul>
                        <li className='collapsible-label'>Hash: {data.block.hash}</li>
                        <li className='collapsible-label'>Nonce: {data.block.nonce}</li>
                        <li className='collapsible-label'>Timestamp: {data.block.time}</li>
                        {data.block.parentHash && <li className='collapsible-label'>Parent Hash: {data.block.parentHash}</li>}
                        <li className='collapsible-label'>Data Address: {data.block.dataAddress}</li>
                        <li className= 'collapsible-label'>Is verified: {data.verified ? "Yes" : "No"}</li>
                    </ul>
                        </Collapse>
            } )}
            <FloatingLabel label="Block To Trace " id='block-trace' className= 'floating-label' onChange={(event) => setBlockToTraceForm(event.target.value)}/>
            <button onClick={handleTraceBlockClick} className="trace-block-btn"><span>Trace Block</span></button>
        </div>
    );
}

export default Trace;