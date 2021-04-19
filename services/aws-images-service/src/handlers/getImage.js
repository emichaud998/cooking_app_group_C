const axios = require("axios");

import { v4 as uuid } from "uuid";
import commonMiddleware from "../../lib/commonMiddleware";
import { uploadPictureToS3 } from "../../lib/uploadPictureToS3";
import AWS from "aws-sdk";
import createHttpError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function saveImage(name, link) {
  const now = new Date();

  const auction = {
    name: name,
    link: link,
    createdAt: now.toISOString(),
  };

  await dynamodb
    .put({
      TableName: process.env.IMAGES_TABLE_NAME,
      Item: auction,
    })
    .promise();
}

async function getImage(event, context) {
  const { query } = event.queryStringParameters;
  let image;

  const result = await dynamodb
    .get({
      TableName: process.env.IMAGES_TABLE_NAME,
      Key: { name: query },
    })
    .promise();

  image = result.Item;

  if (image) {
    return {
      statusCode: 200,
      body: JSON.stringify(image.link),
    };
  }

  let imageUrls = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&query=${query}`
  );

  imageUrls = imageUrls.data;

  if (imageUrls.totalReults != 0) {
    const response = await axios.get(imageUrls.results[0].image, {
      responseType: "arraybuffer",
    });

    const upload = await uploadPictureToS3(query + ".jpg", response.data);
    saveImage(query, upload.Location);

    return {
      statusCode: 200,
      body: JSON.stringify(upload.Location),
    };
  }

  return {
    statusCode: 204,
    body: JSON.stringify({}),
  };
}

// export const handler = getImage;
export const handler = commonMiddleware(getImage);
