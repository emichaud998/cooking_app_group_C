import { uploadPictureToS3 } from "../../lib/uploadPictureToS3";

async function uploadImage(event, context) {
  const base64 = event.body.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64, "base64");

  // const upload = await uploadPictureToS3("1.jpg", buffer);
  return {
    statusCode: 200,
    body: JSON.stringify(buffer.toString()),
  };
}

export const handler = uploadImage;
