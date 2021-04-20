// Removes all children nodes on a given parent. Used to delete a displayed postgres table before redisplaying it
async function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


// List all recipes on the html page, after retreiving data from the recipes table in the database
async function listRecipes(fetchPath) {
    const recipeRequest = await fetch(fetchPath);
    const recipeData = recipeRequest.ok ? await recipeRequest.json() : [];
    // console.log(recipeData)
    const parentNode = document.getElementById('recipe-table');
    await removeAllChildNodes(parentNode);

    for (const recipe of recipeData.recipes) {

        // Create a div for the part
        const main = document.createElement('div');
        main.className = 'card mb-2';
        main.style.width = '100%';

        const body = document.createElement('div');
        body.className = 'card-body';

        // Recipe data
        const recipeTuple = document.createElement('p');
        recipeTuple.className = 'card-text';
        // Append the POSTGRES tuple to the dom element
        recipeTuple.innerText = JSON.stringify(recipe);


        body.appendChild(recipeTuple);

        main.appendChild(body);
        parentNode.appendChild(main);
    }


}

// Wrapper for listRecipes on the /recipes endpoint
async function getRecipes() {
    await listRecipes('http://localhost:8091/api/recipes/get_recipes');
}

// Insert a recipe into the database, after retrieving data from the dom.
// Expects name and desc values on the HTML page to be nonempty
async function postRecipes() {
    const name = document.getElementById('recipeNameInsert').value;
    const desc = document.getElementById('recipeDescInsert').value;
    console.log(name, desc);
    if (name && desc) {
        await fetch('/addRecipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': name,
                'desc': desc
            })
        });
        console.log('success');
    } else {
        console.log('Empty inputs for POST');
    }
}

// Same as postRecipes, but updates a table instead after also being supplied id from DOM
async function putRecipes() {
    const id = document.getElementById('recipeIdPut').value;
    const name = document.getElementById('recipeNamePut').value;
    const desc = document.getElementById('recipeDescPut').value;
    console.log(id, name, desc);
    if (id && name && desc) {
        await fetch('/updateRecipe', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'id': parseInt(id),
                'name': name,
                'desc': desc
            })
        });
        console.log('success');
    } else {
        console.log('Empty inputs for PUT');
    }
}

// Delete a recipe from table given a recipe id
async function deleteRecipes() {
    const id = document.getElementById('recipeIdDelete').value;
    console.log(id);
    if (id) {
        await fetch(`/deleteRecipe?id=${id}`, {
            method: 'DELETE'
        });
        console.log('success');
    } else {
        console.log('Empty inputs for DELETE');
    }
}

// Add listeners
window.addEventListener('load', async function () {
    const postButton = document.getElementById('recipeInsertBtn');
    const putButton = document.getElementById('recipeUpdateBtn');
    const deleteButton = document.getElementById('recipeDeleteBtn');
    const getButton = document.getElementById('recipeGetBtn');
    getButton.addEventListener('click', getRecipes);
    postButton.addEventListener('click', postRecipes);
    putButton.addEventListener('click', putRecipes);
    deleteButton.addEventListener('click', deleteRecipes);
});