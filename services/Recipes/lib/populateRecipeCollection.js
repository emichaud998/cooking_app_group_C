"use strict";
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
exports.__esModule = true;
var faker = require('faker');
var axios_1 = require("axios");
var url = 'http://localhost:8091';
var readline = require("readline");
var dietary_categories = ["low_sodium", "low_fat", "low_carb", "gluten_free", "dairy_free", "nut_free", "low_sugar", "low_calories", "all_natural", "vegetarian", "vegan", "healthy"];
var meal_type = ["breakfast", "lunch", "dinner", "snack", "appetizer", "side_dish", "dessert"];
var totalRecipes = 0;
function recipeMockData() {
    return __awaiter(this, void 0, void 0, function () {
        var rl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rl = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });
                    return [4 /*yield*/, rl.question("Enter total number of fake recipes to create: ", function (answer) {
                            try {
                                totalRecipes = Number(answer);
                                if (totalRecipes <= 0) {
                                    throw new Error("Must provide a number greater than 0");
                                }
                                else {
                                    populateRecipes();
                                }
                            }
                            catch (err) {
                                console.log(err);
                                throw new Error("Must provide a valid number");
                            }
                            rl.close();
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function populateRecipes() {
    return __awaiter(this, void 0, void 0, function () {
        var recipes, newRecipe, index, i, ingredientsList, i, newIngredient, ingredientsExtraList, i, newIngredient, postURL, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    recipes = 1;
                    _a.label = 1;
                case 1:
                    if (!(recipes <= totalRecipes)) return [3 /*break*/, 7];
                    newRecipe = {};
                    newRecipe.name = faker.commerce.productName();
                    newRecipe.description = faker.commerce.productDescription();
                    newRecipe.cook_time = faker.datatype.number({ 'min': 0, 'max': 30 });
                    newRecipe.prep_time = faker.datatype.number({ 'min': 0, 'max': 120 });
                    newRecipe.servings = faker.datatype.number({ 'min': 1, 'max': 10 });
                    newRecipe.calories = faker.datatype.number({ 'min': 100, 'max': 1000 });
                    newRecipe.yield_amount = faker.datatype.number({ 'min': 1, 'max': 5 });
                    newRecipe.yield_unit = faker.random.word();
                    newRecipe.meal_type = faker.random.arrayElements(meal_type, faker.datatype.number({ 'min': 0, 'max': meal_type.length - 1 }));
                    newRecipe.dietary_categories = faker.random.arrayElements(dietary_categories, faker.datatype.number({ 'min': 0, 'max': dietary_categories.length - 1 }));
                    newRecipe.dish_type = faker.commerce.product();
                    index = faker.datatype.number({ 'min': 1, 'max': 4 });
                    newRecipe.recipe_steps = [];
                    for (i = 1; i <= index; i++) {
                        newRecipe.recipe_steps.push(faker.lorem.paragraph(faker.datatype.number({ 'min': 1, 'max': 3 })));
                    }
                    index = faker.datatype.number({ 'min': 1, 'max': 4 });
                    ingredientsList = [];
                    for (i = 1; i <= index; i++) {
                        newIngredient = {};
                        newIngredient.ingredient_name = faker.commerce.productMaterial();
                        newIngredient.measurement_amount = faker.datatype.number({ 'min': 1, 'max': 10 });
                        newIngredient.measurement_unit = faker.random.word();
                        newIngredient.ingredient_type = faker.commerce.productAdjective();
                        ingredientsList.push(newIngredient);
                    }
                    newRecipe.ingredients = ingredientsList;
                    index = faker.datatype.number({ 'min': 0, 'max': 4 });
                    if (index > 0) {
                        ingredientsExtraList = [];
                        for (i = 1; i <= index; i++) {
                            newIngredient = {};
                            newIngredient.ingredient_name = faker.commerce.productMaterial();
                            newIngredient.measurement_amount = faker.datatype.number({ 'min': 1, 'max': 10 });
                            newIngredient.measurement_unit = faker.random.word();
                            newIngredient.ingredient_type = faker.commerce.productAdjective();
                            ingredientsExtraList.push(newIngredient);
                        }
                        newRecipe.ingredients_extra = ingredientsExtraList;
                    }
                    postURL = url + '/api/recipes/create_recipe';
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, axios_1["default"].post(postURL, newRecipe)];
                case 3:
                    _a.sent();
                    console.log("Added " + recipes.toString() + "/" + totalRecipes.toString() + " Recipes!");
                    // Add small delay between requests
                    return [4 /*yield*/, delay(100)];
                case 4:
                    // Add small delay between requests
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.log("Error adding recipe to DB");
                    return [3 /*break*/, 6];
                case 6:
                    recipes++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
recipeMockData();
