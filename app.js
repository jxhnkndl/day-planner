// Document Ready
$(document).ready(function() {

  // UI elements
  var $currentDay = $("#currentDay");
  var $timeBlock09 = $("#09");
  var $timeBlock10 = $("#10");
  var $timeBlock11 = $("#11");
  var $timeBlock12 = $("#12");
  var $timeBlock01 = $("#13");
  var $timeBlock02 = $("#14");
  var $timeBlock03 = $("#15");
  var $timeBlock04 = $("#16");
  var $timeBlock05 = $("#17");


  // Time block array
  var timeBlocks = [
    $timeBlock09,
    $timeBlock10,
    $timeBlock11,
    $timeBlock12,
    $timeBlock01,
    $timeBlock02,
    $timeBlock03,
    $timeBlock04,
    $timeBlock05
  ];


  // Local storage array
  var storedEvents = [];


  // Global time variables
  var now = moment();
  var currentHour = now.format("HH");


  // Update date and time
  $currentDay.text(now.format("h:mm a on dddd MMMM Do, YYYY"));


  // Render past, present, future colors to calendar
  timeBlocks.forEach(function(block, index) {

    // Capture id attribute from current time block
    var currentId = block.attr("id");
    // Query for the editable description field in the current time block
    var description = block.find(".description");

    // Dynamically set block's background color based on current time
    if (currentId < currentHour) {
      description.addClass("past");

    } else if (currentId > currentHour) {
      description.addClass("future");

    } else if (currentId === currentHour) {
      description.addClass("present");
    }
  });


  // Save event
  $(".saveBtn").on("click", function(event) {

    // Init local vars
    var targetBlock, userInput, plannerEntry;

    // Capture which time block's button was clicked
    var target = $(event.target);

    // Access the parent row time block
    if (target.hasClass("icon")) {
      targetBlock = target.parent().parent();

    } else if (target.hasClass("saveBtn")) {
      targetBlock = target.parent();
    }

    // Capture user's input
    userInput = targetBlock.find(".user-input").val();

    // Format storage object
    plannerEntry = {
      id: targetBlock.attr("id"),
      description: userInput
    }

    // Save the event
    saveEvent(plannerEntry);
  });


  // Save event
  function saveEvent(plannerEntry) {

    // Check if user has already saved events in the planner
    if (localStorage.getItem("events") === null) {
      storedEvents = [];
    } else {
      storedEvents = JSON.parse(localStorage.getItem("events"));
    }

    // Push this event into the saved events array
    storedEvents.push(plannerEntry);

    // Set local storage
    localStorage.setItem("events", JSON.stringify(storedEvents));
  }


  // Load saved events
  function loadEvents() {

    // Check if user has already saved events in the planner
    if (localStorage.getItem("events") === null) {
      storedEvents = [];
    } else {
      storedEvents = JSON.parse(localStorage.getItem("events"));
    }

    // Loop through the planner's time blocks
    timeBlocks.forEach(function(block, index) {

      // Capture block's corresponding id attribute and textarea element
      var currentId = block.attr("id");
      var inputField = block.find(".user-input");

      // Loop through stored events
      for (var i = 0; i < storedEvents.length; i++) {

        // Load the event if the id of the current block and the stored event match
        if (storedEvents[i].id === currentId) {
          inputField.val(storedEvents[i].description);
        }
      }
    });
  }

  loadEvents();

});
