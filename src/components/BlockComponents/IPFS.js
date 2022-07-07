var hash = require('object-hash')

//!TODO Add exception handling
class IPFS {
    constructor() {
        this.storage = {}
    }

    store(content, type) {
        const dataAddress = hash(content)
        this.storage[dataAddress] = [content, type]
        return dataAddress
    }

    retrieve(dataAddress) {
        if (dataAddress in this.storage) {
            return this.storage[dataAddress]
        } else {
            return ["There is no content associated with this data address", "text"]
        }
    }

    verify(content, type) {
        const dataAddress = hash(content)
        if (dataAddress in this.storage) {
            const storedType = this.storage[dataAddress][1]
            if (storedType === type) {
                return true
            } else {
                return false
            }
        }
    }

    getAll() {
        return Object.entries(this.storage)
    }

    static fromJSON(old) {
        const newIPFS = new IPFS()
        newIPFS.storage = old.storage
        return newIPFS
    }
}

export default IPFS;