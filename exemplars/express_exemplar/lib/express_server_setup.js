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
var express = require("express");
var app = express();
app.use(express.json());
// Application set up to listen at http://localhost:8080
var port = 8080;
app.listen(port, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("App listening at http://localhost:" + port);
        return [2 /*return*/];
    });
}); });
// All of these endpoints accept parameters passed in as JSON through body
// CREATE a recipe entry possibly to be stored in database (example just sends created recipe back)
app.post('/recipe/post', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var recipe, success;
        return __generator(this, function (_a) {
            recipe = {};
            // Grab recipe data from request that will be used to create new recipe
            // A new recipe might need to have an associated name, send back status code 400 if params not satisfied
            if (req.body.name !== undefined) {
                recipe.name = req.body.name;
            }
            else {
                res.status(400).json({ "Result": "Recipe name must be defined to add a new recipe entry" });
            }
            if (req.body.servings !== undefined) {
                recipe.servings = parseInt(req.body.servings);
            }
            if (req.body.calories !== undefined) {
                recipe.calories = parseInt(req.body.calories);
            }
            if (req.body.ingredients !== undefined) {
                recipe.ingredients = req.body.ingredients;
            }
            success = true;
            if (success) {
                res.status(200).json({ "Result": "Success: Created new recipe entry!", "Recipe": recipe });
            }
            else {
                res.status(400).json({ "Result": "Fail: Error adding new recipe to DB." });
            }
            return [2 /*return*/];
        });
    });
});
// GET a recipe entry in database
app.get('/recipe/get', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var success, recipe;
        return __generator(this, function (_a) {
            success = false;
            recipe = {};
            // Grab recipe id identifier or recipe name identifier to get and return that recipe from DB 
            if (req.body.id !== undefined) {
                // Here you would call function to grab recipe from the database using id and set success accordingly 
                success = true;
            }
            else if (req.body.name !== undefined) {
                // Here you would call function to grab recipe from the database using name and set success accordingly 
                success = true;
            }
            if (success) {
                res.status(200).json({ "Result": recipe });
            }
            else {
                res.status(400).json({ "Result": "Fail: Error getting recipe from DB" });
            }
            return [2 /*return*/];
        });
    });
});
// UPDATE a recipe entry in database (for example just return the new recipe)
app.put('/recipe/update', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var success, newRecipe;
        return __generator(this, function (_a) {
            success = false;
            newRecipe = {};
            // Get all new update information
            if (req.body.newName !== undefined) {
                newRecipe.name = req.body.newName;
            }
            if (req.body.newServings !== undefined) {
                newRecipe.servings = parseInt(req.body.newServings);
            }
            if (req.body.newCalories !== undefined) {
                newRecipe.calories = parseInt(req.body.newCalories);
            }
            if (req.body.newIngredients !== undefined) {
                newRecipe.ingredients = req.body.newIngredients;
            }
            // Get recipe identifier (id or name) and update recipe using that identifier in DB
            if (req.body.id !== undefined) {
                // Here you would call function to update recipe associated with the passed in recipe id and update success accordingly
                success = true;
            }
            else if (req.body.name !== undefined) {
                // Here you would call function to update recipe associated with the passed in recipe name and update success accordingly
                success = true;
            }
            if (success) {
                res.status(200).json({ "Result": "Success: Updated recipe from DB (if it existed)", "Recipe": newRecipe });
            }
            else {
                res.status(400).json({ "Result": "Fail: Error updating recipe from DB" });
            }
            return [2 /*return*/];
        });
    });
});
// DELETE a recipe entry in database
app["delete"]('/recipe/delete', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var success;
        return __generator(this, function (_a) {
            success = false;
            if (req.body.id !== undefined) {
                // Here you would call function to delete recipe associated with the passed in id, and set success accordingly 
                success = true;
            }
            else if (req.body.name !== undefined) {
                // Here you would call function to delete recipe associated with the passed in name, and set success accordingly 
                success = true;
            }
            if (success) {
                res.status(200).json({ "Result": "Success: Deleted recipe from DB (if it existed)" });
            }
            else {
                res.status(400).json({ "Result": "Fail: Error deleting recipe from DB" });
            }
            return [2 /*return*/];
        });
    });
});
