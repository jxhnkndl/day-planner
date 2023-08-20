# Day Planner :calendar:

![languages](https://img.shields.io/github/languages/count/jxhnkndl/day-planner?style=plastic)
![html](https://img.shields.io/github/languages/top/jxhnkndl/day-planner?style=plastic)
![commit](https://img.shields.io/github/last-commit/jxhnkndl/day-planner?style=plastic)

## Table of Contents
- [Deployed Application](#deployed-application)
- [Project Goals](#project-goals)
- [Features](#features)
- [Design Notes](#design-notes)
- [Technologies](#technologies)
- [Live Demo](#live-demo)
- [License](#license)

## Deployed Application :rocket:
The deployed application can be viewed at the link below.

[Day Planner - Live Demo](https://jxhnkndl.github.io/day-planner)

## Project Goals :dart:
The goal of this project was to create a day planner application covering business hours between 9 AM and 5 PM. Upon startup, the application displays the current time and date to the user and paints the background of each hour block in the user interface based on the current time. Each block can be used to input and save events to local storage that persist on page refresh. The application validates all attempts to save an entry to local storage to prevent empty and duplicate entries from being saved. The application can handle updated and deleted entries.

## Features :star2:
- **Current Date and Time:** The application displays the current date and time in the header upon startup or refresh.
- **Dynamically Powered Hour Blocks:** Using Moment.js, jQuery, and JavaScript, the application dynamically renders time blocks for each hour between 9 AM and 5 PM. Blocks are colored based on whether they are in the past, present, or future.
- **Events Persist in the Browser:** User-entered events are saved to local storage, allowing the state to be preserved across refreshes and reopens.
- **Detailed Input Validation:** The application parses and validates input before saving it to local storage, handling new, duplicate, empty, updated, and deleted entries.

## Design Notes :pencil2:
The application focuses on complex input validation logic. It prevents saving empty or duplicate entries and handles updates and deletions. All hour blocks are dynamically generated using jQuery and JavaScript, making the application easily scalable for different time ranges.

## Technologies :computer:
- HTML
- CSS
- Bootstrap 4
- JavaScript
- jQuery
- Moment.js

## Live Demo :video_camera:
![Application Preview](assets/day-planner-demo.gif)

## License :page_facing_up:
MIT @ [J.K. Royston](https://github.com/jxhnkndl)
