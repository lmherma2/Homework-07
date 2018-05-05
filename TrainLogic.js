/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyA-lgjCRs3tTUTj4ncduMaoWRp2l_MBfpc",
    authDomain: "first-project-8c283.firebaseapp.com",
    databaseURL: "https://first-project-8c283.firebaseio.com",
    projectId: "first-project-8c283",
    storageBucket: "first-project-8c283.appspot.com",
    messagingSenderId: "470317392813"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  console.log("works1");

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination1 = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format('LT');
  var frequency1 = $("#frequency-input").val().trim();
  console.log(trainName);
  console.log(destination1);
  console.log(trainStart);
  console.log(frequency1);

  var currentTime = moment();
  var diffTime = moment().diff(moment(trainStart, "HH:mm").subtract(1, "years"), "minutes");
  var Remainder = diffTime % frequency1;
  var MinutesTillTrain = frequency1 - Remainder;
  var TrainTime = currentTime.add(MinutesTillTrain,'minutes').format("HH:mm");
  console.log(TrainTime);
  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: destination1,
    frequency: frequency1,
    start: trainStart,
    nextArrival: TrainTime,
    timeTill: MinutesTillTrain
  };
  console.log("works2");
  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.trainStart);
  console.log(newTrain.frequency);
  console.log("works3");
  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  event.preventDefault();
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;
  var nextArrival = childSnapshot.val().nextArrival;
  var minutes = childSnapshot.val().timeTill;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(trainStart);
  console.log(trainFrequency);

  // Prettify the employee start
  var trainStartPretty = moment.unix(trainStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  console.log(trainStart);

  // Calculate the total billed rate

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutes + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
