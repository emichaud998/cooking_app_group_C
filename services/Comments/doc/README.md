# COMPSCI 497S Comments Service 

## Overview

This is a service that support simple comments management.

Comment object has 4 attributes: 
1. `_id` (unique), 
2. `userId` (string, the one made this comment).
3. `postId` (string, which post the comment belong to).
4. `commentText` (string, the text of the comment).

The service support 6 basic operators:

1. get comment by id 
2. get all user comment 
3. get all comment in a specific post 
4. create new comment with userId, postId, commentText 
5. update existing comment
6. delete existing comment 

## There are 6 HTTP REST APIS:

### `/api/comments/get_comment`: return a comment:

Example request:

```
http://localhost:8000/api/comments/get_comment?id=6063713a2a83c044f8593d38
```

Example response:

```
{
    "comment": {
        "_id": "60636f307a31cf4259712fc3",
        "userId": "abc",
        "postId": "def",
        "commentText": "good job",
        "__v": 0
    }
}
```

### `/api/comments/get_comments_by_user_id`: get a list of comments written by a user

Example request:

```
http://localhost:8000/api/comments/get_comments_by_user_id?userId=abc
```

Example response:

```
{
    "comments": [
        {
            "_id": "60636f317a31cf4259712fc5",
            "userId": "abc",
            "postId": "def",
            "commentText": "good job",
            "__v": 0
        },
        {
            "_id": "60636feefee29e43c443f468",
            "userId": "abc",
            "postId": "defg",
            "commentText": "good job",
            "__v": 0
        },
        {
            "_id": "60636feffee29e43c443f469",
            "userId": "abc",
            "postId": "defg",
            "commentText": "good job",
            "__v": 0
        }
    ]
}
```

### `/api/comments/get_comments_by_post_id`: get a list of comments written in a post

Example request:

```
http://localhost:8000/api/comments/get_comments_by_post_id?postId=def
```

Example response:

```
{
    "comments": [
        {
            "_id": "60636f307a31cf4259712fc3",
            "userId": "abc",
            "postId": "def",
            "commentText": "good job",
            "__v": 0
        },
    ]
}
```

### `/api/comments/create_comment`: create comment

Example body:

```
{
    "userId": "a",
    "postId": "b",
    "commentText": "good job"
}
```

Example response:

```
{
    "message": "Comment created",
    "comment": {
        "_id": "6063713a2a83c044f8593d38",
        "userId": "a",
        "postId": "b",
        "commentText": "good job",
        "__v": 0
    }
}
```

### `/api/comments/update_comment`: update comment given id

Example body:

```
{
    "id": "6063713a2a83c044f8593d38",
    "userId": "a",
    "postId": "b3",
    "commentText": "good job"
}
```

Example response:

```
{
    "message": "Comment updated",
    "comment": {
        "_id": "6063713a2a83c044f8593d38",
        "userId": "a",
        "postId": "b3",
        "commentText": "good job",
        "__v": 0
    }
}
```

### `/api/comments/delete_user_by_id`: delete comment by id 

Example request:

```
http://localhost:8000/api/comments/delete_user_by_id?id=6063713a2a83c044f8593d38
```

Example response:

```
{
    "message": "Comment deleted",
    "users": {
        "_id": "6063713a2a83c044f8593d38",
        "userId": "a",
        "postId": "b3",
        "commentText": "good job",
        "__v": 0
    }
}
```

# How to run.

1. `cd` to the project directory folder
2. run `npm install`
3. create a '.env' file for storing database user information from `.env.template` 
4. run `docker-compose up` to create a local MongoDb database server
5. run `npm start` to start the APIs server
