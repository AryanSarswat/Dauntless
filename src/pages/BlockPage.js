import React from 'react';
import './Block.css'
import Collapse from './Collapsible';

function BlockPage(props) {

    const [blocks, setBlocks] = React.useState([]);

    React.useEffect(() => {
        fetch('/getBlocks')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBlocks(data)})
    }, [])

    return (
        <div className="block-page-container">
            <h1> Blocks </h1>
            {blocks.map((block) => {
                return <Collapse header={block['header']} id={block['hash']} key={block['hash']}>
                            <ul>
                                <li  id={block['hash']} key={1} className='collapsible-label'>Hash: {block['hash']}</li>
                                <li id={block['nonce']} key={2} className='collapsible-label'>Nonce: {block['nonce']}</li>
                                <li id={block['timestamp']} key={3} className='collapsible-label'>Timestamp: {block['timestamp']}</li>
                                {block['parent_hash'] && <li id={block['parent_hash']} key={4} className='collapsible-label'>Parent Hash: {block['parent_hash']}</li>}
                                <li id={block['data_address']} key={5} className='collapsible-label'>Data Address: {block['data_address']}</li>
                            </ul>
                        </Collapse>
            })}
        </div>
    );
}


export default BlockPage;