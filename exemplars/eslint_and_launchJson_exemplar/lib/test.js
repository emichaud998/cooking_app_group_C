"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var express_1 = __importDefault(require("express"));
var db = __importStar(require("./dbManagement"));
var app = express_1.default();
var port = 8080;
app.use(express_1.default.json()); // accept json input for POST and PUT payloads. 
// Root Directory unused, just print some syntax requirements
app.get('/', function (req, res) {
    res.send('Valid endpoints: GET /recipes GET /ingredients DELETE /deleteRecipe POST /addRecipe PUT /updateRecipe');
});
// Retrieve the list of Recipes
app.get('/recipes', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlObject, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.getRecipes()];
            case 1:
                sqlObject = _a.sent();
                // console.log(sqlObject);
                res.send(JSON.stringify(sqlObject, null, 2));
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.send(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Retrieve the list of ingredients
app.get('/ingredients', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sqlObject, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.getRecipeIngredients()];
            case 1:
                sqlObject = _a.sent();
                // console.log(sqlObject);
                res.send(JSON.stringify(sqlObject, null, 2));
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.send(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Deletes recipe from the recipes table, given a recipe's unique id, provided in query as rootURL/deleteRecipe?id=num
app.delete('/deleteRecipe', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, sqlObject, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                if (!req.query.id) return [3 /*break*/, 2];
                id = parseInt(req.query.id);
                return [4 /*yield*/, db.deleteRecipeById(id)];
            case 1:
                sqlObject = _a.sent();
                if (sqlObject === null) {
                    res.send("Success");
                }
                else {
                    res.send("Failure to Delete");
                }
                _a.label = 2;
            case 2: return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error(error_3);
                res.send(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Add a recipe to the recipes table
// POST payload: {"name": string, "desc", string}
app.post('/addRecipe', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, description, sqlObject, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log(req.body);
                name_1 = req.body['name'];
                description = req.body['desc'];
                return [4 /*yield*/, db.addRecipe(name_1, description)];
            case 1:
                sqlObject = _a.sent();
                if (sqlObject === null) {
                    res.send('Succesfully added recipe');
                }
                else {
                    res.send('Could not POST recipe');
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res.send(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Updates a recipe identified by its unique id. Changes name of recipe to provided name, and description to description
// Expected PUT payload {"id": number, "name": string, "desc": optional string}
// If description is left out, it is not modified.
app.put('/updateRecipe', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, name_2, description, sqlObject, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log(req.body);
                id = req.body['id'];
                name_2 = req.body['name'];
                description = req.body['desc'] ? req.body['desc'] : undefined;
                return [4 /*yield*/, db.updateRecipeById(id, name_2, description)];
            case 1:
                sqlObject = _a.sent();
                if (sqlObject === null) {
                    res.send('Succesfully updated recipe');
                }
                else {
                    res.send('Could not POST recipe'); // Error, currently not detecting bad updates
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.send(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Server start on port 8080
app.listen(port, function () {
    console.log("App now listening at http://localhost:" + port);
});
//# sourceMappingURL=test.js.map