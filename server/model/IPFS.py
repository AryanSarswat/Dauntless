import hashlib
import json
import os

class IPFS:
    def __init__(self) -> None:
        self.storage = dict()
    
    def saveData(self, filepath):
        """saves the data in the IPFS to a file called IPFS.json

        Args:
            filepath (str): path to the directory for saving the IPFS.json file
        """
        filename = os.path.join(filepath, "IPFS.json")
        with open(filename, 'w') as file:
            toWrite = json.dumps(self.storage, default= lambda x: x.hex(),indent = 4)
            file.write(toWrite)
    
    def loadData(self, filepath):
        """Loads the data from the IPFS.json file

        Args:
            filename (_type_): path to the directory for loading the IPFS.json file
        """
        filename = os.path.join(filepath, "IPFS.json")
        try:
            with open(filename, 'r') as file:
                file_content = file.read()
                if file_content != '':
                    json_dict = json.loads(file_content)
                else:
                    return dict()
            for key, value in json_dict.items():
                self.storage[key] = value
        except FileNotFoundError:
            print("No IPFS data found")
            return dict()
            
    def getText(self, hash: str) -> str:
        """Retrieves the stored information from the given hash

        Args:
            hash (str): hash of the text to retrieve

        Returns:
            str: text stored at the given hash
        """
        try:
            return self.storage[hash]
        except KeyError:
            return "No text matching the given hash found"
    
    def store(self, text: str, type: str) -> str:
        """Hashes the given text and stores it in the IPFS

        Args:
            text (str): text to store in the IPFS
            type (str): type of the text to store in the IPFS

        Returns:
            hash: hash of the text stored in the IPFS
        """
        temp_hash = hashlib.sha256()
        # Hash of block is computed using the following properties
        temp_hash.update(text.encode('utf-8'))
        hash = temp_hash.digest().hex()
        self.storage[hash] = (text, type)
        return hash
    
    def isInIPFS(self, text):
        """Checks if the given text is in the IPFS

        Args:
            text (str): text to check if it is in the IPFS

        Returns:
            bool: True if the text is in the IPFS, False otherwise
        """
        for value, type in self.storage.values():
            if value == text:
                return True
        return False
    
    def getDataAddress(self, text):
        """Returns the data address of the given text

        Args:
            text (str): text to get the data address of

        Returns:
            dataAddress (str): data address of the given text
        """
        for key, value in self.storage.items():
            if value[0] == text:
                return key
        return None


if __name__ == '__main__':
    pass