class Graph {
    constructor() {
        this.edgeDictionary = {};
        this.numberNodes = 0;
    }

    addBlock(parentBlock, childBlock) {
        if (parentBlock != null) {
            this.edgeDictionary[parentBlock.hash].push(childBlock.hash);
        }
        this.edgeDictionary[childBlock.hash] = [];        
        this.numberNodes++;
    }
}

export default Graph;