/*
Requires the following libraries (installed):
- STM32duino LPS25HB <-- pressure sensor
- d6t-2jcieev01-arduino (downloaded library, https://github.com/omron-devhub/d6t-2jcieev01-arduino/tree/master) <-- flow sensor
- ADT74x0 (downloaded library, https://github.com/PlantFactory/ADT74x0/tree/master <-- temperature sensor
*/

// add PID control to this file, and edit PID control header file

#include <LPS25HBSensor.h> // Pressure sensor
#include <Wire.h>
#include "ADT74x0.h" // header file for temperature sensor
#include "PIDControl.h" // header file for PID Control

#include <math.h>

#include <Arduino.h>
#include <Wire.h>

// PRESSURE SENSOR
#if defined(ARDUINO_SAM_DUE)
#define DEV_I2C Wire1   //Define which I2C bus is used. Wire1 for the Arduino Due
#define SerialPort Serial
#else
#define DEV_I2C Wire    //Or Wire
#define SerialPort Serial
#endif

LPS25HBSensor PressTemp(&DEV_I2C); // Creates a pressure sensor

// FLOW SENSOR
#define D6T_ADDR 0x0A  // for I2C 7bit address
#define D6T_CMD 0x4C  // for D6T-44L-06/06H, D6T-8L-09/09H, for D6T-1A-01/02
#define N_ROW 4
#define N_PIXEL (4 * 4)
#define N_READ ((N_PIXEL + 1) * 2 + 1)

uint8_t rbuf[N_READ];
double ptat;
double pix_data[N_PIXEL];

uint8_t calc_crc(uint8_t data) {
    int index;
    uint8_t temp;
    for (index = 0; index < 8; index++) {
        temp = data;
        data <<= 1;
        if (temp & 0x80) {data ^= 0x07;}
    }
    return data;
}

// Packet Error Check - calculate the data sequence, from an I2C Read client address (8bit) to thermal data end
bool D6T_checkPEC(uint8_t buf[], int n) {
    int i;
    uint8_t crc = calc_crc((D6T_ADDR << 1) | 1);  // I2C Read address (8bit)
    for (i = 0; i < n; i++) {
        crc = calc_crc(buf[i] ^ crc);
    }
    bool ret = crc != buf[n];
    if (ret) {
        Serial.print("PEC check failed:");
        Serial.print(crc, HEX);
        Serial.print("(cal) vs ");
        Serial.print(buf[n], HEX);
        Serial.println("(get)");
    }
    return ret;
}

// Converts a 16bit data from the byte stream
int16_t conv8us_s16_le(uint8_t* buf, int n) {
    uint16_t ret;
    ret = (uint16_t)buf[n];
    ret += ((uint16_t)buf[n + 1]) << 8;
    return (int16_t)ret;   // and convert negative.
}

// TEMPERATURE SENSOR
void ADT74x0::begin(byte addr){
  this->addr = addr;
  Wire.beginTransmission(this->addr);
  Wire.write(0x03);
  Wire.write(0x80);
  Wire.endTransmission();
}

float ADT74x0::readTemperature(unsigned int timeout_ms){
  uint16_t start_ms = millis();
  uint16_t d;

  Wire.requestFrom(this->addr, 2U);

  while(Wire.available() < 2){
    if(millis() - start_ms > timeout_ms){
      return NAN;
    }
  }

  d = Wire.read()<<8;
  d |= Wire.read();

  if(((d>>15)&1) == 0){
    return d/128.0;
  }else{
    return (d-65536)/128.0;
  }
}


void setup() {
  Serial.begin(115200); // serial baud rate
  Wire.begin();
  delay(620);

  DEV_I2C.begin(); // Initialise I2C bus for pressure sensor

  // Initialise pressure sensor
  PressTemp.begin();
  PressTemp.Enable();
}

void loop() {
  // FLOW SENSOR
  int i = 0;
	int16_t itemp = 0;

  // Read data via I2C (I2C buffer of "Arduino MKR" is 256 ie. it is enough)
  memset(rbuf, 0, N_READ);
  Wire.beginTransmission(D6T_ADDR); // I2C slave address
  Wire.write(D6T_CMD); // D6T register
  Wire.endTransmission();
	delay(1);
  Wire.requestFrom(D6T_ADDR, N_READ);
  while (Wire.available()) {
    rbuf[i++] = Wire.read();
  }
  D6T_checkPEC(rbuf, N_READ - 1);
  //Convert to temperature data (degC)
  ptat = (double)conv8us_s16_le(rbuf, 0) / 10.0;
	for (i = 0; i < N_PIXEL; i++) {
		itemp = conv8us_s16_le(rbuf, 2 + 2*i);
		pix_data[i] = (double)itemp / 10.0;
	}
    
  // Output results
	Serial.print("PTAT:");
  Serial.print(ptat, 1);
  Serial.print(" [degC], Temperature: ");
	for (i = 0; i < N_PIXEL; i++) {
	  Serial.print(pix_data[i], 1);
		Serial.print(", ");
	}	
  Serial.println(" [degC]");
	

  // PRESSURE SENSOR
  // Reads pressure and temperature
  float pressure, temperature;
  PressTemp.GetPressure(&pressure);
  PressTemp.GetTemperature(&temperature);

  // Outputs data (2 dp) to serial monitor
  SerialPort.print("| Pres[hPa]: ");
  SerialPort.print(pressure, 2);
  SerialPort.print(" | Temp[C]: ");
  SerialPort.print(temperature, 2);
  SerialPort.println(" |");

  delay(300);
}

