$(document).ready(function(){
	console.log("JS is working");



var config = {
    apiKey: "AIzaSyB3pRLg6RLHApVRY2lFeE_8ZCgKYL7wp94",
    authDomain: "employeedata-a2042.firebaseapp.com",
    databaseURL: "https://employeedata-a2042.firebaseio.com",
    projectId: "employeedata-a2042",
    storageBucket: "https://employeedata-a2042.firebaseio.com/",
    messagingSenderId: "91433535570"
  };

firebase.initializeApp(config);
var database = firebase.database();

database.ref("/trains").on("value", function(snapshot) {
$("#trains").empty();
snapshot.forEach(function(trainList) {
  makeTable(trainList.val());
});
});

$("#submit-button").on("click", function() {
  var newTrain = {
    trainName: $("#train-name").val().trim(),
    destination: $("#destination").val().trim(),
    firstTrainTime: $("#first-train-time").val().trim(),
    frequency: $("#frequency").val().trim(),
  }
  database.ref("trains").push(newTrain);

    $("#train-name").val("");
    $("#destination").val("");
    $("#fist-train-time").val("");
    $("#frequency").val("");

    return false;
});
  
  function makeTable(train){
    var tr = $('<tr>');
    tr.append($('<td class="text-center">').text(train.trainName));
    tr.append($('<td class="text-center">').text(train.destination));
    tr.append($('<td class="text-center">').text(train.frequency));
      
    var tFrequency = train.frequency;
    var firstTrainTime = train.firstTrainTime;
    var currentTime = moment();
    var subtractYear = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    var timeDiff = currentTime.diff(moment(subtractYear), "minutes");
    var remainder = timeDiff % tFrequency;
    var minutesUntilTrain = tFrequency - remainder;
    var nextTrain = currentTime.add(minutesUntilTrain, 'minutes').format('hh:mm');

    tr.append($("<td class='text-center'>").text(nextTrain));
    tr.append($("<td class='text-center'>").text(minutesUntilTrain));

    $("#trains").append(tr);
  }




// for (var i = 0; i < employeeInfo.length; i++)
// database.ref().push({
//   	Name: employeeInfo[i].Name,
//   	Role: employeeInfo[i].Role,
//   	Start: employeeInfo[i].Start,
//   	Rate: employeeInfo[i].Rate,
//   	WorkedM: employeeInfo[i].WorkedM,
//   	Total: employeeInfo[i].Total,
// });

// console.log(employeeInfo);


//     function submitInfo(){
//         $("#employee-submit").on("click", function() {
//             	newEmployee.push( {
//             	Name:$("#employee-name").val().trim(), 
// 	            Role:$("#employee-role").val().trim(), 
// 	            Start:$("#employee-start").val().trim(), 
// 	            WorkedM: "",
// 	            Rate:$("#employee-rate").val().trim(), 
// 	            Total: "",
//         	} );

// database.ref().push({
//   	Name: newEmployee.Name,
//   	Role: newEmployee.Role,
//   	Start: newEmployee.Start,
//   	Rate: newEmployee.Rate,
//   	WorkedM: newEmployee.WorkedM,
//   	Total: newEmployee.Total,
// });

//             console.log(employeeInfo);
//         })
//     };

// submitInfo();

// //for loop to add each array item to firebase
// //for loop to print each array item to table
// //update firebase variables on click event











});