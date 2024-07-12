// Necessary Libraries 

// allows for communcation with the I2C
#include <Wire.h> 

// interface for sensors 
#include <Adafruit_Sensor.h> 

// specific for the pressure sensor (LPS2X series)
#include <Adafruit_LPS2X.h> 

// Create an LPS25HB object

// Object is created to interact with the sensor 
Adafruit_LPS25 lps25hb;

// put your setup code here, to run once:
void setup() {

  // initialise communication at a rate of 9600 (baud rate)
  Serial.begin(9600);

  // wait for serial port to connect 
  // Required for native USB ??
  while (!Serial) {
    delay(10); 
  }

  // Initialise the sensor using the I2C communication
  if (!lps25hb.begin_I2C()) {   // I2C mode

    // error checking to make sure the sensor is found 
    Serial.println("Could not find the  LPS25HB chip");
    while (1) { delay(10); }
  }

  Serial.println("LPS25HB Found!");

  // Set the data rate to 1 Hz 
  // May be optional ??
  lps25hb.setDataRate(LPS25_RATE_1_HZ);
}

// put your main code here, to run repeatedly:
void loop() {
  // Read the pressure
  float pressure_hPa = lps25hb.readPressure();

  // Print the pressure value to the Serial Monitor
  Serial.print("Pressure: ");
  Serial.print(pressure_hPa);
  Serial.println(" hPa");

  // Wait for 1 second before re-reading
  delay(1000);

}
