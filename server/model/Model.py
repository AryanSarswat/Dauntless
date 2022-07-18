from __future__ import annotations
from .Blockchain import Blockchain
from .Encryption import TextSignature
from .IPFS import IPFS
from .Block import Block
import json
import os

class ModelManager():
    """Class to encapsulate the Blockchain, IPFS and Encryption"""
    def __init__(self) -> None:
        self.users = dict()
        self.blockchain = Blockchain()
        self.IPFS = IPFS()
                
    def addUser(self, user: str) -> None:
        self.users[user] = TextSignature(user)
        
    def getBlocks(self) -> list[Block]:
        return list(self.blockchain.blockMappings.values())
    
    def getDataFromIPFS(self, data_address: str) -> str:
        return self.IPFS.getText(data_address)
        
    def addBlock(self, header: str, text: str, author: str, type: str, parentBlockHash: str) -> None:
        if author not in self.users:
            self.addUser(author)
        
        data_address = self.IPFS.store(text, type)
        data_address_hash, signature = self.users[author].sign(data_address)
        publicKey = self.users[author].getPublicKey()
        
        block = Block.createNewBlock(header, data_address, data_address_hash, parentBlockHash, signature, publicKey, type=type)
        return self.blockchain.mine(parentBlockHash, block)
        
    def saveData(self, filepath):
        blocks = list(self.blockchain.blockMappings.values())
        Block.storeBlocks(blocks, filepath)
        
        self.IPFS.saveData(filepath)
        
        users_filename = os.path.join(filepath, "users.json")
        with open(users_filename, 'w') as file:
            toWrite = json.dumps(self.users, default= lambda x: x.toDict(), indent = 4)
            file.write(toWrite)
    
    def loadData(self, filepath):
        self.blockchain = Blockchain.loadBlockchain(filepath)
        self.IPFS.loadData(filepath)
        try:
            users_filename = os.path.join(filepath, "users.json")
            with open(users_filename, 'r') as file:
                self.users = json.loads(file.read(), object_hook=TextSignature.fromDict)
        except FileNotFoundError:
            pass
        
    def verifyVeracity(self, blockHash: str) -> list[tuple]:
        """Verifies the veracity of the given block and return the trace history

        Args:
            blockHash (str): hash of the block to verify

        Returns:
            list[tuple]: list of tuples containing the block and the verification result
        """
        history = self.blockchain.traceBlock(blockHash)
        blockVeracity = []
        for block in history:
            trust = True
            if not Blockchain.isValidProof(block, block.getHash()):
                trust = False
            if block.parent_hash is not None and (block.getHash() not in self.blockchain.blockMappings[block.parent_hash].child_hashes):
                trust = False
            if block.data_address not in self.IPFS.storage:
                trust = False
            if not TextSignature.verify(block.data_address_hash, block.owner_signature, block.owner_public_key):
                trust = False
            
            blockVeracity.append((block, trust))
        
        return blockVeracity
    
    def verifyInformation(self, information) -> bool:
        """Verifies whether the given information is present in the Blockchain

        Args:
            information (str): information to verify

        Returns:
            bool: True if the information is present in the Blockchain, False otherwise
        """
        isInIPFS = self.IPFS.isInIPFS(information)
        if isInIPFS:
            textDataAddress = self.IPFS.getDataAddress(information)
            isVerified = self.blockchain.getBlockFromDataAddress(textDataAddress)
            return isVerified
