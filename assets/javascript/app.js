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
var next;

$("#add-train").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name").val().trim();
    dest = $("#dest").val().trim();
    first = $("#first").val().trim();
    freq = $("#freq").val().trim();

    // Code for handling the push
    database.ref().push({
        name: name,
        dest: dest,
        first: first,
        freq: freq,
    });
    console.log(name, dest, first);
});

database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    var now = moment().format("HH:mm");
    var firstPretty = moment.unix(first).format("HH:mm");

    var diff = moment().diff(moment(firstPretty), "minutes");

    var remain = diff % freq;

    var mins = freq - remain;

    var next = moment().add(mins, "minutes").format("HH:mm");


    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.dest);
    console.log(sv.first);
    console.log(sv.freq);
    console.log(sv.next);

    // Change the HTML to reflect
    var newRow = $("<tr>");

    var nameTD = $("<td>").text(sv.name);
    var destTD = $("<td>").text(sv.dest);
    var firstTD = $("<td>").text(sv.first);
    var freqTD = $("<td>").text(sv.freq);
    var nextTD = $("<td>").text(next);

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