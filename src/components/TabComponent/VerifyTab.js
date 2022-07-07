import React from "react";
import './VerifyTab.css'
import Grid from "@material-ui/core/Grid";
import VerifyTextTab from "./VerifyTextTab";
import VerifyImageTab from "./VerifyImageTab";

function VerifyTab(props) {

    const [activeTab, setActiveTab] = React.useState("tab1");

    const handleTab1 = () => {
        setActiveTab("tab1");
    }

    const handleTab2 = () => {
        setActiveTab("tab2");
    }


    return (
        <Grid container direction={'column'} spacing={2} className="VerifyTabs">
            <Grid item>
                <h2 className='verify-block-header'>Verify Content</h2> 
            </Grid>
            <Grid item>
                <ul className="nav">
                    <li className={activeTab === "tab1" ? "active" : ""} onClick={handleTab1}>Text</li>
                    <li className={activeTab === "tab2" ? "active" : ""} onClick={handleTab2}>Image</li>
                </ul>
            </Grid>
            <Grid item className="VerifyOutlet">
                {activeTab === "tab1" ? <VerifyTextTab parentProps={props.parentProps}/> : <VerifyImageTab parentProps={props.parentProps}/>}
            </Grid>
        </Grid>
    );
};

export default VerifyTab;