/***********************************************************************************
 *  Name           : Chronosphere model 99                                         *
 *  Created by     : Ilias Kalantzis                                               *
 *  Created on     : 26/10/2021                                                    *
 *  Description    : FitBit Clock Face                                             *
 *  License        :(CC-BY-SA 4.0) https://creativecommons.org/licenses/by-sa/4.0/ *
 ***********************************************************************************/ 

import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { charger, battery } from "power";
import { HeartRateSensor } from "heart-rate";
import { today as userActivity } from "user-activity";

let hourhand       = document.getElementById("hourhand");
let minutehand     = document.getElementById("minutehand");
let sechand        = document.getElementById("sechand");
let outercenterdot = document.getElementById("outercenterdot");
let innercenterdot = document.getElementById("innercenterdot");

// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> elements
const batteryLevel = document.getElementById("batteryLevel");
const digitalClock = document.getElementById("digitalClock");
const heartRate    = document.getElementById("heart-rate");
const stepsData    = document.getElementById("stepsData");
const dateData     = document.getElementById("date");

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

// Create a new instance of the HeartRateSensor object
let hrm = new HeartRateSensor();
hrm.onreading = function () {
  // Peek the current sensor values
  heartRate.text = hrm.heartRate;
};


battery.onchange = (charger, evt) => {
  checkAndUpdateBatteryLevel();
}

// Updates the battery level
 function checkAndUpdateBatteryLevel() {
  batteryLevel.text = battery.chargeLevel + '%';
}

// Get current datetime into the date placeholder. e.g. Thu, 7 Jan
function getDate(currentTime) {
  let dayIndex = currentTime.getDay();
  let dayOfMonth = currentTime.getDate();
  let monthIndex = currentTime.getMonth();
  // set the actual date to the placeholder
  dateData.text = `${util.getDayName(dayIndex)}, ${dayOfMonth} ${util.getMontName(monthIndex)}`;
}

function updateHeartRateSensor() {
  // Begin monitoring the sensor
  hrm.start();
}

// Rotate the hands every tick
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let mins = today.getMinutes();
  let secs = today.getSeconds();
  
hourhand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
minutehand.groupTransform.rotate.angle = minutesToAngle(mins);
sechand.groupTransform.rotate.angle = secondsToAngle(secs);

// Update the <text> element every tick with the current time
    hours = util.zeroPad(hours);
  
  digitalClock.text = `${hours}:${util.zeroPad(mins)}`;

   checkAndUpdateBatteryLevel();
   updateHeartRateSensor();
   stepsData.text = userActivity.adjusted.steps;
   getDate(today);
};