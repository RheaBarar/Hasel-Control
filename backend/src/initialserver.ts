import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const app = express();
const PORT = process.env.PORT || 3000;

// Set up the serial port connection
// HAVE TO BE CHANGED TO SUIT YOUR OWN ARDUINO :)
const portName = '/dev/cu.usbmodem111301'; // Replace with your Arduino's serial port name
const baudRate = 115200; // Match this to your Arduino's baud rate

const port = new SerialPort({
  path: portName,
  baudRate: baudRate,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Create directory if it doesn't exist
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// When data is received from the Arduino
parser.on('data', (data: string) => {
  const timestamp = new Date().toISOString();
  const log = `${timestamp}: ${data.trim()}\n`;

  const logFilePath = path.join(logDir, 'sensorData.txt');

  fs.appendFile(logFilePath, log, (err) => {
    if (err) {
      console.error('Error writing to file', err);
    } else {
      console.log(`Data logged: ${log}`);
    }
  });
});

// Express setup
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
