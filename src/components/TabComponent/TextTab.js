import React from "react";
import FloatingLabel from "react-bootstrap-floating-label";
import './TextTab.css';
import TextField from '@material-ui/core/TextField';

function TextTab(props){
    const [header, setHeader] = React.useState("")
    const [author, setAuthor] = React.useState("")
    const [parentHash, setParentHash] = React.useState("") //! TODO Change to such that genesis block is used if no parentHash is provided
    const [content, setContent] = React.useState("")

    const onSubmit = (event) => {
        event.preventDefault();

        const newBlock = props.parentProps.blockchain.addBlock(header, content, parentHash, author)

        props.parentProps.setNewBlockHeader(newBlock.header)
        props.parentProps.setNewBlockdataAddress(newBlock.dataAddress)
        props.parentProps.setNewBlockTimeStamp(newBlock.time)
        props.parentProps.setNewBlockParentHash(newBlock.parentHash)
        props.parentProps.setNewBlockHash(newBlock.hash)
        props.parentProps.setNewBlockSignature(newBlock.signature)
        props.parentProps.setNewBlockOwnerPublicKey(newBlock.ownerPublicKey.slice(26, newBlock.ownerPublicKey.length - 25))

        setHeader("")
        setAuthor("")
        setParentHash("")
        setContent("")
    }

    return (
        <div className="TextTab">
            <div className="form-container-TextTab">
                <FloatingLabel label="Header " id='header' className= 'floating-label-TextTab' onChange={event => setHeader(event.target.value)}/>
                <FloatingLabel label="Ministry " id='author' className= 'floating-label-TextTab' onChange={event => setAuthor(event.target.value)}/>
                <FloatingLabel label="Parent Hash " id='hash' className= 'floating-label-TextTab' onChange={event => event.target.value !== "" ? setParentHash(event.target.value) : null}/>
                <TextField id="text-field-TextTab" label="Content" 
                className="text-field-TextTab"
                onChange={event => setContent(event.target.value)}
                rows={15}
                multiline
                placeholder="Enter your text here"
                variant="filled"
                />
                <button className="add-block-btn-TextTab" onClick={onSubmit}><span>Add Block</span></button>
            </div>
        </div>
    );
};
export default TextTab;