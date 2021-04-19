/* eslint-disable consistent-return */
import express from "express";
import mongoose from "mongoose";
import { GetShoppingListByID, GetShoppingListsByUserID, AddIngredientToList, DeleteIngredientFromList, CreateNewShoppingList, UpdateShoppingListIngredient, DeleteShoppingList } from "./crudOperations";
import { updateCommands, IIngredientsList, ShoppingListAddIngredient, ShoppingListUpdateIngredient } from "./models/shoppingListModels";

const app = express();
app.use(express.json());
const PORT = process.env.SHOPPING_LIST_API_PORT || 8095;

// Connect to mongodb database
//const uri = `mongodb://localhost/ShoppingLists`;
const uri = `mongodb://shopping_list_mongodb_1:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;

mongoose.connect(uri, {
  user: `${process.env.MONGO_INITDB_USERNAME}`,
  pass: `${process.env.MONGO_INITDB_PASSWORD}`,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "[server] connection error:"));

db.once("open", () => {
  console.log("[server] database connected!");

  // Create a new shopping list with a shopping list name for a given user in the DB
  app.post("/api/shoppinglist/create_shopping_list", async (req, res) => {
    if (!req.body.user_id) {
      res.status(400);
      return res.json({ error: "Missing 'user_id' field" });
    }
    if (!req.body.shopping_list_name) {
      res.status(400);
      return res.json({ error: "Missing 'shopping_list_name' field" });
    }
    const user_id = String(req.body.user_id);
    const shopping_list_name = String(req.body.shopping_list_name);

    try {
      const shoppingList = await CreateNewShoppingList({user_id, shopping_list_name});
      res.json({ message: "Created new shopping list for user",  shoppingList: shoppingList});
    } catch (error: any) {
      res.status(500);
      res.json({ error: "Internal server error" });
    }
  });

  // Returns all shopping lists for a given user by their user_id from the DB
  app.get("/api/shoppinglist/get_shopping_lists_by_userid", async (req, res) => {
    if (!req.query.user_id) {
      res.status(400);
      return res.json({ error: "Missing 'user_id' field" });
    }
    const user_id = String(req.query.user_id);
    try {
      const shoppingList = await GetShoppingListsByUserID({user_id});
      if (shoppingList) {
        res.json({ count: shoppingList.length, shoppingList: shoppingList });
      } else {
        res.json({ count: 0, shoppingLists: shoppingList });
      }
    } catch (error: any) {
      res.status(500);
      res.json({ error: "Internal server error" });
    }
  });

  // Returns a shopping list with shopping list ID for a given user from DB
  app.get("/api/shoppinglist/get_shopping_list_by_id", async (req, res) => {
    if (!req.query.id) {
      res.status(400);
      return res.json({ error: "Missing 'id' field" });
    }
    if (!req.query.user_id) {
      res.status(400);
      return res.json({ error: "Missing 'user_id' field" });
    }
    const id = String(req.query.id);
    const user_id = String(req.query.user_id);

    try {
      const shoppingList = await GetShoppingListByID({id, user_id});
      if (shoppingList) {
        res.json({ count: shoppingList.ingredient_list.length, shoppingList: shoppingList });
      } else {
        res.json({ count: 0, shoppingList: shoppingList });
      }
    } catch (error: any) {
      res.status(500);
      res.json({ error: "Internal server error" });
    }
  });

  // Adds a new ingredient entry to a user's shopping list given specific shopping list ID
  app.post("/api/shoppinglist/add_to_shopping_list", async (req, res) => {
    if (!req.body.id) {
      res.status(400);
      return res.json({ error: "Missing 'id' field" });
    }
    if (!req.body.user_id) {
      res.status(400);
      return res.json({ error: "Missing 'user_id' field" });
    }
    if (!req.body.ingredient_name) {
      res.status(400);
      return res.json({ error: "Missing 'ingredient_name' field" });
    }
    const id = String(req.body.id);
    const user_id = String(req.body.user_id);
    const ingredientAdd = formatAddIngredientToList(req.body);
    try {
      const shoppingList = await AddIngredientToList(id, user_id, ingredientAdd);
      if (shoppingList) {
        res.json({ count: shoppingList.ingredient_list.length, shoppingList: shoppingList });
      } else {
        res.json({ count: 0, shoppingList: shoppingList });
      }
    } catch (error: any) {
      res.status(500);
      res.json({ error: "Internal server error" });
    }
  });

  // Deletes an ingredient entry given ingredient ID from a user's shopping list given specific shopping list ID
  app.delete("/api/shoppinglist/delete_from_shopping_list", async (req, res) => {
    if (!req.query.id) {
      res.status(400);
      return res.json({ error: "Missing 'id' field" });
    }
    if (!req.query.user_id) {
      res.status(400);
      return res.json({ error: "Missing 'user_id' field" });
    }
    if (!req.query.ingredient_id) {
      res.status(400);
      return res.json({ error: "Missing 'ingredient_id' field" });
    }
    const id = String(req.query.id);
    const user_id = String(req.query.user_id);
    const ingredient_id = String(req.query.ingredient_id);
    try {
      const shoppingList = await DeleteIngredientFromList({id, user_id, ingredient_id});
      if (shoppingList) {
        res.json({ count: shoppingList.ingredient_list.length, shoppingList: shoppingList });
      } else {
        res.json({ count: 0, shoppingList: shoppingList });
      }
    } catch (error: any) {
      res.status(500);
      res.json({ error: "Internal server error" });
    }
  });

  // Deletes one of user's shopping list given shopping list ID
  app.delete("/api/shoppinglist/delete_shopping_list", async (req, res) => {
    if (!req.query.id) {
      res.status(400);
      return res.json({ error: "Missing 'id' field" });
    }
    if (!req.query.user_id) {
      res.status(400);
      return res.json({ error: "Missing 'user_id' field" });
    }
    const id = String(req.query.id);
    const user_id = String(req.query.user_id);

    try {
      await DeleteShoppingList({id, user_id});
        res.json({ message: "Successfully Deleted Shopping List"});
    } catch (error: any) {
      res.status(500);
      res.json({ error: "Internal server error" });
    }
  });

  // Updates an ingredient in a user's a shopping list given shopping list ID
  app.put("/api/shoppinglist/update_shopping_list_ingredient", async (req, res) => {
    if (!req.body.id) {
      res.status(400);
      return res.json({ error: "Missing 'id' field" });
    }
    if (!req.body.user_id) {
      res.status(400);
      return res.json({ error: "Missing 'user_id' field" });
    }
    if (!req.body.ingredient_id) {
      res.status(400);
      return res.json({ error: "Missing 'ingredient_id' field" });
    }
    const id = String(req.body.id);
    const user_id = String(req.body.user_id);
    const ingredient_id = String(req.body.ingredient_id);
    const filterQuery = createUpdateQuery(req.body);
    try {
      const shoppingList = await UpdateShoppingListIngredient(id, user_id, ingredient_id, filterQuery);
      if (shoppingList) {
        res.json({ count: shoppingList.ingredient_list.length, shoppingList: shoppingList });
      } else {
        res.json({ count: 0, shoppingList: shoppingList });
      }
    } catch (error: any) {
      res.status(500);
      res.json({ error: "Internal server error" });
    }
  });
  
  // Set up server port to listen on
  app.listen(PORT, () => {
    console.log(`️[server]: Server is running at http://localhost:${PORT}`);
  });
});

