import React from 'react';
import ReactSplit, { SplitDirection } from '@devbookhq/splitter'
import FloatingLabel from "react-bootstrap-floating-label";
import "./Home.css"

function Home() {

    return (
        <div className="home">
            <div className = "split-pane">
                <ReactSplit  direction={SplitDirection.Horizontal}>
                    <div className="left-side-content">
                        <div className="form-container">
                            <h2> Add Block </h2>
                            
                            <FloatingLabel label="Header " id='header' className= 'floating-label'/>
                            <FloatingLabel label="Author " id='author' className= 'floating-label'/>
                            <FloatingLabel label="Parent Hash " id='hash' className= 'floating-label'/>
                            <FloatingLabel label="Content " id='content' className= 'floating-label'/>

                            <button className="add-block-btn"><span>Add Block</span></button>

                        </div>
                    </div>

                    <div className="right-side-content">
                        <div className="block-container">
                            <label className="block-header">Block Header</label>
                            <label className="block-author">Block Author</label>
                            <label className="block-content">Block Content</label>
                            <label className="block-author">Data address</label>
                            <label className="block-hash">Block Hash</label>
                            <label className="block-hash">Public Key</label>
                            <label className="block-hash">Signature </label>
                            <label className="block-hash">Parent Hash</label>
                            <label className="block-hash">Timestamp</label>
                        </div>
                    </div>
                </ReactSplit>
            </div>
        </div>
    );
}

export default Home;