## API Gateway Server using NGINX and Containerized with Docker

To start server:
1. Have docker for windows (haven't tested on linux or mac)
2. Start the recipes microservice (nginx requires an upstream server to connect to)
3. Switch to the services/nginx_gateway_with_docker folder
4. Start the docker container:
    ```
    docker compose up
    ```
5. Access the recipes server, hosted on port 8091, through requests to the gateway server, currently on port 443
6. Success. You can now access the recipes microservice as described in its README, but using port 443 instead.


## Docs

Directories: 

    nginx-config: Contains all configuration files for running the server.
    static_files: Currently unused, but meant for serving static files directly.
    
Endpoints:
    As an example/testproduct of the full version, only localhost:443/api/recipes/get_recipes is serviced by this exemplar, using the recipes service to provide it
    
