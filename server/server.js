const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { imageHash } = require('image-hash')
const app = express();

app.use(cors());
app.use(express.static('public'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({storage}).single('file')

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
})

