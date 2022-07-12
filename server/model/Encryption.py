from __future__ import annotations
from Crypto.PublicKey import RSA
from hashlib import sha512
from .IPFS import *


class TextSignature:
    """Class to represent third party signature authority
    """
    def __init__(self, owner: str) -> None:
        self.keyPair = RSA.generate(1024)
        self.owner = owner
        
    def getPublicKey(self) -> tuple[bytes, int]:
        """Returns the public key of the signature authority

        Returns:
            tuple[bytes, int]: tuple contain the public key
        """
        return (hex(self.keyPair.e), self.keyPair.n)

    def sign(self, message: str) -> list[str]:
        """Signs a message using the public/private key pair

        Args:
            message (bytes): message to be signed

        Returns:
            list[str]: a list containing the message hash and associated signature
        """
        message = bytes.fromhex(message)
        messageHash = sha512(message).digest()
        m = int.from_bytes(messageHash, byteorder='big')
        return [hex(m), hex(pow(m, self.keyPair.d, self.keyPair.n))]

    @staticmethod
    def verify(messageHash: str, signature: str, publicKey: tuple[int, int]) -> bool:
        """verifies the signature of a message

        Args:
            messageHash (str): hash of the message
            signature (str): associated signature of the message
            publicKey (int): public key of the third party
            n (int): modulus of the third party
        Returns:
            bool: boolean representing the validity of the signature
        """
        # Check that the message_hash and signature are valid
        assert messageHash[:2] == '0x'
        assert signature[:2] == '0x'
        
        messageHash = int(messageHash, 16)
        signature = int(signature, 16)
        
        check = pow(signature, int(publicKey[0], 16), publicKey[1])
        return check == messageHash
    
    def toDict(self):
        return (self.keyPair.d, self.keyPair.e, self.keyPair.n)
    
    @staticmethod
    def fromDict(jsonVal: tuple) -> dict:
        """Creates a dictionary mapping the author to the TextSignature object

        Args:
            jsonVal (tuple): json dictionary containing TextSignature attributes and author name

        Returns:
            dict: dictionary mapping the author to the TextSignature object
        """
        dictionary = dict()
        for key, value in jsonVal.items():
            d, e, n = value
            
            keyPair = RSA.construct((n, e, d))
            authority = TextSignature(key)
            authority.keyPair = keyPair
            dictionary[key] = authority
            
        return dictionary
        
        
if __name__ == "__main__":
    MCI = TextSignature('MCI')
    IPFS = IPFS()
    
    author = "This was created by MCI"
    author_address = IPFS.store(author)

    messageHash, signature = MCI.sign(author_address)

    
    print(f"Signature: {signature}")
    print("\n")
    print(f"Message Hash: {messageHash}")
    print("\n")

    print(f"Verification: {TextSignature.verify(messageHash, signature, MCI.getPublicKey())}")


    tamperedMessage = 'Random text'
    hash = sha512(tamperedMessage.encode('utf-8')).digest()
    hash = hex(int.from_bytes(hash, byteorder='big'))

    print(f"Verification of random text: {TextSignature.verify(hash, signature, MCI.getPublicKey())}")

    Another_org = TextSignature('Another_org')
    print(f"Verification with different publsic key: "
            f"{Another_org.verify(messageHash, signature, Another_org.getPublicKey())}")
