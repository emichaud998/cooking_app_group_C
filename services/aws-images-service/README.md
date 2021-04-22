# COMPSCI 497S Project

## Group C, AWS image service Service
Author: Thanh Phan - tcphan@umass.edu
This service is online right now! [link](https://7020556o0k.execute-api.eu-west-1.amazonaws.com/dev/)

## Overview
This service will return an image url for every query

It uses [Spoonacular](https://spoonacular.com/food-api) as the source of image.
However, the host of images is my AWS S3 bucket!

Spoonacular only allow 100 free requests per day. Thus, I use mongoDB to save
all the results. Thus, in the future, we will no longer rely on Spoonacular

## Tech stacks:
 - AWS Lambda
 - AWS S3 bucket
 - AWS CloudFormation
 - AWS CloudWatch
 - AWS DynamoDB
 - Serverless framework

## Why I choose them:
 - AWS Lambda is a compute service that lets you run code without provisioning or managing servers. 
 Lambda runs your code only when needed and scales automatically, from a few requests per day to thousands per second
 - Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, 
 data availability, security, and performance
 - Serverless framework allows me to deploy my code to AWS with ease. It also creates AWS CloudFormation and AWS CloudWatch
 for me to monitor my service
 
## How it works:
 - Serverless framework deploys my code to AWS CloudFormation which creates other stuff (Lambda, S3, ...)
 - Whenever there is a request, AWS Lambda will run my logic:
   - Check if the query has been processed before. If yes, returns it from the database
   - If not, makes a request to Spoonacular and gets a list of images.
   - Chooses one image and uploads it to S3 bucket and saves the link of the images to the database.
   - Return the image's link
   
## There are 2 HTTP REST APIS:

### [GET] `/getImage`: return a list of image urls:

Example request:

```
https://7020556o0k.execute-api.eu-west-1.amazonaws.com/dev/getImage?query=lasagna
```

Example response:

```
https://images-bucket-cs497s.s3.eu-west-1.amazonaws.com/lasagna.jpg
```

The image: ![](https://images-bucket-cs497s.s3.eu-west-1.amazonaws.com/lasagna.jpg)

### [POST] `/uploadImage?query={query}`: upload the specific image you want to the service a list of image urls:

Notice that the body of the request is the base64 encode of the image

Example request:

```
https://7020556o0k.execute-api.eu-west-1.amazonaws.com/dev/uploadImage?query=ramen
```

Example body:

I recommend use this website to encode your image, copy the result and paste it to the body:
![](https://images-bucket-cs497s.s3.eu-west-1.amazonaws.com/howtouse.jpg)
```
base64 encode of the image
```


Example response:

```
Succesfully uploaded image
```
