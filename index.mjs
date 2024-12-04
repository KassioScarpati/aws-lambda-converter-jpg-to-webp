import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3 = new S3Client();

export const handler = async (event) => {
  console.log('Lambda file converter started!');
  try {
    // Retrieve event information
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));

    // Ignore files that are not .jpg
    if (!key.endsWith(".jpg")) {
      console.log(`File ignored: ${key}`);
      return;
    }

    // Download the file from S3
    const commandGet = new GetObjectCommand({ Bucket: bucket, Key: key });
    const response = await s3.send(commandGet);

    // Convert the image to WebP
    const originalImage = await streamToBuffer(response.Body);
    const convertedImage = await sharp(originalImage).webp().toBuffer();

    // Save the converted image to S3
    const newKey = key.replace(/\.jpg$/, ".webp");
    const commandPut = new PutObjectCommand({
      Bucket: bucket,
      Key: newKey,
      Body: convertedImage,
      ContentType: "image/webp",
    });
    await s3.send(commandPut);

    console.log(`Image successfully converted: ${newKey}`);
  } catch (error) {
    console.error("Error processing the image:", error);
    throw error;
  }
};

// Helper function to convert stream to buffer
const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};
