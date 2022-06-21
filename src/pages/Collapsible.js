import React from "react";
import "./Collapsible.css";

function Collapsible(props) {
    const [isOpen, setIsOpen] = React.useState(false);
    
    const parentRef = React.useRef();
    
    return (
        <div className="collapsible">
            <button className="toggle" onClick={ () => setIsOpen(!isOpen)}>
                {props.header}
            </button>
            <div className="content-parent"
                 ref={parentRef}
                 style={isOpen ? {height: parentRef.current.scrollHeight + "px"} : {height: "0px"}}
            >
                <div className="content"> {props.children} </div> 
            </div>
        </div>
    );
}

export default Collapsible;