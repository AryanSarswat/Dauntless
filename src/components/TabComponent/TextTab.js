import React from "react";
import './TextTab.css';
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";

function TextTab(props){
    const [header, setHeader] = React.useState("")
    const [author, setAuthor] = React.useState("")
    const [parentHash, setParentHash] = React.useState("")
    const [content, setContent] = React.useState("")

    const onSubmit = (event) => {
        event.preventDefault();

        const newBlock = props.parentProps.blockchain.addBlock(header, content, 'text', parentHash, author)

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
            <Grid container direction={"column"} spacing={2}>
                <Grid item>
                    <TextField id="text-field-TextTab" value={header} className='text-field-TextTab' label="Header" variant="filled" onChange={event => setHeader(event.target.value)}/>
                </Grid>
                <Grid item>
                    <TextField id="text-field-TextTab" value={author} className='text-field-TextTab' label="Ministry" variant="filled" onChange={event => setAuthor(event.target.value)}/>
                </Grid>
                <Grid item>
                    <TextField id="text-field-TextTab" value={parentHash} className='text-field-TextTab' label="Parent Hash" variant="filled" onChange={event => event.target.value !== "" ? setParentHash(event.target.value) : null}/>
                </Grid>
                <Grid item>
                    <TextField id="text-field-TextTab" value={content} className='text-field-TextTab-content' label="Content" onChange={event => setContent(event.target.value)}
                    minRows={9}
                    maxRows={9}
                    multiline
                    placeholder="Enter your text here"
                    variant="filled"
                    />
                </Grid>
                <Grid item>
                    <button className="add-block-btn-TextTab" onClick={onSubmit}><span>Add Block</span></button>
                </Grid>
            </Grid>
        </div>
    );
};
export default TextTab;