import React from 'react';
import './Block.css'
import Collapse from './Collapsible';

function BlockPage(props) {
    return (
        <div className="block-page-container">
            <h1> Blocks </h1>
            {props.blockchain.getAllBlocks().map((block) => {
                return <Collapse header={block.header} id={block.hash} key={block.hash}>
                            <ul>
                                <li  id={block.hash} key={1} className='collapsible-label'>Hash: {block.hash}</li>
                                <li id={block.nonce} key={2} className='collapsible-label'>Nonce: {block.nonce}</li>
                                <li id={block.time} key={3} className='collapsible-label'>Timestamp: {block.time}</li>
                                {block.parentHash && <li id={block.parentHash} key={4} className='collapsible-label'>Parent Hash: {block.parentHash}</li>}
                                <li id={block.dataAddress} key={5} className='collapsible-label'>Data Address: {block.dataAddress}</li>
                            </ul>
                        </Collapse>
            })}
        </div>
    );
}


export default BlockPage;