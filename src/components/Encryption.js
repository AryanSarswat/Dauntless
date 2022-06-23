import { JSEncrypt } from "jsencrypt";
var hash = require('object-hash')

class Encryption {

    static generateKeyPair() {
        var crypt = new JSEncrypt({default_key_size: 2048});
        return {
            publicKey: crypt.getPublicKey(),
            privateKey: crypt.getPrivateKey()
        };
    }

    static signText(text, privateKey) {
        const signData = (text, privateKey) => {
            const encrypt = new JSEncrypt()
            encrypt.setKey(privateKey)
            const sig = encrypt.sign(text, (str) => hash(str), "sha256")
            return sig;
        }
        return signData(text, privateKey)
    }

    static verifySignature(data, signature, publicKey) {
        const verify = (data, signature, publicKey) => {
            const decrypt = new JSEncrypt()
            decrypt.setKey(publicKey)
            return decrypt.verify(data, signature)
        }
        return verify(data, signature, publicKey)
    }
}

export default Encryption;