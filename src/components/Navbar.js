import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

function Navbar() {
  return (
    <div>
        <header id="header">
            <nav className="links">
              <Link className= "link" to="/">Home</Link>
              <Link className= "link" to="/Blocks">Block Page</Link>
              <Link className= "link" to="/Trace">Trace Block</Link>
              <Link className= "link" to="/IPFS">IPFS Page</Link> 
              //! TODO Add Verify Page
            </nav>
        </header>
    </div>
  );
}

export default Navbar;