// Creates a formatted update query to update an ingredient's measurement amount, measurement unit, recipe_id, and/or ingredient_extra boolean
function createUpdateQuery(ingredientUpdates: ShoppingListUpdateIngredient) {
  const filterQuery = {} as updateCommands;
  if (ingredientUpdates.amount) {
    filterQuery["ingredient_list.$.ingredient_measurement.measurement_amount"] = ingredientUpdates.amount;
  }
  if (ingredientUpdates.units) {
    filterQuery["ingredient_list.$.ingredient_measurement.measurement_unit"] = ingredientUpdates.units;
  }
  if (ingredientUpdates.recipe_id) {
    filterQuery["ingredient_list.$.recipe_id"] = ingredientUpdates.recipe_id;
  }
  if ("ingredient_extra" in ingredientUpdates) {
    filterQuery["ingredient_list.$.ingredient_extra"] = ingredientUpdates.ingredient_extra;
  }

  return filterQuery;
}

// Create a formatted ingredient following ingredient schema format given new ingredient information
function formatAddIngredientToList(newIngredient: ShoppingListAddIngredient) {
  const ingredientAdd = {} as IIngredientsList;
  if (newIngredient.ingredient_name) {
    ingredientAdd.ingredient_name = newIngredient.ingredient_name;
  }
  if (newIngredient.amount && newIngredient.units) {
    ingredientAdd.ingredient_measurement = {};
    ingredientAdd.ingredient_measurement.measurement_amount = newIngredient.amount;
    ingredientAdd.ingredient_measurement.measurement_unit = newIngredient.units;
  }

  if (newIngredient.recipe_id) {
    ingredientAdd.recipe_id = newIngredient.recipe_id;
  }

  if (newIngredient.ingredient_extra) {
    ingredientAdd.ingredient_extra = true;
  } else {
    ingredientAdd.ingredient_extra = false;
  }

  return ingredientAdd;
}