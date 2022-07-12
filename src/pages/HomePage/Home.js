import React from 'react';
import ReactSplit, { SplitDirection } from '@devbookhq/splitter'
import "./Home.css"
import Collapsible from '../../components/CollapsibleBar/Collapsible';
import Tabs from '../../components/TabComponent/Tab.js';



function Home(props) {

    const [newBlockHeader, setNewBlockHeader] = React.useState("")
    const [newBlockdataAddress, setNewBlockdataAddress] = React.useState("")
    const [newBlockTimeStamp, setNewBlockTimeStamp] = React.useState("")
    const [newBlockParentHash, setNewBlockParentHash] = React.useState("")
    const [newBlockHash, setNewBlockHash] = React.useState("")
    const [newBlockOwnerPublicKey, setNewBlockOwnerPublicKey] = React.useState("")
    const [newBlockSignature, setNewBlockSignature] = React.useState("")

    return (
        <div className="home">
            <div className = "split-pane">
                <ReactSplit  direction={SplitDirection.Horizontal}>
                    <div className="left-side-content">
                        <Tabs 
                            setNewBlockHash={setNewBlockHash}
                            setNewBlockHeader={setNewBlockHeader}
                            setNewBlockdataAddress={setNewBlockdataAddress}
                            setNewBlockTimeStamp={setNewBlockTimeStamp}
                            setNewBlockParentHash={setNewBlockParentHash}
                            setNewBlockOwnerPublicKey={setNewBlockOwnerPublicKey}
                            setNewBlockSignature={setNewBlockSignature}
                            blockchain={props.blockchain}
                        />

                    </div>

                    <div className="right-side-content">
                        <div className="block-container">
                            { newBlockHeader && <Collapsible className='collapsible-home' header={newBlockHeader} id={newBlockHash}>
                                <ul>
                                    <li className='collapsible-label-home'>Hash: <mark className='block-info'>{newBlockHash}</mark></li>
                                    <li className='collapsible-label-home'>Data Address: <mark className='block-info'>{newBlockdataAddress}</mark></li>
                                    <li className='collapsible-label-home'>Timestamp: <mark className='block-info'>{newBlockTimeStamp}</mark></li>
                                    {newBlockParentHash && <li className='collapsible-label-home'>Parent Hash: <mark className='block-info'>{newBlockParentHash}</mark></li>}
                                    <li className='collapsible-label-home'>Block Hash: <mark className='block-info'>{newBlockHash}</mark></li>
                                    <li className='collapsible-label-home'>Owner Public Key: <mark className='block-info'>{newBlockOwnerPublicKey}</mark></li>
                                    <li className='collapsible-label-home'>Signature: <mark className='block-info'>{newBlockSignature}</mark></li>
                                </ul>
                            </Collapsible>}
                        </div>
                    </div>
                </ReactSplit>
            </div>
        </div>
    );
}

export default Home;