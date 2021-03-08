// Event listener for the loading of the HTML page
window.addEventListener('load', startHTML);

async function startHTML() {
    // Add event listeners to HTML input elements
    await addEventListeners();
}

async function addEventListeners() {
    // Add event listener to the checkbox above the HTML cards- on click call cardCheckboxClick()
    let checkboxCards = document.getElementById('checkboxCards') as HTMLElement
    checkboxCards.addEventListener('click', cardCheckboxClick);

    // Add event listener to submit button below firstname/lastname text inputs- on click call inputSelect()
    let textInputButton = document.getElementById('text_input_button') as HTMLElement
    textInputButton.addEventListener('click', inputSelect);

    // Add event listener to the firstname input- on key down call textColorChange()
    let firstNameInput = document.getElementById('firstNameInput') as HTMLElement
    firstNameInput.addEventListener('keydown', textColorChange);


    // Add event listener to the submit button below checkboxes- on click call checkboxClick
    let checkboxButton = document.getElementById('checkbox_button') as HTMLElement
    checkboxButton.addEventListener('click', checkboxClick)
    
    // Radio buttons are a group of HTML input elements- for each radio button add event listener- on click call a function that calls radioSelect with clicked radio button element passed in
    let radioButtons = document.getElementsByName('radiogroup') as NodeListOf<HTMLInputElement>
    for (let i = 0; i < radioButtons.length; i++) {
        // To call a function that requires an argument to be passed in, define a function that calls the function you need with arguments passed in
        radioButtons[i].addEventListener('click', () => {radioSelect(radioButtons[i])});
    }
}

// radioSelect function simply displays an alert dialog saying which radio button has been clicked
function radioSelect(element: HTMLInputElement) {
    // element is the radio button element that was clicked- it's value has been set in the HTML to the name of the radio button
    window.alert(element.value + ' selected!')
}

// checkboxClick function grabs all checkbox elements in group (below Checkboxes header) and displays alert dialog saying which checkboxes have been checked
function checkboxClick() {
    // Grab list of all checkboxes with name checkboxgroup in HTML
    let checkboxGroup= document.getElementsByName('checkboxgroup') as NodeListOf<HTMLInputElement>;
    let checkboxString = ""

    // Loop through each checkbox HTML input element and check if it has been checked (if checked boolean attribute is true)
    // If checked, add the elements value (name of checkbox in this example) to output string
    for (let i = 0; i < checkboxGroup.length; i++) {
        if (checkboxGroup[i].checked) {
            checkboxString = checkboxString + checkboxGroup[i].value +" "
        }
    }

    if (checkboxString == "") {
        window.alert('No checkboxes selected')
    } else {
        window.alert('Selected checkboxes: ' + checkboxString)
    }

}

// inputSelect function grabs the first name and last name text input HTML input elements and displays alert dialog message with the first name and last name values
function inputSelect() {
    // Grab the first name and last name HTMLInputElements from HTML 
    let firstNameInput = document.getElementById('firstNameInput') as HTMLInputElement
    let lastNameInput = document.getElementById('lastNameInput') as HTMLInputElement
    
    // Grab value from the text inputs (string typed into text input box)
    let firstName = firstNameInput.value;
    let lastName = lastNameInput.value;

    window.alert('Hello '+ firstName + ' ' + lastName + '!')

}

// textColorChange changes the color of the font in the text input box from green to blue or blue to green
function textColorChange() {
    let firstNameInput = document.getElementById('firstNameInput') as HTMLElement;
    // Check the current color of the text with style.color property
    if (firstNameInput.style.color !== "green") {
        // Set new color by setting style.color equal to new color (string)
        firstNameInput.style.color = "green"
    } else {
        firstNameInput.style.color = "blue"
    }
}

// cardCheckboxClick function checks if the checkbox after being clicked has been checked- calls addCardRow() or unchecked- calls deleteCardRow()
function cardCheckboxClick() {
    let checkBox = document.getElementById('checkboxCards') as HTMLInputElement;
    if (checkBox.checked) {
        addCardRow()
    } else {
        deleteCardRow()
    }
}

// addCardRow function shows a variety of examples of how to add new HTML elements to existing HTML- adds new row of card elements
function addCardRow() {
    // To add new elements to HTML, first need to grab the parent node that the new elements will be added to
    let parentContainer = document.getElementById('card_container') as HTMLElement;

    // Create a new div element which in this case will be the div that holds a row of card elements
    let cardRow = document.createElement('div');
    // Add classes to the cardRow div element
    cardRow.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'mb-3')
    // Set the id of the cardRow div element
    cardRow.id = "cardRowAdd"

    // Adding 3 new cards to the cardRow div element
    for (let i = 0; i < 3; i++) {
        // Create column div to hold the card
        let col = document.createElement('div');
        col.classList.add('col');

        // Create card div element- will hold the body of the card
        let card = document.createElement('div');
        card.classList.add('card');
        // Add id to each card starting with card4 going up to card6
        card.id = "card" + (i + 4).toString()

        // Create card body div element- will hold all the pictures and text within the card
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Create image element
        let image = document.createElement('img');
        // Set the image source to the following random picture url
        image.src = "https://picsum.photos/300/200?random=" + (i + 4).toString()

        // Add the image element to the cardBody div
        cardBody.appendChild(image)
        
        // Create a new h5 (title) element
        let h5Title = document.createElement('h5');
        // Add text to the h5 element (this is the text that will be displayed by this header element)
        h5Title.innerText = "Card " + (i + 4).toString();
        h5Title.classList.add("card-title");

        // Add the h5 element to the cardBody div (adds to the end of the cardBody div after image element)
        cardBody.appendChild(h5Title)

        // Create a new h6 (title) element, add text to be displayed by this title, add classes
        let h6Title = document.createElement('h6');
        h6Title.innerText = "A nice looking card.";
        h6Title.classList.add("card-subtitle", "mb-2", "text-muted");

        // Add the h6 element to the cardBody div (adds to the end of the cardBody div)
        cardBody.appendChild(h6Title)

        // Create new p element (paragraph)
        let pElement = document.createElement('p');
        pElement.classList.add('card-text')
        // Add text for the paragraph element to display
        pElement.innerText = "This is more text explaining more about what the card is referencing, such as a recipe."

        // Add the paragraph element to the cardBody div (adds to the end of the cardBody div)
        cardBody.appendChild(pElement)

        // Create new a (hyperlink) element
        let a = document.createElement('a');
        // Define the hyperlink url by setting .href attribute
        a.href = "#";
        // Add text for the hyperlink
        a.innerText = "Link to learn more.";

        // Add the hyperlink element to the cardBody div (adds to the end of the cardBody div)
        cardBody.appendChild(a)

        // Add the cardBody div element (which contains all the images and text from above) to the card element
        card.appendChild(cardBody)
        // Add the card element (which now contains the cardBody) to the col div
        col.appendChild(card)
        // Add the col element (which now contains the card) to the cardRow div
        cardRow.appendChild(col)
    }

    // After all 3 cards have been created and added to the cardRow div, add this new row of cards to the parent div
    parentContainer.appendChild(cardRow)
}

// deleteCardRow shows how to delete existing HTML nodes from HTML- deletes added row of cards
function deleteCardRow() {
    let parentContainer = document.getElementById('card_container') as HTMLElement;
    let childNode = document.getElementById('cardRowAdd') as HTMLElement;
    parentContainer.removeChild(childNode)
}