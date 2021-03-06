# API Gateway Server using NGINX and Containerized with Docker

To start server:
1. Have docker for windows (haven't tested on linux or mac)
2. Start the recipes microservice (nginx requires an upstream server to connect to)
3. Switch to the services/nginx_gateway_with_docker folder
4. Start the docker container:
    ```
    docker compose up
    ```
5. Access the recipes server, hosted on port 8091, through requests to the gateway server, currently on port 443.
6. Success. You can now access the recipes microservice as described in its README, but using port 443 instead.
7. You should be able to access api calls for the recipes, shoppinglist, and comments services by routing through 443. localhost://443/api/name_of_service/name_of_endpoint

## Sidenote
Once docker compose up has been run and shut down once, start it again from the docker desktop app. I'll figure out how to make the compose check for existing containers at a later date. 

To remake the container, delete it from the desktop app and then run the docker compose command again.

## Docs

Directories: 

    nginx-config: Contains all configuration files for running the server.
    static_files: Currently unused, but meant for serving static files directly.
    
Endpoints:
    As described in their respective microservices. Just route through port 443 instead when using the gateway.
    
Currently supported:
    
[Recipes](https://github.com/emichaud998/cooking_app_group_C/tree/master/services/Recipes#recipes-http-rest-api-endpoints-list)
