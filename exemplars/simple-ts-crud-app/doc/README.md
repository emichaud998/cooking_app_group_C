# COMPSCI 497S MongoDB with docker

## Overview

This is a project that support simple user management.

User object has only 2 attributes: `email` (unique), and `userName`.

The service support 5 basic operators:

1. get all users
2. get user with given email address
3. create user with email and userName
4. update userName given user email address
5. delete user given user email address

## There are 5 HTTP REST APIS:

### `/get_users`: return a list of all users:

Example request:

```
http://localhost:8000/get_users/
```

Example response:

```
{
    "count": 3,
    "users": [
        {
            "_id": "60431e143cc4c6f007448cb8",
            "email": "cunbidun1@gmail.com",
            "userName": "cunbidun5",
            "__v": 0
        },
        {
            "_id": "6043235c04f4127bbab2e711",
            "email": "cunbidun5@gmail.com",
            "userName": "cunbidun",
            "__v": 0
        },
        {
            "_id": "60432a1875116d38fa94b8dc",
            "email": "cunbidun10@gmail.com",
            "userName": "cunbidun1",
            "__v": 0
        }
    ]
}
```

### `/get_user_by_email`: get user by email

Example request:

```
http://localhost:8000/get_user_by_email/?email=cunbidun@gmail.com
```

Example response:

```
{
    "users": {
        "_id": "60432f893a8a31bb8d1d68cc",
        "email": "cunbidun@gmail.com",
        "userName": "cunbidun",
        "__v": 0
    }
}
```

### `/create_user`: create user by email and userName

Example request:

```
http://localhost:8000/create_user/?email=cunbidun@gmail.com&userName=cunbidun
```

Example response:

```
{
    "message": "User created",
    "user": {
        "_id": "604330de470c3af14fc28a38",
        "email": "cunbidun@gmail.com",
        "userName": "cunbidun",
        "__v": 0
    }
}
```

### `/update_user_by_email`: update user by email and new userName

Example request:

```
http://localhost:8000/update_user_by_email/?email=cunbidun@gmail.com&userName=duy
```

Example response:

```
{
    "message": "User information updated",
    "users": {
        "_id": "604330de470c3af14fc28a38",
        "email": "cunbidun@gmail.com",
        "userName": "duy",
        "__v": 0
    }
}
```

### `/delete_user_by_email`: delete user by email

Example request:

```
http://localhost:8000/delete_user_by_email/?email=cunbidun@gmail.com
```

Example response:

```
{
    "message": "User deleted",
    "users": {
        "_id": "60432f893a8a31bb8d1d68cc",
        "email": "cunbidun@gmail.com",
        "userName": "duy",
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
