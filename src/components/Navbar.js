import { Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

function Navbar() {
  return (
    <div className='navbar-container'>
        <Grid container direction={'row'} spacing={1}>
            <header id="header" className='header'>
                <nav className="links">
                    <Grid item>
                        <Link className="link" to="/">Home</Link>
                    </Grid>
                    <Grid item>
                        <Link className="link" to="/Blocks">Block Page</Link>
                    </Grid>
                    <Grid item>
                        <Link className="link" to="/Trace">Trace Page</Link>
                    </Grid>
                    <Grid item>
                        <Link className="link" to="/IPFS">IPFS Page</Link>
                    </Grid>
                    <Grid item>
                        <Link className="link" to="/Verify">Verify Page</Link>
                    </Grid>
                </nav>
            </header>
        </Grid>
    </div>
  );
}

export default Navbar;