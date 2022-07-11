from __future__ import annotations

import numpy as np
from tqdm import tqdm
from .Block import *
from .Graph import *

class ParentDoesNotContainCHildError(Exception):
        def __init__(self):
            self.message = f"The child block points to the parent block which does not contain the child block"
            super().__init__(self.message)

class InvalidParentHashError(Exception):
    def __init__(self, actual_parent_hash, block_parent_hash):
        self.parent_hash = actual_parent_hash
        self.block_parent_hash = block_parent_hash
        self.message = f"The actual parent's hash is {self.parent_hash} " \
                       f"\n The stored parent hash of the block is {self.block_parent_hash}"
        super().__init__(self.message)

class InvalidProofOfWork(Exception):
    def __init__(self, proof):
        self.proof = proof
        self.message = f"The proof of work provided is {self.proof}"
        super().__init__(self.message)

class MaxNonceError(Exception):
    def __init__(self):
        self.message = f"The maximum nonce has been reached"
        super().__init__(self.message)
  
class Blockchain:
    # Static Constants
    DIFFICULTY = 2
    MAX_NONCE = 2 ** 32

    def __init__(self):
        self.graph = Graph()
        self.blockMappings = dict()

    def mine(self, parent_block_hash, new_block) -> None:
        new_block.computeHash()
        for n in tqdm(range(self.MAX_NONCE), desc="Mining Block"):
            if self.isValidProof(new_block, new_block.getHash()):
                if parent_block_hash is not None:
                    parent_block = self.blockMappings[parent_block_hash]
                    parent_block.addChild(new_block.getHash())
                else:
                    parent_block = None
                self.graph.addBlock(parent_block, new_block)
                self.blockMappings[new_block.getHash()] = new_block
                return new_block
            else:
                new_block.nonce += 1
                new_block.computeHash()
        raise MaxNonceError()

    def getBlock(self, block_hash: bytes) -> Block:
        """Returns block from provided hash

        Args:
            block_hash (bytes): hash of the block to retrieve

        Returns:
            Block: Block to be retrieved
        """
        return self.blockMappings[block_hash]
    
    def traceBlock(self, blockHash: str) -> list[Block]:
        """traces the block to the genesis block

        Args:
            block (Block): block to be traced

        Returns:
            list[Block]: list of blocks from genesis to the block provided
        """
        block = self.blockMappings[blockHash]
        history = [block]
        while block.parent_hash is not None:
            parent_block = self.getBlock(block.parent_hash)
            if block.getHash() not in parent_block.child_hashes:
                raise ParentDoesNotContainCHildError()
            block = parent_block
            history.append(block)
        return history[::-1]
    
    def saveData(self, filename: str) -> None:
        listOfBlocks = list(self.blockMappings.values())
        Block.storeBlocks(listOfBlocks, filename)
    
    def printBlockGraph(self) -> None:
        self.graph.printGraph(self.blockMappings)
        
    def saveBlockGraph(self) -> None:
        self.graph.exportGraph(self.blockMappings)

    @staticmethod
    def isValidProof(block, block_hash) -> bool:
        block_hash = bytes.fromhex(block_hash)
        return block_hash.startswith(b'0' * Blockchain.DIFFICULTY) and block_hash.hex() == block.computeHash()
    
    @staticmethod
    def loadBlockchain(filename) -> Blockchain:
        """
        Loads a blockchain from a file
        """
        blocks = Block.loadBlocks(filename)
        mappings = dict()
        for block in blocks:
            mappings[block.getHash()] = block
        
        graph = Graph.loadBlockGraph(blocks, mappings)
        
        blockchain = Blockchain()
        blockchain.graph = graph
        blockchain.blockMappings = mappings
        
        return blockchain
    

if __name__ == "__main__":
    init = Blockchain()
    initBlock = Block.createNewBlock("Block 0", '0x1', '0x5', None, '0x3', ('0x4', 0))
    
    init.mine(None, initBlock)
    
    for i in range(10):
        parent = np.random.choice(list(init.blockMappings.values()))
        to_add = Block.createNewBlock(f"Block {i + 1}", np.random.randint(0, 100).to_bytes(10, 'big').hex(), f"0x{np.random.randint(0,100)}",
                       parent.getHash(), f"0x24{np.random.randint(0,7)}", ('0x0',0))
        init.mine(parent.getHash(), to_add)

    init.printBlockGraph()
    print(init.traceBlock(list(init.blockMappings.keys())[-1]))
    
    # Test Storing
    listOfBlocks = list(init.blockMappings.values())
    Block.storeBlocks(listOfBlocks, "src\\main\\storage\\Blocks.json")

    # Test loading
    blockCheck = Blockchain.loadBlockchain("src\\main\\storage\\Blocks.json")
    
    blockCheck.printBlockGraph()
    blockCheck.saveBlockGraph()