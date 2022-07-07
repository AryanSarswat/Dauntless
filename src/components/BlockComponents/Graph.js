//! Add Exception Handling

import Block from "./Block";

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

    static fromJSON(json) {
        const graph = new Graph(Block.createGenesisBlock());
        const arr = Object.fromEntries(json.edgeDictionary);
        for (const [key, value] of Object.entries(arr)) {
            graph.edgeDictionary[key] = Block.fromJSON(value);
        }
        graph.numberNodes = json.numberNodes;
        return graph;
    }
}

export default Graph;