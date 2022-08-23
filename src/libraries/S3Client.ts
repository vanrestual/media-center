import { S3 } from "@aws-sdk/client-s3";

export const s3Client = new S3({
  endpoint: `https://${process.env.REACT_APP_S3_BUCKET_ENDPOINT}`,
  region: "sgp1",
  credentials: {
    accessKeyId: process.env.REACT_APP_S3_BUCKET_KEY as string,
    secretAccessKey: process.env.REACT_APP_S3_BUCKET_SECRET as string,
  },
});
