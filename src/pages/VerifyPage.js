import React from 'react';
import './VerifyPage.css';
import Grid from '@material-ui/core/Grid';
import VerifyTab from '../components/TabComponent/VerifyTab';


function VerifyPage(props) {
    return (        
        <Grid container direction={'column'} spacing={3}>
            <Grid item>
                <VerifyTab parentProps={props}/>
            </Grid>
        </Grid>
    )
}

export default VerifyPage;