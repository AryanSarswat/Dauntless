//! Add Exception Handling

class Graph {
    constructor(genesisBlock) {
        this.edgeDictionary = {};
        this.edgeDictionary[genesisBlock.hash] = [];
        this.numberNodes = 0;
    }

    addBlock(parentBlock, childBlock) {
        this.edgeDictionary[parentBlock.hash].push(childBlock.hash);
        this.edgeDictionary[childBlock.hash] = [];        
        this.numberNodes++;
    }
}

export default Graph;