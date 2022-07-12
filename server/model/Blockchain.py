import numpy as np
from __future__ import annotations
from tqdm import tqdm
from .Block import *
from .Graph import *

class BlockIsNotFoundError(Exception):
    """Error for when a block is not found in the blockchain"""
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

class ParentDoesNotContainChildError(Exception):
    """Error when a Parent does not contain a child block while a traceback is being done"""
    def __init__(self):
        self.message = f"The child block points to the parent block which does not contain the child block"
        super().__init__(self.message)

class InvalidParentHashError(Exception):
    """Error for mismatch in Hash of parent and child"""
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
        """Mines a new block and adds it to the blockchain

        Args:
            parent_block_hash (_type_): hash of the parent block
            new_block (_type_): block to be mined

        Raises:
            MaxNonceError: when the maximum nonce has been reached

        Returns:
            block: the mined block
        """
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
    
    def getBlockFromDataAddress(self, data_address: str) -> Block:
        """Returns block from provided data address

        Args:
            data_address (str): data address of the block to retrieve

        Returns:
            Block: Block to be retrieved
        """
        for key, block in self.blockMappings.items():
            if block.data_address == data_address:
                return block
        raise BlockIsNotFoundError("Block is not found but is in IPFS")
    
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
                raise ParentDoesNotContainChildError()
            block = parent_block
            history.append(block)
        return history[::-1]
    
    def saveData(self, filepath: str) -> None:
        """Saves the blockchain to a file locating in the filepath provided

        Args:
            filepath (str): path to the directory where the blockchain will be saved
        """
        listOfBlocks = list(self.blockMappings.values())
        Block.storeBlocks(listOfBlocks, filepath)
    
    def printBlockGraph(self) -> None:
        """Prints the block graph"""
        self.graph.printGraph(self.blockMappings)
        
    def saveBlockGraph(self) -> None:
        """Saves the block graph to a file"""
        self.graph.exportGraph(self.blockMappings)

    @staticmethod
    def isValidProof(block, block_hash) -> bool:
        """Function to check if the proof of work is valid

        Args:
            block (_type_): block to be checked
            block_hash (_type_): hash of the block to be checked

        Returns:
            bool: True if the proof of work is valid, False otherwise
        """
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