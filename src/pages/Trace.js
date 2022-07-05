import React from 'react';
import Collapse from './Collapsible';
import FloatingLabel from "react-bootstrap-floating-label";
import './Trace.css'

function Trace(props) {

    const [blockToTrace, setBlockToTrace] = React.useState("");
    const [blockToTraceForm, setBlockToTraceForm] = React.useState("");

    function handleTraceBlockClick() {
        setBlockToTrace(blockToTraceForm);
        if (!props.blockchain.isValidHash(blockToTraceForm)) {
            alert("Invalid Block Hash");
        }
    }

    return (
        <div className="trace-page-container">
            <h1>Trace</h1>
            {props.blockchain.traceBlock(blockToTrace).map(data => {
                // eslint-disable-next-line
                return <Collapse id={data.block.hash} key={data.block.hash} header={<mark  className={data.verified ? 'mark-trace-green' : 'mark-trace-red'}>{data.block.header}</mark>}>
                    <ul>
                        <li id={data.block.hash} key={data.block.hash} className='collapsible-label'>Hash: {data.block.hash}</li>
                        <li id={data.block.nonce} key={data.block.nonce} className='collapsible-label'>Nonce: {data.block.nonce}</li>
                        <li id={data.block.time} key={data.block.time} className='collapsible-label'>Timestamp: {data.block.time}</li>
                        {data.block.parentHash && <li id={data.block.parentHash} key={data.block.parentHash} className='collapsible-label'>Parent Hash: {data.block.parentHash}</li>}
                        <li id={data.block.dataAddress} key={data.block.dataAddress} className='collapsible-label'>Data Address: {data.block.dataAddress}</li>
                        <li id={data.block.header} key={data.block.header} className= 'collapsible-label'>Is verified: {data.verified ? "Yes" : "No"}</li>
                    </ul>
                        </Collapse>
            } )}
            <FloatingLabel label="Block To Trace " id='block-trace' className= 'floating-label' onChange={(event) => setBlockToTraceForm(event.target.value)}/>
            <button onClick={handleTraceBlockClick} className="trace-block-btn"><span>Trace Block</span></button>
        </div>
    );
}

export default Trace;