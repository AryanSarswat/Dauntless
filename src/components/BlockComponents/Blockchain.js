import Encryption from './Encryption.js';
import Graph from './Graph.js';
import Block from './Block.js';
import IPFS from './IPFS.js';

//! Add Exception Handling

class BlockChain {

    DIFFICULTY = 2;
    MAX_NONCE = 2 ** 32;
    GENESIS_BLOCK = Block.createGenesisBlock()



    constructor(old=null) {
        if (old != null) {
            this.chain = Graph.fromJSON(old.chain)
            this.blockMappings = old.blockMappings
            this.users = old.users
            this.ipfs = IPFS.fromJSON(old.ipfs)
        } else {
            this.chain = new Graph(this.GENESIS_BLOCK)
            this.blockMappings = {}
            this.users = {}
            this.ipfs = new IPFS()
        }
        this.encryptionThirdParty = new Encryption()
        this.blockMappings[this.GENESIS_BLOCK.hash] = this.GENESIS_BLOCK
    }

    addBlock(header, content, contentType, parentHash, author) {
        if (!(author in this.users)) {
            this.users[author] = Encryption.generateKeyPair()
        }
        
        const publicKey = this.users[author]['publicKey']
        const privateKey = this.users[author]['privateKey']
        
        const dataAddress = this.ipfs.store(content, contentType)

        const signature = Encryption.signText(content, privateKey);

        const newBlock = Block.createBlock(header, dataAddress, parentHash || this.GENESIS_BLOCK.hash, signature, publicKey)

        this.mine(parentHash || this.GENESIS_BLOCK.hash, newBlock)

        return newBlock
    }


    

    mine(parentBlockHash, newBlock) {
        for (let i = 0; i < this.MAX_NONCE; i++) {
            if (BlockChain.isValidProof(newBlock.hash)) {
                let parentBlock = this.blockMappings[parentBlockHash];
                parentBlock.addChild(newBlock)
                this.chain.addBlock(parentBlock, newBlock)
                this.blockMappings[newBlock.hash] = newBlock
                break;
            } else {
                newBlock.nonce++
            }
        }
    }

    getBlock(blockHash) {
        return this.blockMappings[blockHash]
    }

    getAllBlocks() {
        return Object.values(this.blockMappings)
    }

    traceBlock(blockHash) {
        if (blockHash === "") {
            return []
        }

        if (!(blockHash in this.blockMappings)) {
            return []
        }

        let block = this.getBlock(blockHash)
        let trace = []
        while (block != null) {
            if (block === this.GENESIS_BLOCK) {
                break;
            }
            let verify = Encryption.verifySignature(this.ipfs.retrieve(block.dataAddress), block.signature, block.ownerPublicKey)
            const toPush = {
                block: block,
                verified: verify,
            }
            trace.unshift(toPush)
            block = this.getBlock(block.parentHash)
        }
        return trace
    }

    isValidHash(blockHash) {
        return blockHash in this.blockMappings
    }

    verifyContent(content, type) {
        return this.ipfs.verify(content, type)
    }

    static isValidProof(blockHash) {
        let guess = BlockChain.hexToBinary(blockHash)
        for(let i = 0; i < this.DIFFICULTY; i++) {
            if (guess[i] !== '0') {
                return false
            } 
        }
        return true
    }

    static hexToBinary(hex) {
        let out = "";
        for(const element of hex) {
            switch(element) {
                case '0': out += "0000"; break;
                case '1': out += "0001"; break;
                case '2': out += "0010"; break;
                case '3': out += "0011"; break;
                case '4': out += "0100"; break;
                case '5': out += "0101"; break;
                case '6': out += "0110"; break;
                case '7': out += "0111"; break;
                case '8': out += "1000"; break;
                case '9': out += "1001"; break;
                case 'a': out += "1010"; break;
                case 'b': out += "1011"; break;
                case 'c': out += "1100"; break;
                case 'd': out += "1101"; break;
                case 'e': out += "1110"; break;
                case 'f': out += "1111"; break;
                default: return "";
            }
        }
        return out;
    }
}

export default BlockChain;