#include <Wire.h>  // Include the Wire library for I2C communication

#define ADT7420Address 0x48  // I2C address of the ADT7420 sensor
#define ADT7420TempReg 0x00  // Temperature register address
#define ADT7420ConfigReg 0x03 // Configuration register address

long tempReading = 0;  // Variable to store the raw temperature reading
float temp;  // Variable to store the calculated temperature in Celsius

void setup() {
  Serial.begin(9600);  // Start serial communication at 9600 baud rate
  Wire.begin();  // Initialize I2C communication
  Serial.println("Starting....");  // Print a starting message to the Serial Monitor
}

void loop() {
  readADT7420();  // Call the function to read temperature from the sensor
  delay(1000);  // Wait for 1 second before taking the next reading
}

void readADT7420() {
  // Set the sensor to 16-bit mode and one-shot mode
  Wire.beginTransmission(ADT7420Address);  // Start communication with the sensor
  Wire.write(ADT7420ConfigReg);  // Point to the configuration register
  Wire.write(B10100000);  // Set 16-bit resolution and one-shot mode
  Wire.endTransmission();  // End communication
  delay(250);  // Wait for the sensor to complete the conversion

  byte MSB;  // Variable to store the most significant byte of the temperature reading
  byte LSB;  // Variable to store the least significant byte of the temperature reading

  // Send request for temperature register
  Wire.beginTransmission(ADT7420Address);  // Start communication with the sensor
  Wire.write(ADT7420TempReg);  // Point to the temperature register
  Wire.endTransmission();  // End communication

  // Request 2 bytes from the temperature register
  Wire.requestFrom(ADT7420Address, 2);  // Request 2 bytes from the sensor
  MSB = Wire.read();  // Read the most significant byte
  LSB = Wire.read();  // Read the least significant byte

  // Combine the two bytes into a 16-bit signed value
  tempReading = ((MSB << 8) | LSB);  // Combine MSB and LSB

  // Convert the raw reading to a temperature value in Celsius
  if (tempReading > 32768) {  // Check if the reading is negative
    tempReading = tempReading - 65535;  // Convert to a negative value
    temp = (tempReading / 128.0) * -1;  // Convert to Celsius and negate the value
  } else {
    temp = (tempReading / 128.0);  // Convert to Celsius
  }

  // Print the temperature to the Serial Monitor
  Serial.print("Temperature: ");
  Serial.println(temp, 2);  // Print the temperature with 2 decimal places
}
