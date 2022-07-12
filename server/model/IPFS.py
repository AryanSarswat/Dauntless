import hashlib
import json
import os

class IPFS:
    def __init__(self) -> None:
        self.storage = dict()
    
    def saveData(self, filename):
        filename = os.path.join(filename, "IPFS.json")
        with open(filename, 'w') as file:
            toWrite = json.dumps(self.storage, default= lambda x: x.hex(),indent = 4)
            file.write(toWrite)
    
    def loadData(self, filename):
        filename = os.path.join(filename, "IPFS.json")
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
            
    def getText(self, hash):
        try:
            return self.storage[hash]
        except KeyError:
            return "No text matching the given hash found"
    
    def store(self, text, type):
        temp_hash = hashlib.sha256()
        # Hash of block is computed using the following properties
        temp_hash.update(text.encode('utf-8'))
        hash = temp_hash.digest().hex()
        self.storage[hash] = (text, type)
        return hash
    
    def isInIPFS(self, text):
        for value, type in self.storage.values():
            if value == text:
                return True
        return False
    
    def getDataAddress(self, text):
        for key, value in self.storage.items():
            if value[0] == text:
                return key
        return None


if __name__ == '__main__':
    pass