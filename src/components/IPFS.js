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
            console.log("There is no content associated with this data address")
        }
    }
}

export default IPFS;