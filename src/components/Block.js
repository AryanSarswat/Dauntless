var hash = require('object-hash');


class Block {

    constructor(header, dataAddress, dataAddressHash, parentHash, signature, timestamp, ownerPublicKey, nonce=0, childHashes=[]) {
        // Meta Data for the block
        this.header = header;
        this.dataAddress = dataAddress;
        this.timestamp = timestamp
        this.parentHash = parentHash || null;
        this.childHashes = childHashes;

        // Owner Public key which can be used to prove that this block is from the aforementioned authority
        this.dataAddressHash = dataAddressHash;
        this.signature = signature;
        this.ownerPublicKey = ownerPublicKey;

        // The nonce is for the Proof-of-Work algorithm
        this.nonce = nonce;
    }

    get hash() {
        let hashedItems = {
            dataAddress: this.dataAddress,
            timestamp: this.timestamp,
            parentHash: this.parentHash,
            signature: this.signature,
            nonce: this.nonce,
        }
        return hash(hashedItems)
    }

    get time() {
        let date = new Date(this.timestamp)
        return date.toLocaleString()
    }

    addChild(child) {
        this.childHashes.push(child.hash)
    }

    static createBlock(header, dataAddress, dataAddressHash, parentHash, signature, ownerPublicKey, nonce=0, childHashes=[]) {
        let timestamp = new Date().getTime()
        return new Block(header, dataAddress, dataAddressHash, parentHash, signature, timestamp, ownerPublicKey, nonce, childHashes)
    }
}

export default Block
