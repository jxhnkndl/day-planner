// Document Ready
$(document).ready(function() {

  // UI elements: IDs assigned based on 24-hour time
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

  // Time block array for looping through all blocks
  var timeBlocks = [
    $timeBlock09,
    $timeBlock10,
    $timeBlock11,
    $timeBlock12,
    $timeBlock01,
    $timeBlock02,
    $timeBlock03,
    $timeBlock04,
    $timeBlock05,
  ];

  // Init Moment.js
  var now = moment();
  var currentHour = now.format("HH");

  // Init local storage array
  var plannerEntries = [];

  // Run application
  init();

  // Init application upon launch
  function init() {
    $currentDay.text(now.format("h:mm a on dddd MMMM Do, YYYY"));

    setBlockColor();
    loadEntries();
  }

  // Loop through time blocks and assign background color based on current time
  function setBlockColor() {
    timeBlocks.forEach(function (block, index) {
      var currentId = block.attr("id");
      var description = block.find(".description");

      if (currentId < currentHour) {
        description.addClass("past");
      } else if (currentId > currentHour) {
        description.addClass("future");
      } else if (currentId === currentHour) {
        description.addClass("present");
      }
    });
  }

  // Save entry to local storage
  function saveEntry(plannerEntry) {
    if (localStorage.getItem("entries") === null) {
      plannerEntries = [];
    } else {
      plannerEntries = JSON.parse(localStorage.getItem("entries"));
    }

    plannerEntries.push(plannerEntry);

    localStorage.setItem("entries", JSON.stringify(plannerEntries));
  }

  // Load saved entries back into planner UI
  function loadEntries() {
    if (localStorage.getItem("entries") === null) {
      plannerEntries = [];
    } else {
      plannerEntries = JSON.parse(localStorage.getItem("entries"));
    }

    // Loop through the planner's time blocks
    timeBlocks.forEach(function (block) {
      var currentId = block.attr("id");
      var inputField = block.find(".user-input");

      for (var i = 0; i < plannerEntries.length; i++) {
        if (plannerEntries[i].id === currentId) {
          inputField.val(plannerEntries[i].description);
        }
      }
    });
  }

  // Event Listener: Save Buttons
  $(".saveBtn").on("click", function (event) {
    var target = $(event.target);
    var targetBlock;
    var userInput;
    var plannerEntry;

    // Access the button's parent time block
    if (target.hasClass("icon")) {
      targetBlock = target.parent().parent();
    } else if (target.hasClass("saveBtn")) {
      targetBlock = target.parent();
    }

    userInput = targetBlock.find(".user-input").val();

    plannerEntry = {
      id: targetBlock.attr("id"),
      description: userInput,
    };

    saveEntry(plannerEntry);
  });
});