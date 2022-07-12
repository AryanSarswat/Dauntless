from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from model.Model import ModelManager


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'application/json'

model = ModelManager()



@app.route('/', methods=['GET'])
def get_root():
    return jsonify({'message': 'Hello World!'})

@app.route('/getData/<dataAddress>', methods=['GET'])
def get_data_from_address(dataAddress):
    data = model.getDataFromIPFS(dataAddress)
    return jsonify({'data': data[0],
                    'type': data[1]})

@app.route('/getBlocks', methods=['GET'])
def get_data():
    blocks = model.getBlocks()
    blocks = [block.toDict() for block in blocks]
    return jsonify(blocks)

@app.route('/addBlock', methods=['POST'])
def add_data():
    data = request.get_json()
    print(data)
    header = data['header']
    content = data['content']
    type = data['type']
    parentHash = data['parentHash'] if data['parentHash'] != '' else None
    author = data['author']
    newBlock = model.addBlock(header, content, author, type, parentHash)
    newBlockJSON = newBlock.toDict()
    return jsonify(newBlockJSON)

@app.route('/traceBlock/<blockHash>', methods=['GET'])
def trace_block(blockHash: str):
    history = model.verifyVeracity(blockHash)
    history = [(block[0].toDict(), block[1]) for block in history]
    return jsonify(history)

@app.route('/verifyInformation/<information>', methods=['GET'])
def verifyInformation(information):
    isTrue = model.verifyInformation(information)
    return jsonify({'verified': isTrue})


app.run()