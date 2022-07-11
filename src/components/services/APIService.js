export default class APIService {
    static addBlock(header, content, type, parentHash, author) {
        const newBlock = {
            header: header,
            content: content,
            type: type,
            parentHash: parentHash,
            author: author
        }

        return fetch('/addBlock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(newBlock)
            })
            .catch(error => console.error('Error:', error))
    }

    static fetchData(dataAddress) {
        return fetch(`/getData/${dataAddress}`)
        .catch(error => console.error('Error:', error))
    }
};