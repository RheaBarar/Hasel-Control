// server.ts is able to take in data from the Arduino via a USB
// and then display it into sensorData.txt

import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const app = express();
const PORT = process.env.PORT || 3000;

// Serial Port Configuration
// Run the command in terminal: ls /dev/cu.* to figure out Arduino's serial port name
const portName = '/dev/cu.usbmodem11101'; // Replace with your Arduino's serial port name
const baudRate = 115200; // Match this to your Arduino's baud rate

// Path for the log file in the same directory as server.ts
const logFilePath = path.join(__dirname, 'sensorData.txt');

// Set up the serial port connection
const port = new SerialPort({
  path: portName,
  baudRate: baudRate,
});

// Create a parser to read data line by line
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Buffer to hold data
let dataBuffer: string[] = [];

// Handle data received from the Arduino
parser.on('data', (data: string) => {
  const trimmedData = data.trim();
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp}: ${trimmedData}\n`;

  // Buffer the data to be written later
  dataBuffer.push(logEntry);

  // Check for the stop signal from Arduino
  if (trimmedData === "Timer ended. Stopping measurement.") {
    // Write the entire buffer to the log file
    fs.writeFileSync(logFilePath, dataBuffer.join(''));

    // Notify the user and exit
    console.log("Data collection completed. Logged to sensorData.txt. Exiting...");
    
    // Close the serial port and exit the process
    port.close(() => {
      console.log('Serial port closed.');
      process.exit(0);
    });
  }
});

// Express setup for potential future API (not mandatory for serial logging)
app.use(bodyParser.json());

// Start the Express server (optional)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
