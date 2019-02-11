// Initialize Firebase
var config = {
    apiKey: "AIzaSyAFjhfMJLDwJ8fFNlAss43Gr_4KUvVeRVg",
    authDomain: "train-game-ddf4d.firebaseapp.com",
    databaseURL: "https://train-game-ddf4d.firebaseio.com",
    projectId: "train-game-ddf4d",
    storageBucket: "train-game-ddf4d.appspot.com",
    messagingSenderId: "249556207167"
};
firebase.initializeApp(config);
var database = firebase.database();

// 2. Button for adding train
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var newTrainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#firstTrainTime-input").val().trim(), "HH/mm").format("X");
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object
    var newTrain = {
        name: newTrainName,
        role: destination,
        start: firstTrainTime,
        rate: frequency
    };

    // Uploads user input data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);

    // Clears all of the text-boxes
    $("#newTrain-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrainTime-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding new train information to the database and a new row
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var newTrainName = childSnapshot.val().name;
    var destination = childSnapshot.val().role;
    var firstTrainTime = childSnapshot.val().start;
    var frequency = childSnapshot.val().rate;

    // New Train Info
    console.log(newTrainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);


    var newTrain = moment.unix(newTrain).format("HH/mm");

    var tFrequency = 0;

    var firstTime = "00:00";
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    );
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});