window.addEventListener('load', startHTML);

async function startHTML() {
    await addEventListeners();
}

async function addEventListeners() {
    let checkboxCards = document.getElementById('checkboxCards')
    if (checkboxCards != null) {
        checkboxCards.addEventListener('click', cardCheckboxClick);
    }

    let textInputButton = document.getElementById('text_input_button')
    if (textInputButton != null) {
        textInputButton.addEventListener('click', inputSelect);
    }

    let firstNameInput = document.getElementById('firstNameInput')
    if (firstNameInput != null) {
        firstNameInput.addEventListener('keydown', textColorChange);
    }

    let checkboxButton = document.getElementById('checkbox_button')
    if (checkboxButton != null) {
        checkboxButton.addEventListener('click', checkboxClick)
    }
    

    let radioButtons = <NodeListOf<HTMLInputElement>>  document.getElementsByName('radiogroup')
    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('click', () => {radioSelect(radioButtons[i])});
    }
}

function radioSelect(element: HTMLInputElement) {
    window.alert(element.value + ' selected!')
}

function checkboxClick() {
    let checkboxGroup= <NodeListOf<HTMLInputElement>> document.getElementsByName('checkboxgroup');
    let checkboxString = ""

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

function inputSelect() {
    let firstNameInput = <HTMLInputElement>  document.getElementById('firstNameInput')
    let lastNameInput = <HTMLInputElement>  document.getElementById('lastNameInput')
    
    let firstName = firstNameInput.value;
    let lastName = lastNameInput.value;

    window.alert('Hello '+ firstName + ' ' + lastName + '!')

}

function textColorChange() {
    let firstNameInput = document.getElementById('firstNameInput');
    if (firstNameInput !== null) {
        if (firstNameInput.style.color !== "green") {
            firstNameInput.style.color = "green"
        } else {
            firstNameInput.style.color = "blue"
        }
    }
}

function cardCheckboxClick() {
    let checkBox = <HTMLInputElement> document.getElementById('checkboxCards');
    if (checkBox.checked) {
        addCardRow()
    } else {
        deleteCardRow()
    }
}

function addCardRow() {
    let parentContainer = document.getElementById('card_container');

    if (parentContainer !== null) {
        let cardRow = document.createElement('div');
        cardRow.classList.add('card-deck', 'row', 'mb-3')
        cardRow.id = "cardRowAdd"
        for (let i = 0; i < 3; i++) {
            let card = document.createElement('div');
            card.classList.add('card');

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            cardBody.id = "card" + (i + 4).toString()

            let image = document.createElement('img');
            image.src = "https://picsum.photos/300/200?random=" + (i + 4).toString()

            cardBody.appendChild(image)
            
            let h5Title = document.createElement('h5');
            h5Title.innerText = "Card " + (i + 4).toString();
            h5Title.classList.add("card-title");

            cardBody.appendChild(h5Title)

            let h6Title = document.createElement('h6');
            h6Title.innerText = "A nice looking card.";
            h6Title.classList.add("card-subtitle", "mb-2", "text-muted");

            cardBody.appendChild(h6Title)

            let pElement = document.createElement('p');
            pElement.classList.add('card-text')
            pElement.innerText = "This is more text explaining more about what the card is referencing, such as a recipe."

            cardBody.appendChild(pElement)

            let a = document.createElement('a');
            a.href = "#";
            a.innerText = "Link to learn more.";

            cardBody.appendChild(a)

            card.appendChild(cardBody)
            cardRow.appendChild(card)
        }

        parentContainer.appendChild(cardRow)
    }
}

function deleteCardRow() {
    let parentContainer = document.getElementById('card_container');
    if (parentContainer !== null) {
        let childNode = document.getElementById('cardRowAdd')
        if (childNode !== null) {
            parentContainer.removeChild(childNode)
        }
    }
}