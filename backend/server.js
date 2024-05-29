const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors')
const app = express();
app.use(cors())
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fileuploads', { useNewUrlParser: true, useUnifiedTopology: true });

const FileSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
});

const File = mongoose.model('File', FileSchema);

// Init Middleware
app.use(fileUpload());

// Upload endpoint
app.post('/upload', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  const uploadPath = path.join(__dirname, 'uploads', file.name);

  file.mv(uploadPath, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    const newFile = new File({
      fileName: file.name,
      filePath: `/uploads/${file.name}`,
    });

    await newFile.save();

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

// Make uploads directory publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
