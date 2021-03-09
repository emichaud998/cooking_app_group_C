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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfileById = exports.deleteRecipeById = exports.updateRecipeById = exports.addFavoriteRecipe = exports.addRecipe = exports.addUser = exports.getFavoriteRecipesById = exports.getFavoriteRecipes = exports.getRecipes = exports.getProfiles = void 0;
var pg_promise_1 = __importDefault(require("pg-promise"));
// Setup initialization parameters for pgp, which tries to connect to a database.
var pgp = pg_promise_1.default({
    // This is called whenever something requests a query to the database
    connect: function (client) {
        console.log('Connected to database:', client.connectionParameters.database);
    },
    // This is called whenever the above query ends
    disconnect: function (client) {
        console.log('Disconnected from database:', client.connectionParameters.database);
    }
});
var username = 'postgres'; // Change these to the actual username and password for your Database.
var password = 'postgres';
var psqlURL = "postgres://" + username + ":" + password + "@localhost/sql_exemplar";
var db = pgp(psqlURL);
console.log("Trying to find:", psqlURL);
// Run a query provided to task on the database. TODO Fix the "any" typing on the task function
// Task is a function with a database parameter, which has methods like db.none, db.any, etc. for running SQL queries.
// Example task function: (db) => db.any("Select * from table;")
function connectAndRun(task) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, db.connect()];
                case 2:
                    // Attempt a connection to the database, and upon success, return a promise of task() operating on that connection
                    connection = _a.sent();
                    return [4 /*yield*/, task(connection)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error in Handling SQL Query');
                    console.error(error_1);
                    return [2 /*return*/, null];
                case 5:
                    try {
                        connection === null || connection === void 0 ? void 0 : connection.done();
                    }
                    catch (ignored) {
                        console.log(ignored);
                    }
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// EXAMPLE DB RETRIEVALS: 
// Retrieve recipes table from db
function getProfiles() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectAndRun(function (db) { return db.any('SELECT * FROM profiles;'); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getProfiles = getProfiles;
function getRecipes() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectAndRun(function (db) { return db.any('SELECT * FROM recipes'); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getRecipes = getRecipes;
// Retrieve full favorite_recipes table from db
function getFavoriteRecipes() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectAndRun(function (db) { return db.any('SELECT * FROM favorite_recipes;'); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getFavoriteRecipes = getFavoriteRecipes;
// Retrieve favorite_recipes belonging to userID from db 
function getFavoriteRecipesById(userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectAndRun(function (db) { return db.any('SELECT * FROM favorite_recipes WHERE profileID=$1;', [userId]); })];
                case 1: 
                // db.any() and similar methods feeds parameters into the query string in order from the array, referencing their location by $number.
                // So profileID=$1 below means to take the first element of the array supplied in the second parameter and insert it there.
                // Important: array can be longer than the number of asked for terms, so thinks like:
                // db.any('SELECT * FROM profiles WHERE profileID=$1 and email=$2', [userid, email, randomThirdVariable])
                // Will ignore the third variable from array
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getFavoriteRecipesById = getFavoriteRecipesById;
// EXAMPLE DB INSERTIONS:
// add a user to the profiles table
function addUser(email, username, password, salt) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectAndRun(function (db) { return db.any('INSERT INTO profiles (email, username, hashedpwd, salt) VALUES ($1, $2, $3, $4);', [email, username, password, salt]); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.addUser = addUser;
// add a recipe to recipe table
function addRecipe(name, description) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectAndRun(function (db) { return db.any('INSERT INTO recipes (name, description) VALUES ($1, $2);', [name, description]); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.addRecipe = addRecipe;
function addFavoriteRecipe(userId, dishId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectAndRun(function (db) { return db.any('INSERT INTO favorite_recipes VALUES ($1, $2);', [userId, dishId]); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.addFavoriteRecipe = addFavoriteRecipe;
// EXAMPLE DB UPDATES:
// update a recipe's name given its id
function updateRecipeById(id, name, description) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = description ? 'UPDATE recipes SET name=$2, description=$3 WHERE id=$1' : 'UPDATE recipes SET name=$2 WHERE id=$1';
                    return [4 /*yield*/, connectAndRun(function (db) { return db.none(query, [id, name, description]); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.updateRecipeById = updateRecipeById;
// EXAMPLE DB DELETES:
// delete a recipe given its id
function deleteRecipeById(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectAndRun(function (db) { return db.none('DELETE FROM recipes WHERE id=$1;', [id]); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deleteRecipeById = deleteRecipeById;
// delete a profile given its id
function deleteProfileById(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connectAndRun(function (db) { return db.none('DELETE FROM profiles WHERE userid=$1;', [id]); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deleteProfileById = deleteProfileById;
// Example database use. Express endpoints can also easily be setup, though there are other exemplars for that.
// Async functions must be executed in an async function
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var profiles, recipes, favorites, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    return __generator(this, function (_s) {
        switch (_s.label) {
            case 0: return [4 /*yield*/, getProfiles()];
            case 1:
                profiles = _s.sent();
                console.log(JSON.stringify(profiles, null, 2));
                return [4 /*yield*/, getRecipes()];
            case 2:
                recipes = _s.sent();
                console.log(JSON.stringify(recipes, null, 2));
                return [4 /*yield*/, getFavoriteRecipes()];
            case 3:
                favorites = _s.sent();
                console.log(JSON.stringify(favorites, null, 2));
                return [4 /*yield*/, addUser('example-email1', 'example-username1', 'password', 'salt')];
            case 4:
                if (!_s.sent()) return [3 /*break*/, 6];
                _b = (_a = console).log;
                _d = (_c = JSON).stringify;
                return [4 /*yield*/, getProfiles()];
            case 5:
                _b.apply(_a, [_d.apply(_c, [_s.sent(), null, 2])]);
                _s.label = 6;
            case 6: return [4 /*yield*/, addRecipe('Mac & Cheese', 'The best kind of food')];
            case 7:
                if (!_s.sent()) return [3 /*break*/, 9];
                _f = (_e = console).log;
                _h = (_g = JSON).stringify;
                return [4 /*yield*/, getRecipes()];
            case 8:
                _f.apply(_e, [_h.apply(_g, [_s.sent(), null, 2])]);
                _s.label = 9;
            case 9: return [4 /*yield*/, updateRecipeById(1, 'This is a new food', 'I love this food')];
            case 10:
                if (!_s.sent()) return [3 /*break*/, 12];
                _k = (_j = console).log;
                _m = (_l = JSON).stringify;
                return [4 /*yield*/, getFavoriteRecipesById(1)];
            case 11:
                _k.apply(_j, [_m.apply(_l, [_s.sent(), null, 2])]); // Find the recipe you just updated.
                _s.label = 12;
            case 12: return [4 /*yield*/, deleteProfileById(4)];
            case 13:
                if (!_s.sent()) return [3 /*break*/, 15];
                _p = (_o = console).log;
                _r = (_q = JSON).stringify;
                return [4 /*yield*/, getProfiles()];
            case 14:
                _p.apply(_o, [_r.apply(_q, [_s.sent(), null, 2])]); // Profile with id 4 should now be gone. 
                _s.label = 15;
            case 15: return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=dbManagement.js.map