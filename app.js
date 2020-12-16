// Document Ready
$(document).ready(function() {

  // UI Vars
  var $currentDay = $("#currentDay");

  // Global Time Variable
  var now = moment();

  // Update Header Date and Time
  $currentDay.text(now.format("h:mm a on dddd MMMM Do, YYYY"));



});