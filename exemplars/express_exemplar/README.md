# Express Server Exemplar

## Overview
This exemplar shows how to set up a simple server using express that contains endpoints that respond to one of each of the HTTP request methods (GET/POST/PUT/DELETE). This exemplar is meant to show the basic setup of a express server and also how to recieve and parse request paramaters sent through the body of the HTML request in JSON format. 

### GET


### POST
The sample HTML document shows an example of how to create a simple grid with rows and columns. The grid layout section of the document shows how to create a row in a HTML document containing multiple columns. Columns can be created within a div's class list by using the key `col`. A number can also be added to specify the column's span, such as the middle column in the example (`col-3`). The column spans cannot exceed a total value of 12. If no number is provided when creating the column, the unspecified column's span will automatically be made to fill in the remaining column space evenly. The cards section shows another example of creating multiple columns for each row of cards.

### PUT
A card is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, background colors, and display options. The example shows cards that contain header titles, pictures, text, and hyperlinks. You can use the Bootstrap grid system and its .row-cols classes to control how many grid columns you show per row. In the example, an outer div is created as a container to hold multiple rows of cards. The HTML document creates one row of 3 cards, and checking off the checkbox above the cards will generate another row of 3 cards using typescript. To create a row of 3 cards, a div element must be created with a class list containing `row`, `row-cols-1` (each card takes up one column), `row-cols-md-3` (3 cards of equal width in row). 

### DELETE
HTML buttons are clickable buttons that can be used for things like submiting forms, for example. Buttons are a type of HTML Input Element. Examples of clickable buttons are shown in the sample HTML example, and clicking these buttons activates code from the typescript program to be run.

## Why is this Useful?
All of these examples show how to set up a simple HTML file containing elements that would be very useful for our application, such as cards to display recipes and text input boxes to input new recipes, for example. The html_typescript exemplar code is shows very useful examples for interacting with these HTML elements that we are likely to use for our UI. We will need to know how to manipulate and interact with HTML using typescript for this project, and so these examples show the proper way to interact with a variety of different elements. 