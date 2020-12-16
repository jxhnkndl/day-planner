// Document Ready
$(document).ready(function() {

  // UI Vars
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

  // Global Time Variables
  var now = moment();
  var currentHour = now.format("HH");

  // Time Block Array
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

  // Update Header Date and Time
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

});