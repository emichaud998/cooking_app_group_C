# image microservice

## Overview

This service will return a list of image url based on the provided query

It uses [Spoonacular](https://spoonacular.com/food-api) as source of image.

Spoonacular only allow 100 free requests per day. Thus, I use mongoDB to save
all the results. Thus, in the future, we will no longer rely on Spoonacular

## There are 1 HTTP REST APIS:

### `/getImage`: return a list of image urls:

Example request:

```
http://localhost:8000/getImage?query=pasta
```

Example response:

```
{
    "results": [
        {
            "id": 654959,
            "title": "Pasta With Tuna",
            "image": "https://spoonacular.com/recipeImages/654959-312x231.jpg",
            "imageType": "jpg"
        },
        {
            "id": 511728,
            "title": "Pasta Margherita",
            "image": "https://spoonacular.com/recipeImages/511728-312x231.jpg",
            "imageType": "jpg"
        },
        {
            "id": 654812,
            "title": "Pasta and Seafood",
            "image": "https://spoonacular.com/recipeImages/654812-312x231.jpg",
            "imageType": "jpg"
        },
        {
            "id": 654857,
            "title": "Pasta On The Border",
            "image": "https://spoonacular.com/recipeImages/654857-312x231.jpg",
            "imageType": "jpg"
        },
        {
            "id": 654883,
            "title": "Pasta Vegetable Soup",
            "image": "https://spoonacular.com/recipeImages/654883-312x231.jpg",
            "imageType": "jpg"
        },
        {
            "id": 654928,
            "title": "Pasta With Italian Sausage",
            "image": "https://spoonacular.com/recipeImages/654928-312x231.jpg",
            "imageType": "jpg"
        },
        {
            "id": 654926,
            "title": "Pasta With Gorgonzola Sauce",
            "image": "https://spoonacular.com/recipeImages/654926-312x231.jpg",
            "imageType": "jpg"
        },
        {
            "id": 654944,
            "title": "Pasta With Salmon Cream Sauce",
            "image": "https://spoonacular.com/recipeImages/654944-312x231.jpg",
            "imageType": "jpg"
        },
        {
            "id": 654905,
            "title": "Pasta With Chickpeas and Kale",
            "image": "https://spoonacular.com/recipeImages/654905-312x231.jpg",
            "imageType": "jpg"
        },
        {
            "id": 654901,
            "title": "Pasta With Chicken and Broccoli",
            "image": "https://spoonacular.com/recipeImages/654901-312x231.jpg",
            "imageType": "jpg"
        }
    ],
    "offset": 0,
    "number": 10,
    "totalResults": 210
}
```
