var firebaseConfig = {
    apiKey: "AIzaSyDZIzqPUY1k6ddBtl6kXkZGFT7J_ekS7JQ",
    authDomain: "train-schedulier.firebaseapp.com",
    databaseURL: "https://train-schedulier.firebaseio.com",
    projectId: "train-schedulier",
    storageBucket: "train-schedulier.appspot.com",
    messagingSenderId: "21194834990",
    appId: "1:21194834990:web:a8345528c01ed0eac84bbf",
    measurementId: "G-PC239VHNLB"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.database();

var name = "";
var dest = "";
var first = "";
var freq = "";
var next = "";

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
    

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.dest);
    console.log(sv.first);
    console.log(sv.freq);

    // Change the HTML to reflect
    var newRow = $("<tr>");

    var nameTD = $("<td>").text(sv.name);
    var destTD = $("<td>").text(sv.dest);
    var firstTD = $("<td>").text(sv.first);
    var freqTD = $("<td>").text(sv.freq);
    var nextTD = $("<td>").text(sv.next);

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