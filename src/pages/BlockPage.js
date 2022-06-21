import React from 'react';
import './Block.css'
import Collapse from './Collapsible';

function BlockPage(props) {
    return (
        <div className="block-page-container">
            <h1> Blocks </h1>
            {props.blockchain.getAllBlocks().map(block => {
                return <Collapse header={block.header}>
                    <ul>
                        <li className='collapsible-label'>Hash: {block.hash}</li>
                        <li className='collapsible-label'>Nonce: {block.nonce}</li>
                        <li className='collapsible-label'>Timestamp: {block.time}</li>
                        {block.parentHash && <li className='collapsible-label'>Parent Hash: {block.parentHash}</li>}
                        <li className='collapsible-label'>Data Address: {block.dataAddress}</li>
                    </ul>
                        </Collapse>
            })}
        </div>
    );
}


export default BlockPage;