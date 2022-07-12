from __future__ import annotations
import json
import datetime
import hashlib
import os

class HashNotComputedError(Exception):
    def __init__(self):
        self.message = f"Hash has not been computed"
        super().__init__(self.message)

class Block:
    def __init__(self, header: str, data_address: str, data_address_hash: str,
                 parent_hash: str, signature: str, owner_public_key: tuple, type: str,
                 nonce=0, timestamp=datetime.datetime.now(), hash=None, child_hashes=[]) -> None:
        
        # Metadata information for the block
        self.header = header
        self.data_address = data_address
        self.timestamp = timestamp
        self.type = type
        self.parent_hash = parent_hash
        self.child_hashes = child_hashes
        
        # Owner Public key which can be used to prove that this block is from the aforementioned authority
        self.data_address_hash = data_address_hash
        self.owner_signature = signature
        self.owner_public_key = owner_public_key
        
        # The nonce is for the Proof-of-Work algorithm
        self.nonce = nonce
        self.hash = hash

    def computeHash(self) -> str:
        """Function which computes the hash of the block using the following attributes
        1) data_address 
        2) distance_from_origin 
        3) parent_hash 
        4) timestamp
        5) owner_signature
        6) nonce
        Returns:
            bytes: The hash of the block
        """
        tempHash = hashlib.sha256()
        # Hash of block is computed using the following properties
        tempHash.update(
            str(self.nonce).encode('utf-8') +
            str(self.data_address).encode('utf-8') +
            str(self.parent_hash).encode('utf-8') +
            str(self.timestamp).encode('utf-8') +
            str(self.owner_signature).encode('utf-8')
        )

        self.hash = tempHash.digest().hex()
        return self.hash

    def getHash(self) -> str:
        """Returns the hash of the block
        Raises:
            HashNotComputedError: Raises error if the hash has not been computed
        Returns:
            bytes: hash of the block
        """
        if self.hash is not None:
            return self.hash
        else:
            raise HashNotComputedError()

    def toDict(self) -> dict:
        """Converts this object to a dictionary for conversion to JSON
        Returns:
            dict: dictionary with this object's attributes
        """
        d = dict()
        d['header'] = self.header
        d['data_address'] = self.data_address
        d['timestamp'] = self.timestamp.__str__()
        d['type'] = self.type
        if self.parent_hash is not None:
            d['parent_hash'] = self.parent_hash
        else:
            d['parent_hash'] = None
        d['data_address_hash'] = self.data_address_hash
        d['owner_signature'] = self.owner_signature
        d['owner_public_key'] = self.owner_public_key[0]
        d['n'] = self.owner_public_key[1]
        d['nonce'] = self.nonce
        d['hash'] = self.hash
        d['child_hashes'] = self.child_hashes
        return d
    
    def addChild(self, child: bytes) -> None:
        """Adds child to child_hash list
        Args:
            child (bytes): hash of the child block
        """
        self.child_hashes.append(child)
        
    
    @staticmethod
    def createNewBlock(header: str, data_address: bytes, data_address_hash: str,
                 parent_hash: str, signature: str, owner_public_key: bytes, type: str) -> Block:
        """_summary_
        Args:
            header (str): Name of block
            dist_from_origin (int): distance from original block
            data_address (bytes): address of data
            parent_hash (bytes): hash of parent block
            signature (str): signature of block
            owner_public_key (bytes): owner's public key and n value
        Returns:
            Block: New block
        """
        return Block(header, data_address, data_address_hash,
                 parent_hash, signature, owner_public_key, type, 
                 nonce=0, timestamp=datetime.datetime.now(), hash=None, child_hashes=[], type=type)
    
    @staticmethod
    def fromDict(json_dict: dict):
        """Creates a block from a json string
        Args:
            json (str): The json string
        Returns:
            Block: The block object
        """
        header = json_dict['header']
        data_address = json_dict['data_address']
        parent_hash = json_dict['parent_hash'] if json_dict['parent_hash'] is not None else None
        timestamp = datetime.datetime.strptime(json_dict['timestamp'], "%Y-%m-%d %H:%M:%S.%f")
        owner_signature = json_dict['owner_signature']
        owner_public_key = json_dict['owner_public_key'], json_dict['n']
        type = json_dict['type']
        nonce = json_dict['nonce']
        hash = json_dict['hash']
        child_hashes = json_dict['child_hashes']
        data_address_hash = json_dict['data_address_hash']
        return Block(header, data_address, data_address_hash, parent_hash, owner_signature, owner_public_key, type, 
                     nonce=nonce, timestamp=timestamp, hash=hash, child_hashes=child_hashes)

    @staticmethod
    def loadBlocks(filename: str) -> list[Block]:
        """Load blocks from storage

        Args:
            filename (str): path to folder containing the Block.json file

        Returns:
            list[Block]: list of blocks stored in the Block.json file
        """
        filename = os.path.join(filename, 'Blocks.json')
        try:
            with open(filename, 'r') as file:
                blocks = json.loads(file.read(), object_hook=Block.fromDict)
            return blocks
        except FileNotFoundError:
            print("Block.json File not found")
            return []

    @staticmethod
    def storeBlocks(blocks: list[Block], filename: str) -> None:
        """Stores blocks to a file named Block.json in the path provided

        Args:
            blocks (list[Block]): list of blocks to store
            filename (str): path of folder to store the Block.json file
        """
        filename = os.path.join(filename, 'Blocks.json')
        with open(filename, 'w') as file:
            toWrite = json.dumps(blocks, default=lambda o: o.toDict(), indent = 4)
            file.write(toWrite)
        file.close()
        
    def __repr__(self) -> str:
        return f"Block Header: {self.header} \nBlock Hash: {self.hash} " \
               f"\nParent Hash: {self.parent_hash}" \
               f"\nBlock Data: {self.data_address} \nNonce: {self.nonce}" \
               f"\nSignature: {self.owner_signature}"

    def __str__(self) -> str:
        return self.header