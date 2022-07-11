class Block {

    constructor(header, dataAddress, parentHash, signature, timestamp, ownerPublicKey, nonce, data, hash, verified) {
        // Meta Data for the block
        this.header = header;
        this.dataAddress = dataAddress;
        this.timestamp = timestamp
        this.parentHash = parentHash;

        // Owner Public key which can be used to prove that this block is from the aforementioned authority
        this.signature = signature;
        this.ownerPublicKey = ownerPublicKey;

        // The nonce is for the Proof-of-Work algorithm
        this.nonce = nonce;
        this.verified = verified;

        // The hash of the block
        this.hash = hash;

        // The Data in the block
        this.data = data;
    }
}

export default Block;
