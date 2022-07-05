import Encryption from './Encryption.js';
import Graph from './Graph.js';
import Block from './Block.js';
import IPFS from './IPFS.js';

class BlockChain {

    DIFFICULTY = 2;
    MAX_NONCE = 2 ** 32;

    constructor() {
        this.chain = new Graph()
        this.blockMappings = {}
        this.encryptionThirdParty = new Encryption()
        this.users = {}
        this.ipfs = new IPFS()
    }

    addBlock(header, content, parentHash, author) {
        if (!(author in this.users)) {
            this.users[author] = Encryption.generateKeyPair()
        }
        
        const publicKey = this.users[author]['publicKey']
        const privateKey = this.users[author]['privateKey']
        
        const dataAddress = this.ipfs.store(content)

        const signature = Encryption.signText(content, privateKey);

        const newBlock = Block.createBlock(header, dataAddress, parentHash, signature, publicKey)

        this.mine(parentHash || null, newBlock)

        return newBlock
    }

    mine(parentBlockHash, newBlock) {
        for (let i = 0; i < this.MAX_NONCE; i++) {
            if (BlockChain.isValidProof(newBlock.hash)) {
                let parentBlock = null;
                if (parentBlockHash != null) {
                    parentBlock = this.blockMappings[parentBlockHash]
                    parentBlock.addChild(newBlock)
                } 
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

        let block = this.getBlock(blockHash)
        let trace = []
        while (block != null) {
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