#!/bin/bash

RECIPE=10
SHOPPING_LIST=10
COMMENTS=10

cd ./services/Recipes
x=1
while [ $x -le $RECIPE ]
do
    docker-compose up --scale api=$x -d;
    x=$(( $x + 1 ));
done
cd ..

cd ./Shopping_List
x=1
while [ $x -le $SHOPPING_LIST ]
do
    docker-compose up --scale api=$x -d;
    x=$(( $x + 1 ));
done
cd ..

cd ./Comments
x=1
while [ $x -le $COMMENTS ]
do
    docker-compose up --scale comment-service-api-server=$x -d;
    x=$(( $x + 1 ));
done
cd ..

cd ./nginx_gateway_with_docker
docker-compose up