import React from "react";
import './Tab.css'
import TextTab from "./TextTab/TextTab";
import ImageTab from "./ImageTab/ImageTab";

function Tabs(props) {

    const [activeTab, setActiveTab] = React.useState("tab1");

    const handleTab1 = () => {
        setActiveTab("tab1");
    }

    const handleTab2 = () => {
        setActiveTab("tab2");
    }


    return (
        <div className="Tabs">
            <h2 className='addBlockHeader'> Add Block </h2> 
            <ul className="nav">
                <li className={activeTab === "tab1" ? "active" : ""} onClick={handleTab1}>Text Tab</li>
                <li className={activeTab === "tab2" ? "active" : ""} onClick={handleTab2}>Image Tab</li>
            </ul>
            <div className="outlet">
                {activeTab === "tab1" ? <TextTab parentProps={props}/> : <ImageTab parentProps={props}/>}
            </div>
        </div>
    );
};

export default Tabs;