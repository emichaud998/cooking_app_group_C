import express = require('express');
const app = express();
app.use(express.json());

// Application set up to listen at http://localhost:8080
const port:number = 8080;
app.listen(port, async () => {
    console.log(`App listening at http://localhost:${port}`)

})

interface sampleRecipe {
    name: string,
    servings: number, 
    calories: number,
    ingredients: string[]
}

// All of these endpoints accept parameters passed in as JSON through body

// CREATE a recipe entry possibly to be stored in database (example just sends created recipe back)
app.post('/recipe/post', async function(req:express.Request, res:express.Response) {
    let recipe = {} as sampleRecipe

    // Grab recipe data from request that will be used to create new recipe
    
    // A new recipe might need to have an associated name, send back status code 400 if params not satisfied
    if (req.body.name !== undefined) {
        recipe.name = req.body.name;
    } else {
        res.status(400).json({"Result": "Recipe name must be defined to add a new recipe entry"});
    }

    if (req.body.servings !== undefined) {
        recipe.servings = parseInt(req.body.servings)
    }

    if (req.body.calories !== undefined) {
        recipe.calories = parseInt(req.body.calories);
    }

    if (req.body.ingredients !== undefined) {
        recipe.ingredients = <string []> req.body.ingredients;
    }

    // Here you would call function to add new recipe to the database and set success based on if db operation was successful
    let success = true;

    if (success) {
        res.status(200).json({"Result": "Success: Created new recipe entry!", "Recipe": recipe});
    } else {
        res.status(400).json({"Result": "Fail: Error adding new recipe to DB."});
    }
})

// GET a recipe entry in database
app.get('/recipe/get', async function(req:express.Request, res:express.Response) {
    let success = false;
    let recipe = {} as sampleRecipe;

    // Grab recipe id identifier or recipe name identifier to get and return that recipe from DB 
    if (req.body.id !== undefined) {
        // Here you would call function to grab recipe from the database using id and set success accordingly 
        success = true;
    } else if (req.body.name !== undefined) {
        // Here you would call function to grab recipe from the database using name and set success accordingly 
        success = true;
    }

    if (success) {
        res.status(200).json({"Result": recipe});
    } else {
        res.status(400).json({"Result": "Fail: Error getting recipe from DB"});
    }

})

// UPDATE a recipe entry in database (for example just return the new recipe)
app.put('/recipe/update', async function(req:express.Request, res:express.Response) {
    let success = false;
    let newRecipe= {} as sampleRecipe;
    
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
        newRecipe.ingredients = <string []> req.body.newIngredients;
    }

    // Get recipe identifier (id or name) and update recipe using that identifier in DB
    if (req.body.id !== undefined) {
        // Here you would call function to update recipe associated with the passed in recipe id and update success accordingly
        success = true;
    } else if (req.body.name !== undefined) {
        // Here you would call function to update recipe associated with the passed in recipe name and update success accordingly
        success = true;
    }

    if (success) {
        res.status(200).json({"Result": "Success: Updated recipe from DB (if it existed)", "Recipe": newRecipe});
    } else {
        res.status(400).json({"Result": "Fail: Error updating recipe from DB"});
    }
})

// DELETE a recipe entry in database
app.delete('/recipe/delete', async function(req:express.Request, res:express.Response) {
    let success = false;
    if (req.body.id !== undefined) {
        // Here you would call function to delete recipe associated with the passed in id, and set success accordingly 
        success = true;
    } else if (req.body.name !== undefined) {
         // Here you would call function to delete recipe associated with the passed in name, and set success accordingly 
        success = true;
    }

    if (success) {
        res.status(200).json({"Result": "Success: Deleted recipe from DB (if it existed)"});
    } else {
        res.status(400).json({"Result": "Fail: Error deleting recipe from DB"});
    }
})