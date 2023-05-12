/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import multer from 'multer';
import crypto from 'crypto';
import cors from 'cors';
import { mkdirSync } from 'fs';

const app = express();

app.use(cors());

const UPLOADS_DIR = path.resolve(__dirname, 'assets/uploads');

//use multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    mkdirSync(UPLOADS_DIR, { recursive: true });
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, crypto.randomUUID() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const apiRouter = express.Router();
apiRouter.post('/upload', upload.single('file'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    return next(error);
  }
  res.send({ path: `/assets/uploads/${file.filename}` });
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api', apiRouter);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
