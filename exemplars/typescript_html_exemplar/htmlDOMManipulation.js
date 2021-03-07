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
window.addEventListener('load', startHTML);
function startHTML() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addEventListeners()];
                case 1:
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
            if (checkboxCards != null) {
                checkboxCards.addEventListener('click', cardCheckboxClick);
            }
            textInputButton = document.getElementById('text_input_button');
            if (textInputButton != null) {
                textInputButton.addEventListener('click', inputSelect);
            }
            firstNameInput = document.getElementById('firstNameInput');
            if (firstNameInput != null) {
                firstNameInput.addEventListener('keydown', textColorChange);
            }
            checkboxButton = document.getElementById('checkbox_button');
            if (checkboxButton != null) {
                checkboxButton.addEventListener('click', checkboxClick);
            }
            radioButtons = document.getElementsByName('radiogroup');
            _loop_1 = function (i) {
                radioButtons[i].addEventListener('click', function () { radioSelect(radioButtons[i]); });
            };
            for (i = 0; i < radioButtons.length; i++) {
                _loop_1(i);
            }
            return [2 /*return*/];
        });
    });
}
function radioSelect(element) {
    window.alert(element.value + ' selected!');
}
function checkboxClick() {
    var checkboxGroup = document.getElementsByName('checkboxgroup');
    var checkboxString = "";
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
function inputSelect() {
    var firstNameInput = document.getElementById('firstNameInput');
    var lastNameInput = document.getElementById('lastNameInput');
    var firstName = firstNameInput.value;
    var lastName = lastNameInput.value;
    window.alert('Hello ' + firstName + ' ' + lastName + '!');
}
function textColorChange() {
    var firstNameInput = document.getElementById('firstNameInput');
    if (firstNameInput !== null) {
        if (firstNameInput.style.color !== "green") {
            firstNameInput.style.color = "green";
        }
        else {
            firstNameInput.style.color = "blue";
        }
    }
}
function cardCheckboxClick() {
    var checkBox = document.getElementById('checkboxCards');
    if (checkBox.checked) {
        addCardRow();
    }
    else {
        deleteCardRow();
    }
}
function addCardRow() {
    var parentContainer = document.getElementById('card_container');
    if (parentContainer !== null) {
        var cardRow = document.createElement('div');
        cardRow.classList.add('card-deck', 'row', 'mb-3');
        cardRow.id = "cardRowAdd";
        for (var i = 0; i < 3; i++) {
            var card = document.createElement('div');
            card.classList.add('card');
            var cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            cardBody.id = "card" + (i + 4).toString();
            var image = document.createElement('img');
            image.src = "https://picsum.photos/300/200?random=" + (i + 4).toString();
            cardBody.appendChild(image);
            var h5Title = document.createElement('h5');
            h5Title.innerText = "Card " + (i + 4).toString();
            h5Title.classList.add("card-title");
            cardBody.appendChild(h5Title);
            var h6Title = document.createElement('h6');
            h6Title.innerText = "A nice looking card.";
            h6Title.classList.add("card-subtitle", "mb-2", "text-muted");
            cardBody.appendChild(h6Title);
            var pElement = document.createElement('p');
            pElement.classList.add('card-text');
            pElement.innerText = "This is more text explaining more about what the card is referencing, such as a recipe.";
            cardBody.appendChild(pElement);
            var a = document.createElement('a');
            a.href = "#";
            a.innerText = "Link to learn more.";
            cardBody.appendChild(a);
            card.appendChild(cardBody);
            cardRow.appendChild(card);
        }
        parentContainer.appendChild(cardRow);
    }
}
function deleteCardRow() {
    var parentContainer = document.getElementById('card_container');
    if (parentContainer !== null) {
        var childNode = document.getElementById('cardRowAdd');
        if (childNode !== null) {
            parentContainer.removeChild(childNode);
        }
    }
}
