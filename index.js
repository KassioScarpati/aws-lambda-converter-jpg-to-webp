const AWS = require("aws-sdk");
const sharp = require("sharp");

const s3 = new AWS.S3();

exports.handler = async (event) => {
  console.log('heeeeeeeeeeeeeeeeeeere lambda file converter!');
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
    const { Body: originalImage } = await s3.getObject({ Bucket: bucket, Key: key }).promise();

    // Converta a imagem para WebP
    const convertedImage = await sharp(originalImage).webp().toBuffer();

    // Salve a imagem convertida no mesmo bucket (ou outro, se preferir)
    const newKey = key.replace(/\.jpg$/, ".webp");
    await s3.putObject({
      Bucket: bucket,
      Key: newKey,
      Body: convertedImage,
      ContentType: "image/webp",
    }).promise();

    console.log(`Imagem convertida com sucesso: ${newKey}`);
  } catch (error) {
    console.error("Erro ao processar a imagem:", error);
    throw error;
  }
};
