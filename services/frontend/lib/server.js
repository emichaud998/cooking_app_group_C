"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var port = 8070;
app.use(express_1.default.json()); // accept json input for POST and PUT payloads. 
app.use(express_1.default.static('src'));
// Add headers
// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8091');
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     // // Set to true if you need the website to include cookies in the requests sent
//     // // to the API (e.g. in case you use sessions)
//     // res.setHeader('Access-Control-Allow-Credentials', true);
//     // Pass to next layer of middleware
//     next();
// });
app.use(cors_1.default({ origin: '*' }));
// Root Directory unused, just print some syntax requirements
app.get('/', function (req, res) {
    // res.send('Valid endpoints: GET /recipes GET /ingredients DELETE /deleteRecipe POST /addRecipe PUT /updateRecipe');
    res.sendFile('./frontend.html', { 'root': './src' });
});
// Retrieve the list of Recipes
// app.get('/api/recipes/recipes', async (req: Request, res: Response) => {
//     res.redirect('/recipes');
// });
// app.get('/api/recipes/get_recipes', async (req: Request, res: Response) => {
//     try {
//         const sqlObject = await db.getRecipes();
//         // console.log(sqlObject);
//         res.send(JSON.stringify(sqlObject, null, 2));
//     }
//     catch (error) {
//         console.error(error);
//         res.send(error);
//     }
// });
// // Retrieve the list of ingredients
// app.get('/ingredients', async (req: Request, res: Response) => {
//     try {
//         const sqlObject = await db.getRecipeIngredients();
//         // console.log(sqlObject);
//         res.send(JSON.stringify(sqlObject, null, 2));
//     }
//     catch (error) {
//         console.error(error);
//         res.send(error);
//     }
// });
// Deletes recipe from the recipes table, given a recipe's unique id, provided in query as rootURL/deleteRecipe?id=num
// app.delete('/deleteRecipe', async (req: Request, res: Response) => {
//     try {
//         if (req.query.id) {
//             const id = parseInt(req.query.id as string);
//             const sqlObject = await db.deleteRecipeById(id);
//             if (sqlObject === null) {
//                 res.send("Success");
//             } else {
//                 res.send("Failure to Delete");
//             }
//         }
//     } catch (error) {
//         console.error(error);
//         res.send(error);
//     }
// });
// Add a recipe to the recipes table
// POST payload: {"name": string, "desc", string}
// app.post('/addRecipe', async (req: Request, res: Response) => {
//     try {
//         console.log(req.body);
//         const name = req.body['name'];
//         const description = req.body['desc'];
//         const sqlObject = await db.addRecipe(name, description);
//         if (sqlObject === null) {
//             res.send('Succesfully added recipe');
//         } else {
//             res.send('Could not POST recipe');
//         }
//     } catch (error) {
//         console.error(error);
//         res.send(error);
//     }
// });
// Updates a recipe identified by its unique id. Changes name of recipe to provided name, and description to description
// Expected PUT payload {"id": number, "name": string, "desc": optional string}
// If description is left out, it is not modified.
// app.put('/updateRecipe', async (req: Request, res: Response) => {
//     try {
//         console.log(req.body);
//         const id = req.body['id'];
//         const name = req.body['name'];
//         const description = req.body['desc'] ? req.body['desc'] : undefined;
//         const sqlObject = await db.updateRecipeById(id, name, description);
//         if (sqlObject === null) {
//             res.send('Succesfully updated recipe');
//         } else {
//             res.send('Could not POST recipe'); // Error, currently not detecting bad updates
//         }
//     } catch (error) {
//         console.error(error);
//         res.send(error);
//     }
// });
// Server start on port 8080
app.listen(port, function () {
    console.log("App now listening at http://localhost:" + port);
});
//# sourceMappingURL=server.js.map