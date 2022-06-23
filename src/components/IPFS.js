var hash = require('object-hash')

class IPFS {
    constructor() {
        this.storage = {}
    }

    store(content) {
        const dataAddress = hash(content)
        this.storage[dataAddress] = content
        return dataAddress
    }

    retrieve(dataAddress) {
        if (dataAddress in this.storage) {
            return this.storage[dataAddress]
        } else {
            return "There is no content associated with this data address"
        }
    }

    getAll() {
        return Object.entries(this.storage)
    }
}

export default IPFS;