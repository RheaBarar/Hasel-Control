import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const app = express();
const PORT = process.env.PORT || 3000;

// Serial Port Configuration
const portName = '/dev/cu.usbmodem111301'; // Replace with your Arduino's serial port name
const baudRate = 115200; // Match this to your Arduino's baud rate

// Path for the log file in the same directory as server.ts
const logFilePath = path.join(__dirname, 'sensorData.txt');

// Buffer to hold data before writing it to the file
let dataBuffer: string[] = [];

// Function to append data to the log file
const writeLogFile = () => {
  const dataToWrite = dataBuffer.join('\n') + '\n' + 'Timer ended. Stopping measurement.\n'; // Append final message
  fs.writeFileSync(logFilePath, dataToWrite);
  console.log('Data successfully written to sensorData.txt with the timer message.');
};

// Set up the serial port connection
let port: SerialPort | null = null;

try {
  port = new SerialPort({
    path: portName,
    baudRate: baudRate,
  });
  console.log(`Connected to ${portName}`);
} catch (err) {
  console.error(`Failed to connect to the serial port: ${err}`);
}

// Handle data from Arduino
if (port) {
  const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

  parser.on('data', (data: string) => {
    const trimmedData = data.trim();

    // If we receive the stop signal from the Arduino
    if (trimmedData === "Timer ended. Stopping measurement.") {
      console.log("Received stop signal from Arduino. Finishing up...");

      // Write buffered data to file with the stop message
      writeLogFile();

      // Close the serial port and stop the server
      port.close(() => {
        console.log('Serial port closed.');
        process.exit(0); // Exit the process
      });
    } else if (trimmedData.startsWith("Distance:")) {
      // Buffer valid distance data
      const timestamp = new Date().toISOString();
      const logEntry = `${timestamp}: ${trimmedData}`;
      dataBuffer.push(logEntry);
    }
  });

  port.on('error', (err) => {
    console.error('Serial port error:', err);
  });
}

// Express setup
app.use(bodyParser.json());

// Start the express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
