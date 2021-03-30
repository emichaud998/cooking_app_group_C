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
var axios_1 = require("axios");
var url = 'http://localhost:8000';
// Create New Recipe Examples
function createRecipe() {
    return __awaiter(this, void 0, void 0, function () {
        var recipeIDArr, createURL, blackBeanBurger, granolaBar, macAndCheese, recipe, error_1, recipe, error_2, recipe, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    recipeIDArr = [];
                    createURL = url + '/api/recipes/create_recipe';
                    blackBeanBurger = {};
                    // Give recipe a name- this is required to successfully create and store a new recipe
                    blackBeanBurger.name = 'Homemade Black Bean Veggie Burgers';
                    // Add a recipe description
                    blackBeanBurger.description = "You will never want to eat frozen veggie burgers again. These are so easy, and you'll be proud to have created such a vegetarian delight.";
                    // Add recipe prep time
                    blackBeanBurger.prep_time = 15;
                    // Add recipe cook time
                    blackBeanBurger.cook_time = 20;
                    // Add recipe total servings
                    blackBeanBurger.servings = 4;
                    // Add recipe yield amount- quantifies what a serving is
                    blackBeanBurger.yield_amount = 4;
                    // Add recipe yield unit
                    blackBeanBurger.yield_unit = 'patties';
                    // Add recipe calories
                    blackBeanBurger.calories = 198;
                    // Add recipe main dish type 
                    blackBeanBurger.dish_type = 'protein';
                    // Add recipe dietary categories- these are categories that exist in the Dietary_Categories interface
                    blackBeanBurger.dietary_categories = ['vegetarian', 'healthy', 'low_calories'];
                    // Add recipe meal types- these are meal types that exist in the Meal_Type interface
                    blackBeanBurger.meal_type = ["lunch", "dinner"];
                    // Add recipe steps- these will be numbered by the recipe microservice in the order they exist in the array
                    blackBeanBurger.recipe_steps = [
                        "If grilling, preheat an outdoor grill for high heat, and lightly oil a sheet of aluminum foil. If baking, preheat oven to 375 degrees F (190 degrees C), and lightly oil a baking sheet.",
                        "In a medium bowl, mash black beans with a fork until thick and pasty.",
                        "In a food processor, finely chop bell pepper, onion, and garlic. Then stir into mashed beans.",
                        "In a small bowl, stir together egg, chili powder, cumin, and chili sauce.",
                        "Stir the egg mixture into the mashed beans. Mix in bread crumbs until the mixture is sticky and holds together. Divide mixture into four patties.",
                        "If grilling, place patties on foil, and grill about 8 minutes on each side. If baking, place patties on baking sheet, and bake about 10 minutes on each side."
                    ];
                    // Add recipe ingredients- these are ingredients that are necessary to make the meal
                    blackBeanBurger.ingredients = [
                        { "ingredient_name": "black beans", "measurement_amount": 16, "measurement_unit": "ounces", "ingredient_type": "legumes" },
                        { "ingredient_name": "green bell pepper", "measurement_amount": 0.5, "measurement_unit": "pepper", "ingredient_type": "fruit" },
                        { "ingredient_name": "onion", "measurement_amount": 1, "measurement_unit": "onion", "ingredient_type": "vegetable" },
                        { "ingredient_name": "garlic", "measurement_amount": 3, "measurement_unit": "cloves", "ingredient_type": "vegetable" },
                        { "ingredient_name": "egg", "measurement_amount": 1, "measurement_unit": "egg", "ingredient_type": "protein" },
                        { "ingredient_name": "chili powder", "measurement_amount": 1, "measurement_unit": "tablespoon", "ingredient_type": "spice" },
                        { "ingredient_name": "cumin", "measurement_amount": 1, "measurement_unit": "tablespoons", "ingredient_type": "spice" },
                        { "ingredient_name": "chili sauce", "measurement_amount": 1, "measurement_unit": "teaspoon", "ingredient_type": "sauce" },
                        { "ingredient_name": "bread crumbs", "measurement_amount": 0.5, "measurement_unit": "cups", "ingredient_type": "grain" }
                    ];
                    // Do not need to be added, but if there are any non-necessary ingredients you can add them in this field
                    blackBeanBurger.ingredients_extra = [
                        { "ingredient_name": "salt", "measurement_amount": 0.5, "measurement_unit": "teaspoons", "ingredient_type": "seasoning" }
                    ];
                    granolaBar = {};
                    granolaBar.name = 'Oat-Free and Gluten-Free Granola Bars';
                    granolaBar.description = "If you are trying to avoid certain grains and processed sugars, this is an excellent substitute for the traditional granola bar.";
                    granolaBar.prep_time = 10;
                    granolaBar.cook_time = 120;
                    granolaBar.servings = 20;
                    granolaBar.yield_amount = 20;
                    granolaBar.yield_unit = 'granola bars';
                    granolaBar.calories = 300;
                    granolaBar.dish_type = 'grain';
                    granolaBar.dietary_categories = ['vegetarian', 'low_sugar', 'gluten_free'];
                    granolaBar.meal_type = ["snack"];
                    granolaBar.recipe_steps = [
                        "Place 3/4 cups almonds and 3/4 cups sunflower seeds into a food processor; chop until nuts are in 1/4-inch pieces, 1 to 2 minutes. Remove from food processor and pour in a bowl. Place the remaining almonds and sunflower seeds into the food processor; roughly chop into larger pieces, about 1 minute.",
                        "Mix remaining nuts, seeds, shredded coconut, and dried apricot into the 1/4-inch nuts until fruit and nut mixture is combined.",
                        "Combine coconut oil, honey, ground cinnamon, vanilla extract, and salt in a sauce pan over medium-low heat; cook until the coconut oil mixture bubbles and turns a lighter color, 3 to 5 minutes.",
                        "Pour coconut oil mixture over the fruit and nut mixture; stir until the granola mixture takes on the consistency of wet sand, about 1 minute.",
                        "Line a baking sheet with waxed paper. Pour granola mixture onto the sheet; place a second sheet of waxed paper on top of the granola mixture. Push down on the waxed paper with you hands until the granola mixture has been evenly spread. Pack tightly to ensure that the granola will not fall apart.",
                        "Cool until granola has hardened, 2 to 3 hours. Cut into bars."
                    ];
                    granolaBar.ingredients = [
                        { "ingredient_name": "almonds", "measurement_amount": 1.25, "measurement_unit": "cups", "ingredient_type": "nut" },
                        { "ingredient_name": "sunflower seeds", "measurement_amount": 1.25, "measurement_unit": "cups", "ingredient_type": "seed" },
                        { "ingredient_name": "shredded coconut", "measurement_amount": 2, "measurement_unit": "cups", "ingredient_type": "fruit" },
                        { "ingredient_name": "dried apricot", "measurement_amount": 1, "measurement_unit": "cups", "ingredient_type": "fruit" },
                        { "ingredient_name": "coconut oil", "measurement_amount": 1.5, "measurement_unit": "cups", "ingredient_type": "oil" },
                        { "ingredient_name": "honey", "measurement_amount": 1, "measurement_unit": "tablespoon", "ingredient_type": "sweetener" },
                        { "ingredient_name": "cinnamon", "measurement_amount": 1, "measurement_unit": "cups", "ingredient_type": "spice" },
                        { "ingredient_name": "vanilla extract", "measurement_amount": 1, "measurement_unit": "teaspoons", "ingredient_type": "sweetener" },
                        { "ingredient_name": "salt", "measurement_amount": 0.5, "measurement_unit": "teaspoons", "ingredient_type": "seasoning" }
                    ];
                    granolaBar.ingredients_extra = [
                        { "ingredient_name": "peanuts", "measurement_amount": 1.25, "measurement_unit": "cups", "ingredient_type": "nut" },
                        { "ingredient_name": "craisins", "measurement_amount": 1, "measurement_unit": "cups", "ingredient_type": "nut" },
                    ];
                    macAndCheese = {};
                    macAndCheese.name = 'Homemade Mac and Cheese';
                    macAndCheese.description = "This is a nice rich mac and cheese. Serve with a salad for a great meatless dinner. Hope you enjoy it.";
                    macAndCheese.prep_time = 20;
                    macAndCheese.cook_time = 30;
                    macAndCheese.servings = 4;
                    macAndCheese.yield_amount = 4;
                    macAndCheese.yield_unit = 'serving';
                    macAndCheese.calories = 800;
                    macAndCheese.dish_type = 'grain';
                    macAndCheese.dietary_categories = [];
                    macAndCheese.meal_type = ["lunch", "dinner"];
                    macAndCheese.recipe_steps = [
                        "Cook macaroni according to the package directions. Drain.",
                        "In a saucepan, melt butter or margarine over medium heat. Stir in enough flour to make a roux. Add milk to roux slowly, stirring constantly. Stir in cheeses, and cook over low heat until cheese is melted and the sauce is a little thick. Put macaroni in large casserole dish, and pour sauce over macaroni. Stir well.",
                        "Melt butter or margarine in a skillet over medium heat. Add breadcrumbs and brown. Spread over the macaroni and cheese to cover. Sprinkle with a little paprika.",
                        "Bake at 350 degrees F (175 degrees C) for 30 minutes. Serve."
                    ];
                    macAndCheese.ingredients = [
                        { "ingredient_name": "macaroni", "measurement_amount": 8, "measurement_unit": "ounces", "ingredient_type": "grains" },
                        { "ingredient_name": "cheddar cheese", "measurement_amount": 2, "measurement_unit": "cups", "ingredient_type": "dairy" },
                        { "ingredient_name": "parmesan cheese", "measurement_amount": 0.5, "measurement_unit": "cups", "ingredient_type": "dairy" },
                        { "ingredient_name": "milk", "measurement_amount": 3, "measurement_unit": "cups", "ingredient_type": "dairy" },
                        { "ingredient_name": "butter", "measurement_amount": 0.25, "measurement_unit": "cups", "ingredient_type": "dairy" },
                        { "ingredient_name": "flour", "measurement_amount": 2.5, "measurement_unit": "tablespoons", "ingredient_type": "baking" },
                        { "ingredient_name": "bread crumbs", "measurement_amount": 0.5, "measurement_unit": "cups", "ingredient_type": "grains" },
                    ];
                    macAndCheese.ingredients_extra = [
                        { "ingredient_name": "paprika", "measurement_amount": 1, "measurement_unit": "pinch", "ingredient_type": "seasoning" }
                    ];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].post(createURL, blackBeanBurger)];
                case 2:
                    recipe = _a.sent();
                    recipeIDArr.push(recipe.data.recipe._id);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log("Error adding recipe to DB");
                    throw error_1;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, axios_1["default"].post(createURL, granolaBar)];
                case 5:
                    recipe = _a.sent();
                    recipeIDArr.push(recipe.data.recipe._id);
                    return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    console.log("Error adding recipe to DB");
                    throw error_2;
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, axios_1["default"].post(createURL, macAndCheese)];
                case 8:
                    recipe = _a.sent();
                    recipeIDArr.push(recipe.data.recipe._id);
                    return [3 /*break*/, 10];
                case 9:
                    error_3 = _a.sent();
                    console.log("Error adding recipe to DB");
                    throw error_3;
                case 10: return [2 /*return*/, recipeIDArr];
            }
        });
    });
}
// Get Recipes Examples
function getRecipes(id) {
    return __awaiter(this, void 0, void 0, function () {
        var getURL, recipeList, error_4, recipeList, error_5, recipeList, error_6, getIDURL, recipeList, error_7, getNameURL, recipeList, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getURL = url + '/api/recipes/get_recipes';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get(getURL)];
                case 2:
                    recipeList = _a.sent();
                    console.log("Full Recipe List:");
                    console.log(recipeList.data);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.log("Error getting recipes from recipe microservice");
                    throw error_4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, axios_1["default"].get(getURL, { params: { limit: 2 } })];
                case 5:
                    recipeList = _a.sent();
                    console.log("Limited Recipe List:");
                    console.log(recipeList.data);
                    return [3 /*break*/, 7];
                case 6:
                    error_5 = _a.sent();
                    console.log("Error getting recipes from recipe microservice");
                    throw error_5;
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, axios_1["default"].get(getURL, { params: { limit: 2, skip: 1 } })];
                case 8:
                    recipeList = _a.sent();
                    console.log("Limited Recipe List Skipping First Entry:");
                    console.log(recipeList.data);
                    return [3 /*break*/, 10];
                case 9:
                    error_6 = _a.sent();
                    console.log("Error getting recipes from recipe microservice");
                    throw error_6;
                case 10:
                    _a.trys.push([10, 12, , 13]);
                    getIDURL = url + '/api/recipes/get_recipe_by_id';
                    return [4 /*yield*/, axios_1["default"].get(getIDURL, { params: { id: id } })];
                case 11:
                    recipeList = _a.sent();
                    console.log("Recipe List by ID:");
                    console.log(recipeList.data);
                    return [3 /*break*/, 13];
                case 12:
                    error_7 = _a.sent();
                    console.log("Error getting recipes from recipe microservice");
                    throw error_7;
                case 13:
                    _a.trys.push([13, 15, , 16]);
                    getNameURL = url + '/api/recipes/get_recipes_by_name';
                    return [4 /*yield*/, axios_1["default"].get(getNameURL, { params: { name: "burger" } })];
                case 14:
                    recipeList = _a.sent();
                    console.log("Recipe List by Name:");
                    console.log(recipeList.data);
                    return [3 /*break*/, 16];
                case 15:
                    error_8 = _a.sent();
                    console.log("Error getting recipes from recipe microservice");
                    throw error_8;
                case 16: return [2 /*return*/];
            }
        });
    });
}
// Get Ingredient List- will be all ingredients both necessary and unnecessary from all recipes using get_ingredients_list endpoint (GET request)
function GetIngredients() {
    return __awaiter(this, void 0, void 0, function () {
        var getURL, ingredientList, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getURL = url + '/api/recipes/get_ingredients_list';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get(getURL)];
                case 2:
                    ingredientList = _a.sent();
                    console.log("Full Ingredient List:");
                    console.log(ingredientList.data);
                    return [3 /*break*/, 4];
                case 3:
                    error_9 = _a.sent();
                    console.log("Error getting ingredients from recipe microservice");
                    throw error_9;
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Filter Recipe Examples using the filter_recipes endpoint (POST request)
function filterRecipes() {
    return __awaiter(this, void 0, void 0, function () {
        var filterURL, filterJSON, recipeList, error_10, recipeList, error_11, recipeList, error_12, recipeList, error_13, recipeList, error_14, recipeList, error_15, recipeList, error_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filterURL = url + '/api/recipes/filter_recipes';
                    filterJSON = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    filterJSON.filter_category = ["vegetarian"];
                    filterJSON.filter_meal_type = ["lunch", "snack"];
                    return [4 /*yield*/, axios_1["default"].post(filterURL, filterJSON)];
                case 2:
                    recipeList = _a.sent();
                    console.log("Filtered recipes that are vegetarian, and that are either lunch and/or snack meals:");
                    console.log(recipeList.data);
                    return [3 /*break*/, 4];
                case 3:
                    error_10 = _a.sent();
                    console.log("Error getting filtered recipes from recipe microservice");
                    throw error_10;
                case 4:
                    filterJSON = {};
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    filterJSON.filter_category = ["vegetarian", "low_calories"];
                    filterJSON.filter_meal_type = ["lunch", "snack"];
                    return [4 /*yield*/, axios_1["default"].post(filterURL, filterJSON)];
                case 6:
                    recipeList = _a.sent();
                    console.log("Filtered recipes that are vegetarian and low calories, and that are either lunch and/or snack meals:");
                    console.log(recipeList.data);
                    return [3 /*break*/, 8];
                case 7:
                    error_11 = _a.sent();
                    console.log("Error getting filtered recipes from recipe microservice");
                    throw error_11;
                case 8:
                    filterJSON = {};
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 11, , 12]);
                    filterJSON.filter_ingredient_contains = ["bread crumbs", "macaroni"];
                    return [4 /*yield*/, axios_1["default"].post(filterURL, filterJSON)];
                case 10:
                    recipeList = _a.sent();
                    console.log("Filtered recipes that have ingredient lists and/or ingredient extra lists that contain bread crumbs and/or macaroni:");
                    console.log(recipeList.data);
                    return [3 /*break*/, 12];
                case 11:
                    error_12 = _a.sent();
                    console.log("Error getting filtered recipes from recipe microservice");
                    throw error_12;
                case 12:
                    filterJSON = {};
                    _a.label = 13;
                case 13:
                    _a.trys.push([13, 15, , 16]);
                    filterJSON.filter_ingredient_only = ["macaroni", "cheddar cheese", "parmesan cheese", "milk", "butter", "flour", "bread crumbs", "honey", "almonds"];
                    return [4 /*yield*/, axios_1["default"].post(filterURL, filterJSON)];
                case 14:
                    recipeList = _a.sent();
                    console.log('Filtered recipes that have ingredient lists with ALL ingredients in list: ["macaroni", "cheddar cheese", "parmesan cheese", "milk", "butter", "flour", "bread crumbs", "honey", "almonds"]');
                    console.log(recipeList.data);
                    return [3 /*break*/, 16];
                case 15:
                    error_13 = _a.sent();
                    console.log("Error getting filtered recipes from recipe microservice");
                    throw error_13;
                case 16:
                    filterJSON = {};
                    _a.label = 17;
                case 17:
                    _a.trys.push([17, 19, , 20]);
                    filterJSON.filter_ingredient_only = ["macaroni", "cheddar cheese", "parmesan cheese", "milk"];
                    return [4 /*yield*/, axios_1["default"].post(filterURL, filterJSON)];
                case 18:
                    recipeList = _a.sent();
                    console.log('Filtered recipes that have ingredient lists with ALL ingredients in list: ["macaroni", "cheddar cheese", "parmesan cheese", "milk"]');
                    console.log(recipeList.data);
                    return [3 /*break*/, 20];
                case 19:
                    error_14 = _a.sent();
                    console.log("Error getting filtered recipes from recipe microservice");
                    throw error_14;
                case 20:
                    filterJSON = {};
                    _a.label = 21;
                case 21:
                    _a.trys.push([21, 23, , 24]);
                    filterJSON.filter_ingredient_exclude = ["macaroni", "bread crumbs", "peanuts"];
                    return [4 /*yield*/, axios_1["default"].post(filterURL, filterJSON)];
                case 22:
                    recipeList = _a.sent();
                    console.log('Filtered recipes that do not include macaroni or bread crumbs or peanuts');
                    console.log(recipeList.data);
                    return [3 /*break*/, 24];
                case 23:
                    error_15 = _a.sent();
                    console.log("Error getting filtered recipes from recipe microservice");
                    throw error_15;
                case 24:
                    filterJSON = {};
                    _a.label = 25;
                case 25:
                    _a.trys.push([25, 27, , 28]);
                    filterJSON.filter_category = ["vegetarian"];
                    filterJSON.filter_ingredient_exclude = ["almonds"];
                    filterJSON.filter_ingredient_contains = ["bread crumbs", "macaroni"];
                    filterJSON.filter_meal_type = ["dinner", "breakfast"];
                    return [4 /*yield*/, axios_1["default"].post(filterURL, filterJSON)];
                case 26:
                    recipeList = _a.sent();
                    console.log('Filtered recipes that are vegetarian, that do not include almonds, that includes bread crumbs and/or macaroni, and that is a dinner or breakfast meal');
                    console.log(recipeList.data);
                    return [3 /*break*/, 28];
                case 27:
                    error_16 = _a.sent();
                    console.log("Error getting filtered recipes from recipe microservice");
                    throw error_16;
                case 28: return [2 /*return*/];
            }
        });
    });
}
// Update Recipe (by id or name) Examples
function updateRecipes(id) {
    return __awaiter(this, void 0, void 0, function () {
        var updateBlackBeanBurger, recipeUpdateJSON, updateIDURL, recipeList, error_17, updateNameURL, recipeList, error_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateBlackBeanBurger = {};
                    // Update the black bean burger name
                    updateBlackBeanBurger.name = 'Veggie Black Bean Burger';
                    // Update the black bean burger description 
                    updateBlackBeanBurger.description = "This black bean burger is delicious and vegatarian friendly!";
                    // Update the black bean burger prep time 
                    updateBlackBeanBurger.prep_time = 20;
                    // Update the black bean burger cook time 
                    updateBlackBeanBurger.cook_time = 30;
                    // Update the black bean burger servings 
                    updateBlackBeanBurger.servings = 5;
                    // Update the black bean burger yield amount 
                    updateBlackBeanBurger.yield_amount = 5;
                    // Update the black bean burger yield unit 
                    updateBlackBeanBurger.yield_unit = 'burgers';
                    // Update the black bean burger calories 
                    updateBlackBeanBurger.calories = 250;
                    // Update the black bean burger dish type 
                    updateBlackBeanBurger.dish_type = 'meat';
                    // Update the black bean burger meal type from both lunch and dinner to dinner and appetizer- 
                    // must include all the meal types you want to be true, even if they previously were set to true
                    updateBlackBeanBurger.meal_type = ["dinner", "appetizer"];
                    // Update the black bean burger categories to include vegan as well as what it already contained
                    // must include all the dietary categories you want to be true, even if they previously were set to true
                    updateBlackBeanBurger.dietary_categories = ['vegetarian', 'healthy', 'low_calories', 'vegan'];
                    // Update the black bean burger recipe steps to include an extra step at the end- you must provide all recipe steps with new one added, not just the new one
                    updateBlackBeanBurger.recipe_steps = [
                        "If grilling, preheat an outdoor grill for high heat, and lightly oil a sheet of aluminum foil. If baking, preheat oven to 375 degrees F (190 degrees C), and lightly oil a baking sheet.",
                        "In a medium bowl, mash black beans with a fork until thick and pasty.",
                        "In a food processor, finely chop bell pepper, onion, and garlic. Then stir into mashed beans.",
                        "In a small bowl, stir together egg, chili powder, cumin, and chili sauce.",
                        "Stir the egg mixture into the mashed beans. Mix in bread crumbs until the mixture is sticky and holds together. Divide mixture into four patties.",
                        "If grilling, place patties on foil, and grill about 8 minutes on each side. If baking, place patties on baking sheet, and bake about 10 minutes on each side.",
                        "Serve with lettuce and tomatoes on a burger roll"
                    ];
                    // Update the black bean burger ingredients list to change the black beans measurement to 25
                    // Must include the previous entire ingredient list with updates included
                    updateBlackBeanBurger.ingredients = [
                        { "ingredient_name": "black beans", "measurement_amount": 25, "measurement_unit": "ounces", "ingredient_type": "legumes" },
                        { "ingredient_name": "green bell pepper", "measurement_amount": 0.5, "measurement_unit": "pepper", "ingredient_type": "fruit" },
                        { "ingredient_name": "onion", "measurement_amount": 1, "measurement_unit": "onion", "ingredient_type": "vegetable" },
                        { "ingredient_name": "garlic", "measurement_amount": 3, "measurement_unit": "cloves", "ingredient_type": "vegetable" },
                        { "ingredient_name": "egg", "measurement_amount": 1, "measurement_unit": "egg", "ingredient_type": "protein" },
                        { "ingredient_name": "chili powder", "measurement_amount": 1, "measurement_unit": "tablespoon", "ingredient_type": "spice" },
                        { "ingredient_name": "cumin", "measurement_amount": 1, "measurement_unit": "tablespoons", "ingredient_type": "spice" },
                        { "ingredient_name": "chili sauce", "measurement_amount": 1, "measurement_unit": "teaspoon", "ingredient_type": "sauce" },
                        { "ingredient_name": "bread crumbs", "measurement_amount": 0.5, "measurement_unit": "cups", "ingredient_type": "grain" }
                    ];
                    // Update the black bean burger ingredients extra list to add a new ingredient
                    // Must include the previous entire ingredient extra list with updates included
                    updateBlackBeanBurger.ingredients_extra = [
                        { "ingredient_name": "salt", "measurement_amount": 0.5, "measurement_unit": "teaspoons", "ingredient_type": "seasoning" },
                        { "ingredient_name": "pepper", "measurement_amount": 0.5, "measurement_unit": "teaspoons", "ingredient_type": "seasoning" }
                    ];
                    recipeUpdateJSON = {};
                    // Set the id of the recipe you want to update
                    recipeUpdateJSON.id = id;
                    // Set the update field equal to the updated recipe
                    recipeUpdateJSON.updates = updateBlackBeanBurger;
                    updateIDURL = url + '/api/recipes/update_recipe_by_id';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].put(updateIDURL, recipeUpdateJSON)];
                case 2:
                    recipeList = _a.sent();
                    console.log('Update black bean burger by ID response:');
                    console.log(recipeList.data);
                    return [3 /*break*/, 4];
                case 3:
                    error_17 = _a.sent();
                    console.log("Error updating recipe in recipe microservice");
                    throw error_17;
                case 4:
                    // Update by Name
                    updateBlackBeanBurger = {};
                    // Below only included a few fields we wish to update, fields that are not included are not affected
                    // Update the black bean burger name
                    updateBlackBeanBurger.name = 'Black Bean Veggie Burger Homemade';
                    // Update the black bean burger meal type from both appetizer and dinner to dinner and lunch- 
                    // must include all the meal types you want to be true, even if they previously were set to true
                    updateBlackBeanBurger.meal_type = ["dinner", "lunch"];
                    // Update the black bean burger categories to get rid of vegan, and keep what it already contained
                    // must include all the dietary categories you want to be true, even if they previously were set to true
                    updateBlackBeanBurger.dietary_categories = ['vegetarian', 'healthy', 'low_calories'];
                    // Update the black bean burger ingredients extra list to add a new ingredient
                    // Must include the previous entire ingredient extra list with updates included
                    updateBlackBeanBurger.ingredients_extra = [
                        { "ingredient_name": "pepper", "measurement_amount": 0.5, "measurement_unit": "teaspoons", "ingredient_type": "seasoning" },
                        { "ingredient_name": "garlic", "measurement_amount": 0.5, "measurement_unit": "teaspoons", "ingredient_type": "seasoning" }
                    ];
                    // Create Update JSON that is sent to the update endpoint
                    recipeUpdateJSON = {};
                    // Set the name of the recipe you want to update
                    recipeUpdateJSON.name = 'Veggie Black Bean Burger';
                    // Set the update field equal to the updated recipe
                    recipeUpdateJSON.updates = updateBlackBeanBurger;
                    updateNameURL = url + '/api/recipes/update_recipe_by_name';
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, axios_1["default"].put(updateNameURL, recipeUpdateJSON)];
                case 6:
                    recipeList = _a.sent();
                    console.log('Update black bean burger by name response:');
                    console.log(recipeList.data);
                    return [3 /*break*/, 8];
                case 7:
                    error_18 = _a.sent();
                    console.log("Error updating recipe in recipe microservice");
                    throw error_18;
                case 8: return [2 /*return*/];
            }
        });
    });
}
// Delete Recipe (by id or name)
function deleteRecipes(recipeIDArr) {
    return __awaiter(this, void 0, void 0, function () {
        var deleteIDURL, i, response, error_19, deleteNameURL, response, error_20;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    deleteIDURL = url + '/api/recipes/delete_recipe_by_id';
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < recipeIDArr.length - 1)) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, axios_1["default"]["delete"](deleteIDURL, { params: { id: recipeIDArr[i] } })];
                case 3:
                    response = _a.sent();
                    console.log('Delete Response for ID: ' + recipeIDArr[i]);
                    console.log(response.data);
                    return [3 /*break*/, 5];
                case 4:
                    error_19 = _a.sent();
                    console.log("Error deleting recipe from recipe microservice");
                    throw error_19;
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6:
                    deleteNameURL = url + '/api/recipes/delete_recipe_by_name';
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, axios_1["default"]["delete"](deleteNameURL, { params: { name: 'Homemade Mac and Cheese' } })];
                case 8:
                    response = _a.sent();
                    console.log('Delete Response for Name Homemade Mac and Cheese:');
                    console.log(response.data);
                    return [3 /*break*/, 10];
                case 9:
                    error_20 = _a.sent();
                    console.log("Error deleting recipe from recipe microservice");
                    throw error_20;
                case 10: return [2 /*return*/];
            }
        });
    });
}
function runExemplar() {
    return __awaiter(this, void 0, void 0, function () {
        var recipeIDArr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createRecipe()];
                case 1:
                    recipeIDArr = _a.sent();
                    if (recipeIDArr.length <= 0) {
                        throw new Error("Error creating recipes");
                    }
                    return [4 /*yield*/, getRecipes(recipeIDArr[1])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, GetIngredients()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, filterRecipes()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, updateRecipes(recipeIDArr[0])];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, deleteRecipes(recipeIDArr)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
runExemplar();
