#pragma once

#include <math.h>

namespace PIDController {

class PIDController {
public:
    PIDController(float kp, float ki, float kd) : kp(kp), ki(ki), kd(kd) {
        integral = 0;
        derivative = 0;
    }

    // Compute the output signal required from the current value.
    float compute(float input) {
        curr_time = micros(); // micros returns the current value of the microcontroller's timer in ms
        dt = static_cast<float>(curr_time - prev_time) / 1e6; // Calculates the elapsed time since the last computation in seconds 
        prev_time = curr_time;

        error = (input - zero_ref) - setpoint; // System error (input minus initial encoder inaccuracy)

        integral = integral + error * dt; // Calculates integral
        derivative = (error-prev_error)/dt; // Calculates derivative
        
        output = kp * error + ki * integral + kd * derivative; // PID formula

        prev_error = error;

        return output;
    }

    void tune(float p, float i, float d) {
        kp = p;
        ki = i;
        kd = d;
    }

    // Function used to return the last calculated error. 
    // The error is the difference between the desired position and current position. 
    float getError() {
      return error;
    }

    // This must be called before trying to achieve a setpoint.
    // The first argument becomes the new zero reference point.
    // Target is the setpoint value.
    void zeroAndSetTarget(float zero, float target) {
        prev_time = micros();
        zero_ref = zero;
        setpoint = target;
    }

public:
    uint32_t prev_time, curr_time = micros();
    float dt;

private:
    float kp, ki, kd;
    float error, derivative, integral, output;
    float prev_error = 0;
    float setpoint = 0;
    float zero_ref = 0;  
};

}
