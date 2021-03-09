import pgPromise from 'pg-promise';

// Setup initialization parameters for pgp, which tries to connect to a database.
const pgp = pgPromise({
    // This is called whenever something requests a query to the database
    connect(client) {
        console.log('Connected to database:', client.connectionParameters.database);
    },
    // This is called whenever the above query ends
    disconnect(client) {
        console.log('Disconnected from database:', client.connectionParameters.database);
    }
});

const username = 'postgres'; // Change these to the actual username and password for your Database.
const password = 'postgres';

const psqlURL = `postgres://${username}:${password}@localhost/sql_exemplar`;

// Quick and dirty hack to get the return type of a function
type t1 = ReturnType<typeof pgp>;
const db: t1 = pgp(psqlURL);

console.log("Trying to find:", psqlURL);

// Run a query provided to task on the database. TODO Fix the "any" typing on the task function
// Task is a function with a database parameter, which has methods like db.none, db.any, etc. for running SQL queries.
// Example task function: (db) => db.any("Select * from table;")
async function connectAndRun(task: (db: any) => any): Promise<Array<Record<string, unknown>> | null> {
    let connection = null;
    try {
        // Attempt a connection to the database, and upon success, return a promise of task() operating on that connection
        connection = await db.connect();
        return await task(connection);
    } catch (error) {
        console.error('Error in Handling SQL Query');
        console.error(error);
        return null;
    } finally {
        try {
            connection?.done();
        } catch (ignored) {
            console.log(ignored);
        }
    }
}

type ConnectType = ReturnType<typeof connectAndRun>

// EXAMPLE DB RETRIEVALS: 

// Retrieve recipes table from db
export async function getProfiles(): Promise<ConnectType> {
    return await connectAndRun(db => db.any('SELECT * FROM profiles;'));
}

export async function getRecipes(): Promise<ConnectType> {
    return await connectAndRun(db => db.any('SELECT * FROM recipes'));
}

// Retrieve full favorite_recipes table from db
export async function getFavoriteRecipes(): Promise<ConnectType> {
    return await connectAndRun(db => db.any('SELECT * FROM favorite_recipes;'));
}

// Retrieve favorite_recipes belonging to userID from db 
export async function getFavoriteRecipesById(userId: number): Promise<ConnectType> {
    // db.any() and similar methods feeds parameters into the query string in order from the array, referencing their location by $number.
    // So profileID=$1 below means to take the first element of the array supplied in the second parameter and insert it there.
    // Important: array can be longer than the number of asked for terms, so thinks like:
    // db.any('SELECT * FROM profiles WHERE profileID=$1 and email=$2', [userid, email, randomThirdVariable])
    // Will ignore the third variable from array
    return await connectAndRun(db => db.any('SELECT * FROM favorite_recipes WHERE profileID=$1;', [userId]));
}

// EXAMPLE DB INSERTIONS:
// add a user to the profiles table
export async function addUser(email: string, username: string, password: string, salt: string): Promise<ConnectType> {
    return await connectAndRun(db => db.any('INSERT INTO profiles (email, username, hashedpwd, salt) VALUES ($1, $2, $3, $4);', [email, username, password, salt]));

}

// add a recipe to recipe table
export async function addRecipe(name: string, description: string): Promise<ConnectType> {
    return await connectAndRun(db => db.any('INSERT INTO recipes (name, description) VALUES ($1, $2);', [name, description]));

}

export async function addFavoriteRecipe(userId: number, dishId: number): Promise<ConnectType> {
    return await connectAndRun(db => db.any('INSERT INTO favorite_recipes VALUES ($1, $2);', [userId, dishId]));
}

// EXAMPLE DB UPDATES:
// update a recipe's name given its id
export async function updateRecipeById(id: number, name: string, description?: string): Promise<ConnectType> {
    // Description parameter is optional here, and db.none will only use its value if it's asked for in the query string
    const query = description ? 'UPDATE recipes SET name=$2, description=$3 WHERE id=$1' : 'UPDATE recipes SET name=$2 WHERE id=$1';
    return await connectAndRun(db => db.none(query, [id, name, description]));
}

// EXAMPLE DB DELETES:

// delete a recipe given its id
export async function deleteRecipeById(id: number): Promise<ConnectType> {
    return await connectAndRun(db => db.none('DELETE FROM recipes WHERE id=$1;', [id]));
}

// delete a profile given its id
export async function deleteProfileById(id: number): Promise<ConnectType> {
    return await connectAndRun(db => db.none('DELETE FROM profiles WHERE userid=$1;', [id]));
}


// Example database use. Express endpoints can also easily be setup, though there are other exemplars for that.

// Async functions must be executed in an async function
(async () => {
    // View the tables before modification
    const profiles = await getProfiles();
    console.log(JSON.stringify(profiles, null, 2));
    const recipes = await getRecipes();
    console.log(JSON.stringify(recipes, null, 2));
    const favorites = await getFavoriteRecipes();
    console.log(JSON.stringify(favorites, null, 2));
    // Operate on the tables

    // example-email and example-username will violate unique key constraints on a second run
    // Shows error checking works, so left as is.
    if (await addUser('example-email1', 'example-username1', 'password', 'salt')) {
        console.log(JSON.stringify(await getProfiles(), null, 2));
    }
    if (await addRecipe('Mac & Cheese', 'The best kind of food')) {
        console.log(JSON.stringify(await getRecipes(), null, 2));
    }
    if (await updateRecipeById(1, 'This is a new food', 'I love this food')) {
        console.log(JSON.stringify(await getFavoriteRecipesById(1), null, 2)); // Find the recipe you just updated.
    }
    if (await deleteProfileById(4)) { // this is a no Op on a second run, and so won't print.
        console.log(JSON.stringify(await getProfiles(), null, 2)); // Profile with id 4 should now be gone. 
    }


})();