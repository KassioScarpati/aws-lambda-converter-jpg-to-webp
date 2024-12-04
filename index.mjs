import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3 = new S3Client();

export const handler = async (event) => {
  console.log('Lambda file converter iniciado!');
  try {
    // Obtenha informações do evento
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));

    // Ignore arquivos que não sejam .jpg
    if (!key.endsWith(".jpg")) {
      console.log(`Arquivo ignorado: ${key}`);
      return;
    }

    // Baixe o arquivo do S3
    const commandGet = new GetObjectCommand({ Bucket: bucket, Key: key });
    const response = await s3.send(commandGet);

    // Converta a imagem para WebP
    const originalImage = await streamToBuffer(response.Body);
    const convertedImage = await sharp(originalImage).webp().toBuffer();

    // Salve a imagem convertida no S3
    const newKey = key.replace(/\.jpg$/, ".webp");
    const commandPut = new PutObjectCommand({
      Bucket: bucket,
      Key: newKey,
      Body: convertedImage,
      ContentType: "image/webp",
    });
    await s3.send(commandPut);

    console.log(`Imagem convertida com sucesso: ${newKey}`);
  } catch (error) {
    console.error("Erro ao processar a imagem:", error);
    throw error;
  }
};

// Função auxiliar para converter stream em buffer
const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};
