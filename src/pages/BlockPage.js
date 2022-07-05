import React from 'react';
import './Block.css'
import Collapse from './Collapsible';

function BlockPage(props) {
    return (
        <div className="block-page-container">
            <h1> Blocks </h1>
            {props.blockchain.getAllBlocks().map(block => {
                return <Collapse header={block.header} id={block.hash} key={block.hash}>
                            <ul>
                                <li  id={block.hash} key={block.hash} className='collapsible-label'>Hash: {block.hash}</li>
                                <li id={block.nonce} key={block.nonce} className='collapsible-label'>Nonce: {block.nonce}</li>
                                <li id={block.time} key={block.time} className='collapsible-label'>Timestamp: {block.time}</li>
                                {block.parentHash && <li id={block.parentHash} key={block.parentHash} className='collapsible-label'>Parent Hash: {block.parentHash}</li>}
                                <li id={block.dataAddress} key={block.dataAddress} className='collapsible-label'>Data Address: {block.dataAddress}</li>
                            </ul>
                        </Collapse>
            })}
        </div>
    );
}


export default BlockPage;