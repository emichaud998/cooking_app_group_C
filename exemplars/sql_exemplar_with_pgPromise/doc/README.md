# Name

Andrew Leger

# Setup

## Database Creation Commands

Project requires a postgres database and node module pgpromise now
To setup database: Install latest postgres. Run the following commands
```sql
CREATE DATABASE SQL_Exemplar;
\c sql_exemplar
-- A table of user profiles, including their cryptographic hashed pwd and salt
CREATE TABLE profiles (userID SERIAL PRIMARY KEY, email VARCHAR(200) UNIQUE NOT NULL, username VARCHAR(100) UNIQUE NOT NULL, hashedpwd VARCHAR(300), salt VARCHAR(300));

-- Table of recipes. Very barebones and just there to accept foreign key references at the moment
CREATE TABLE Recipes (ID SERIAL PRIMARY KEY, name VARCHAR(100), description VARCHAR(500));

-- A list of favorite recipes for every user. Not every user from profiles is guaranteed to be in this table. This implementation (and what the exemplar is using, does not guaranteed any favorite dish exists for a user)
CREATE TABLE favorite_recipes (profileID INT NOT NULL REFERENCES profiles(userID), favorite INT NOT NULL REFERENCES recipes);

-- Alternative (don't actually run this one, just for demo purposes on alternatives)
-- Here, favorite INT[] is instead an array that holds all favorited dishes referenced by their ID. This saves space in the database at the not negligible cost of losing foreign key referencing to the recipes table
CREATE TABLE favorite_recipes_alt (profileID INT NOT NULL REFERENCES profiles(userID), favorite INT[]);
```

Since the database is empty by default, you can either enter some data manaully in postgres, or otherwise you can play around with post requests to insert into the table before trying to retrieve data. (though you can retrieve an empty table just fine.)

Here's more than enough data to test all the inputs wihout having to resort to POST requests. Copy and paste after connecting to the cs497s_hw4 database

```sql
INSERT INTO recipes VALUES(default, 'Mashed Taters', 'The best food');
INSERT INTO recipes VALUES(default, 'Mac & cheese', 'Better than Taters');
INSERT INTO recipes VALUES(default, 'Spaghetti', 'Carbs');
INSERT INTO recipes VALUES(default, 'Lolipop', 'Candy is delicious');
INSERT INTO profiles VALUES(default, 'user1', 'email1', 'pwd1', 'salt1');
INSERT INTO profiles VALUES(default, 'user2', 'email2', 'pwd2', 'salt2');
INSERT INTO profiles VALUES(default, 'user3', 'email3', 'pwd3', 'salt3');
INSERT INTO profiles VALUES(default, 'user4', 'email4', 'pwd4', 'salt4');
INSERT INTO profiles VALUES(default, 'user5', 'email5', 'pwd5', 'salt5');
INSERT INTO profiles VALUES(default, 'user6', 'email6', 'pwd6', 'salt6');
INSERT INTO profiles VALUES(default, 'user7', 'email7', 'pwd7', 'salt7');
INSERT INTO profiles VALUES(default, 'user8', 'email8', 'pwd8', 'salt8');
```
One last note, dbManagement.ts assumes your username and password is postgres and postgres, so change that at the top of the file if that's incorrect. An actual implementation (possibly on heroku) would override this when actually deployed to heroku, but that's outside this HW's scope.

I used ts-node and a modified launch.json file to simplify the running process. IE: Pressing the run key in vscode autocompiles test.ts and runs the generated js file.


# How to use

Load folder in vscode, hit run. Observe the output in console. View code comments to see what stuff does.