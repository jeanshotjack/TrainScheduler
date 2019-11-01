var firebaseConfig = {
    apiKey: "AIzaSyCgb7TVh4WZgMtLy8rYygN4jcj9ARrb714",
    authDomain: "test-app-26410.firebaseapp.com",
    databaseURL: "https://test-app-26410.firebaseio.com",
    projectId: "test-app-26410",
    storageBucket: "test-app-26410.appspot.com",
    messagingSenderId: "362716079969",
    appId: "1:362716079969:web:6ec054bc430e9e40e3c720"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var name = "";
var dest = "";
var first = "";
var freq = "";

$("#add-train").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name").val();
    dest = $("#dest").val();
    first = $("#first").val();
    freq = $("#freq").val();

    // Code for handling the push
    database.ref().push({
        name: name,
        dest: dest,
        first: first,
        freq: freq,
    });
    console.log(name, dest, first);

    $("#name").val("");
    $("#dest").val("");
    $("#first").val("");
    $("#freq").val("");
});

database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience

    var svName = snapshot.val().name;
    var svDest = snapshot.val().dest;
    var svFirst = snapshot.val().first;
    var svFreq = snapshot.val().freq;

    // var firstPretty = moment.unix(svFirst).format("HH:mm");

    // var diff = moment().diff(moment(firstPretty), "minutes");

    // var freqPretty = moment.unix(svFreq).format("minutes");

    // var remain = diff % freqPretty;

    // var mins = freq - remain;

    // var next = moment().add(mins, "minutes").format("HH:mm");

    var firstPretty = moment(svFirst, "HH:mm").subtract(1, "years");
    console.log(firstPretty);

    var currentTime = moment().format("HH:mm");
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var diffT = moment().diff(moment(firstPretty), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffT);

    var remain = diffT % svFreq;
    console.log(remain);

    var minsTill = svFreq - remain;
    console.log("MINUTES TILL TRAIN: " + minsTill);

    var next = moment().add(minsTill, "minutes");
    console.log("ARRIVAL TIME: " + moment(next).format("HH:mm"));


    // Console.loging the last user's data
    console.log(svName);
    console.log(svDest);
    console.log(firstPretty);
    console.log(svFreq);
    console.log(next);

    // Change the HTML to reflect
    var newRow = $("<tr>");

    var nameTD = $("<td>").text(svName);
    var destTD = $("<td>").text(svDest);
    var firstTD = $("<td>").text(moment(firstPretty).format("HH:mm"));
    var freqTD = $("<td>").text(svFreq);
    var nextTD = $("<td>").text(moment(next).format("HH:mm"));

    newRow.append(nameTD);
    newRow.append(destTD);
    newRow.append(firstTD);
    newRow.append(freqTD);
    newRow.append(nextTD);
    $("#newNew").append(newRow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});