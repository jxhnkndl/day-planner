// Document Ready
$(document).ready(function() {

  // UI elements: IDs assigned based on 24-hour time
  var $currentDay = $("#currentDay");
  var $container = $(".container");

  // Time block array for looping through all blocks
  var timeBlocks = [];

  // Init local storage array
  var entries = [];

  // Init Moment.js
  var now = moment();
  var currentHour = now.format("HH");

  // Run application
  init();

  // Init application upon launch
  function init() {
    $currentDay.text(now.format("h:mm a on dddd MMMM Do, YYYY"));

    renderBlocks();
    setBlockColor();
    loadEntries();
  }

  // Create and render time blocks on app launch
  function renderBlocks() {

    for (var i = 9; i < 18; i++) {
      var row = $("<div>");
      row.addClass("row time-block")
      
      if (i < 10) {
        row.attr("data-hour", "0" + i);
      } else {
        row.attr("data-hour", i);
      }

      var leftCol = $("<div>");
      leftCol.addClass("col-1 d-flex justify-content-end align-items-start hour");
      var leftParagraph = $("<p>");
      leftParagraph.addClass("mt-3 text-right");

      if (i < 12) {
        leftParagraph.text(i + " AM");
      } else if (i > 12) {
        leftParagraph.text((i - 12) + " PM");
      } else if (i === 12) {
        leftParagraph.text(i + " PM");
      }

      leftCol.append(leftParagraph);

      var centerCol = $("<div>");
      centerCol.addClass("col-10 d-flex p-0 description");
      var textarea = $("<textarea>");
      textarea.addClass("w-100 user-input");
      centerCol.append(textarea);

      var rightCol = $("<div>");
      rightCol.addClass("col-1 d-flex justify-content-center align-items-center saveBtn");
      var icon = $("<i>");
      icon.addClass("fas fa-save icon");
      rightCol.append(icon);

      row.append(leftCol, centerCol, rightCol);

      $container.append(row);

      timeBlocks.push(row);
    }
  }

  // Loop through time blocks on app launch and assign background color
  // Past Hours = Gray, Future Hours = Green, Current Hour = Red
  function setBlockColor() {
    timeBlocks.forEach(function (block, index) {
      var currentId = block.attr("data-hour");
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

  // Load saved entries into planner UI on app launch
  function loadEntries() {
    if (localStorage.getItem("entries") === null) {
      entries = [];
    } else {
      entries = JSON.parse(localStorage.getItem("entries"));
    }

    $.each(timeBlocks, function(index, block) {
      var currentId = block.attr("data-hour");
      var inputField = block.find(".user-input");

      for (var i = 0; i < entries.length; i++) {
        if (entries[i].id === currentId) {
          inputField.val(entries[i].input);
        }
      }
    });
  }

  // Format Entry
  function formatEntry() {
    var block = $(this).parent();
    var input = block.find(".user-input").val();

    entry = {
      id: block.attr("data-hour"),
      input: input
    }

    validateEntry(entry);
  }

  // Validate user's entry before saving to local storage
  function validateEntry(entry) {
    for (var i = 0; i < entries.length; i++) {

      // Duplicate entry - Don't save
      if (entries[i].id === entry.id && entries[i].input === entry.input) {
        console.log("Duplicate entry. Not saved.");
        return;
      }
      // Deleted entry - Remove from local storage array
      else if (entries[i].id === entry.id && entry.input === "") {
        entries.splice(i, 1);
        console.log("Entry removed.");
        setLocalStorage();
        return;
      }
      // Edited entry - Replace what's saved with this entry
      else if (entries[i].id === entry.id && entries[i].input !== entry.input) {
        entries[i] = entry;
        console.log("Edited entry. Saved.");
        setLocalStorage();
        return;
      }
    }

    // Empty entry - Don't save
    if (entry.input === "") {
      console.log("Empty entry. Not saved.");
      return;
    } 
    // Valid entry - Save to local storage
    else {
      console.log("Entry saved.")
      saveEntry(entry);
    }
  }
  
  // Save entry to local storage
  function saveEntry(entry) {
    if (localStorage.getItem("entries") === null) {
      entries = [];
    } else {
      entries = JSON.parse(localStorage.getItem("entries"));
    }

    entries.push(entry);

    setLocalStorage();
  }

  // Set local storage
  function setLocalStorage() {
    localStorage.setItem("entries", JSON.stringify(entries));
  }

  // Event Listener
  $(".row").on("click", ".saveBtn", formatEntry);
});
