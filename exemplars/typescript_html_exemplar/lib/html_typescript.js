var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Event listener for the loading of the HTML page
window.addEventListener('load', startHTML);
function startHTML() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Add event listeners to HTML input elements
                return [4 /*yield*/, addEventListeners()];
                case 1:
                    // Add event listeners to HTML input elements
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function addEventListeners() {
    return __awaiter(this, void 0, void 0, function () {
        var checkboxCards, textInputButton, firstNameInput, checkboxButton, radioButtons, _loop_1, i;
        return __generator(this, function (_a) {
            checkboxCards = document.getElementById('checkboxCards');
            checkboxCards.addEventListener('click', cardCheckboxClick);
            textInputButton = document.getElementById('text_input_button');
            textInputButton.addEventListener('click', inputSelect);
            firstNameInput = document.getElementById('firstNameInput');
            firstNameInput.addEventListener('keydown', textColorChange);
            checkboxButton = document.getElementById('checkbox_button');
            checkboxButton.addEventListener('click', checkboxClick);
            radioButtons = document.getElementsByName('radiogroup');
            _loop_1 = function (i) {
                // To call a function that requires an argument to be passed in, define a function that calls the function you need with arguments passed in
                radioButtons[i].addEventListener('click', function () { radioSelect(radioButtons[i]); });
            };
            for (i = 0; i < radioButtons.length; i++) {
                _loop_1(i);
            }
            return [2 /*return*/];
        });
    });
}
// radioSelect function simply displays an alert dialog saying which radio button has been clicked
function radioSelect(element) {
    // element is the radio button element that was clicked- it's value has been set in the HTML to the name of the radio button
    window.alert(element.value + ' selected!');
}
// checkboxClick function grabs all checkbox elements in group (below Checkboxes header) and displays alert dialog saying which checkboxes have been checked
function checkboxClick() {
    // Grab list of all checkboxes with name checkboxgroup in HTML
    var checkboxGroup = document.getElementsByName('checkboxgroup');
    var checkboxString = "";
    // Loop through each checkbox HTML input element and check if it has been checked (if checked boolean attribute is true)
    // If checked, add the elements value (name of checkbox in this example) to output string
    for (var i = 0; i < checkboxGroup.length; i++) {
        if (checkboxGroup[i].checked) {
            checkboxString = checkboxString + checkboxGroup[i].value + " ";
        }
    }
    if (checkboxString == "") {
        window.alert('No checkboxes selected');
    }
    else {
        window.alert('Selected checkboxes: ' + checkboxString);
    }
}
// inputSelect function grabs the first name and last name text input HTML input elements and displays alert dialog message with the first name and last name values
function inputSelect() {
    // Grab the first name and last name HTMLInputElements from HTML 
    var firstNameInput = document.getElementById('firstNameInput');
    var lastNameInput = document.getElementById('lastNameInput');
    // Grab value from the text inputs (string typed into text input box)
    var firstName = firstNameInput.value;
    var lastName = lastNameInput.value;
    window.alert('Hello ' + firstName + ' ' + lastName + '!');
}
// textColorChange changes the color of the font in the text input box from green to blue or blue to green
function textColorChange() {
    var firstNameInput = document.getElementById('firstNameInput');
    // Check the current color of the text with style.color property
    if (firstNameInput.style.color !== "green") {
        // Set new color by setting style.color equal to new color (string)
        firstNameInput.style.color = "green";
    }
    else {
        firstNameInput.style.color = "blue";
    }
}
// cardCheckboxClick function checks if the checkbox after being clicked has been checked- calls addCardRow() or unchecked- calls deleteCardRow()
function cardCheckboxClick() {
    var checkBox = document.getElementById('checkboxCards');
    if (checkBox.checked) {
        addCardRow();
    }
    else {
        deleteCardRow();
    }
}
// addCardRow function shows a variety of examples of how to add new HTML elements to existing HTML- adds new row of card elements
function addCardRow() {
    // To add new elements to HTML, first need to grab the parent node that the new elements will be added to
    var parentContainer = document.getElementById('card_container');
    // Create a new div element which in this case will be the div that holds a row of card elements
    var cardRow = document.createElement('div');
    // Add classes to the cardRow div element
    cardRow.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'mb-3');
    // Set the id of the cardRow div element
    cardRow.id = "cardRowAdd";
    // Adding 3 new cards to the cardRow div element
    for (var i = 0; i < 3; i++) {
        // Create column div to hold the card
        var col = document.createElement('div');
        col.classList.add('col');
        // Create card div element- will hold the body of the card
        var card = document.createElement('div');
        card.classList.add('card');
        // Add id to each card starting with card4 going up to card6
        card.id = "card" + (i + 4).toString();
        // Create card body div element- will hold all the pictures and text within the card
        var cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // Create image element
        var image = document.createElement('img');
        // Set the image source to the following random picture url
        image.src = "https://picsum.photos/300/200?random=" + (i + 4).toString();
        // Add the image element to the cardBody div
        cardBody.appendChild(image);
        // Create a new h5 (title) element
        var h5Title = document.createElement('h5');
        // Add text to the h5 element (this is the text that will be displayed by this header element)
        h5Title.innerText = "Card " + (i + 4).toString();
        h5Title.classList.add("card-title");
        // Add the h5 element to the cardBody div (adds to the end of the cardBody div after image element)
        cardBody.appendChild(h5Title);
        // Create a new h6 (title) element, add text to be displayed by this title, add classes
        var h6Title = document.createElement('h6');
        h6Title.innerText = "A nice looking card.";
        h6Title.classList.add("card-subtitle", "mb-2", "text-muted");
        // Add the h6 element to the cardBody div (adds to the end of the cardBody div)
        cardBody.appendChild(h6Title);
        // Create new p element (paragraph)
        var pElement = document.createElement('p');
        pElement.classList.add('card-text');
        // Add text for the paragraph element to display
        pElement.innerText = "This is more text explaining more about what the card is referencing, such as a recipe.";
        // Add the paragraph element to the cardBody div (adds to the end of the cardBody div)
        cardBody.appendChild(pElement);
        // Create new a (hyperlink) element
        var a = document.createElement('a');
        // Define the hyperlink url by setting .href attribute
        a.href = "#";
        // Add text for the hyperlink
        a.innerText = "Link to learn more.";
        // Add the hyperlink element to the cardBody div (adds to the end of the cardBody div)
        cardBody.appendChild(a);
        // Add the cardBody div element (which contains all the images and text from above) to the card element
        card.appendChild(cardBody);
        // Add the card element (which now contains the cardBody) to the col div
        col.appendChild(card);
        // Add the col element (which now contains the card) to the cardRow div
        cardRow.appendChild(col);
    }
    // After all 3 cards have been created and added to the cardRow div, add this new row of cards to the parent div
    parentContainer.appendChild(cardRow);
}
// deleteCardRow shows how to delete existing HTML nodes from HTML- deletes added row of cards
function deleteCardRow() {
    var parentContainer = document.getElementById('card_container');
    var childNode = document.getElementById('cardRowAdd');
    parentContainer.removeChild(childNode);
}
