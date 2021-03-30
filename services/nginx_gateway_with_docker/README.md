# API Gateway Server using NGINX and Containerized with Docker

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

## Sidenote
Once docker compose up has been run and shut down once, start it again from the docker desktop app. I'll figure out how to make the compose check for existing containers at a later date. 

To remake the container, delete it from the desktop app and then run the docker compose command again.