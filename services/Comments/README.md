# COMPSCI 497S Project

## Group C, Comments Service
Author: Duy Pham - dhpham@umass.edu
The port for this service is 8000

## Overview
This is a service that supports simple comments management using HTTP REST APIs 
as the method of communication.

Comment object has 4 attributes: 
1. `_id` (primary key, unique to each comment), 
2. `userId` (string, the one made this comment).
3. `postId` (string, which post the comment belong to).
4. `commentText` (string, the text of the comment).

The service support 6 basic operators:

1. get comment by `_id` 
2. get all user comment given `userId`
3. get all comment in a specific post given `postId`
4. create new comment with `userId`, `postId`, `commentText` 
5. update existing comment given `_id`
6. delete existing comment given `_id` 

### Example for HTTP REST APIS:

#### [GET] `/api/comments/get_comment`: return a comment with comment's `_id`
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

#### [GET] `/api/comments/get_comments_by_user_id`: get a list of comments written by a user
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

#### [GET] `/api/comments/get_comments_by_post_id`: get a list of comments written for a given post
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

#### [POST] `/api/comments/create_comment`: create new comment comment
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

#### [PUT] `/api/comments/update_comment`: update comment given comment `_id`
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

#### [DELETE] `/api/comments/delete_user_by_id`: delete comment given comment `_id` 
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

## How to start the service.

1. `cd` to the service directory 
2. create a '.env' file for storing database user information from `.env.template`. For example, 
```
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=root_pwd
MONGO_DATABASE=comments-service
MONGO_USERNAME=user
MONGO_PASSWORD=user_pwd
```
4. run `docker-compose up` to create a local MongoDB database and the api server.

## Note
1. The service will be available at that port 9020
2. admin is populate by mounting `init-mongo.sh` to the container
3. The code in the `docker-entrypoint-init.d` folder only executed if the database has never been initialized before

