// This file: 
// Creates a basic Express server using TypeScript
// Sets up a route to handle incoming sensor data

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/sensordata', (req: Request, res: Response) => {
  const { data } = req.body;
  const timestamp = new Date().toISOString();
  const log = `${timestamp}: ${data}\n`;

  const logFilePath = path.join(__dirname, 'sensorData.txt');
  
  fs.appendFile(logFilePath, log, (err) => {
    if (err) {
      console.error('Error writing to file', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).send('Data received');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});