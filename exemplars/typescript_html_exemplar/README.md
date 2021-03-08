# HTML Typescript Exemplar

## Overview
This exemplar shows many useful examples of working with/manipulating HTML using typescript. The `sampleHTML.html` file is an example HTML file formatted with bootstrap that shows how to set up many useful HTML elements such as grids, cards, buttons, text inputs, checkboxes, and radio buttons. The `html_typescript.ts` file is an example typescript program that shows many examples of how to add new elements to a HTML document, how to delete elements from a HTML document, how to interact with a variety of different HTML Input Elements, and how to grab information from a HTML document. This program shows how to grab specific HTML Elements using their ids or names from a HTML document, and then how to extract information from these elements or manipulate them in some way. 

### Alerts
The first section in the HTML document shows a simple alert formatted with bootstrap. To create an alert, add `alert alert-___` to the div class, where the underscored section could be a variety of different alert types defined by bootstrap. In this example, the alert is a warning type.

### Grid Layout
The sample HTML document shows an example of how to create a simple grid with rows and columns. The grid layout section of the document shows how to create a row in a HTML document containing multiple columns. Columns can be created within a div's class list by using the key `col`. A number can also be added to specify the column's span, such as the middle column in the example (`col-3`). The column spans cannot exceed a total value of 12. If no number is provided when creating the column, the unspecified column's span will automatically be made to fill in the remaining column space evenly. The cards section shows another example of creating multiple columns for each row of cards.

### Cards
A card is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, background colors, and display options. The example shows cards that contain header titles, pictures, text, and hyperlinks. You can use the Bootstrap grid system and its .row-cols classes to control how many grid columns you show per row. In the example, an outer div is created as a container to hold multiple rows of cards. The HTML document creates one row of 3 cards, and checking off the checkbox above the cards will generate another row of 3 cards using typescript. To create a row of 3 cards, a div element must be created with a class list containing `row`, `row-cols-1` (each card takes up one column), `row-cols-md-3` (3 cards of equal width in row). 

### Buttons
HTML buttons are clickable buttons that can be used for things like submiting forms, for example. Buttons are a type of HTML Input Element. Examples of clickable buttons are shown in the sample HTML example, and clicking these buttons activates code from the typescript program to be run.

### Text Inputs
Text inputs are editable text boxes that users can use to type in information they want to send to the backend servers, for example. Examples of these text HTML Input Elements are shown in the sample HTML file. In the example, you can type your first and last name into each text input box so that when you hit the submit button, the code from the typescript program will be able to extract and display the name typed in.

### Checkboxes and Radio Buttons
Checkboxes and Radio buttons are more examples of HTML Input Elements. Checkboxes or radio buttons that should be grouped together can be created with the same name, which is shown in this example. Checkboxes allow you to be able to check multiple checkboxes in a group, while radio buttons only allow you to select one radio button in a group at a time. Both of these input elements have a `checked` attribute that is either set to true or false depending on if the element is checked off or on. The typescript exemplar code shows an example of checking if a checkbox has been selected or not using the `checked` attribute.

### Event Listeners
An event listener is a procedure or function in a computer program that waits for an event to occur. A simple example of an event is a user clicking their mouse or pressing a key on the keyboard. The html-typescript.ts typescript code shows examples of setting up event listeners on a variety of different HTML elements, such as buttons and checkboxes, using the element id's or names. These event listeners wait for events such as a user clicking on the HTML element, and then an event handler function is called to react to that event. This is the main way for users interacting with the HTML UI to interact with the backend code. 

### HTML Element Creation and Deletion
HTML Elements such as divs, buttons, paragraphs, hyperlinks, images, and more can be created and added to a HTML file using typescript code. Elements can also be deleted from HTML. This is useful when creating multiple rows of similar objects (such as rows of cards in this example), or when an element should only appear or disappear once some event happens. HTML Element creation and deletion examples are shown in the html_typescript exemplar, in which a row of cards is added to the HTML when a checkbox is selected, and deleted when the checkbox is deselected. 

## Why is this Useful?
All of these examples show how to set up a simple HTML file containing elements that would be very useful for our application, such as cards to display recipes and text input boxes to input new recipes, for example. The html_typescript exemplar code is shows very useful examples for interacting with these HTML elements that we are likely to use for our UI. We will need to know how to manipulate and interact with HTML using typescript for this project, and so these examples show the proper way to interact with a variety of different elements. 