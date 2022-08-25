import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../libraries/S3Client";

// A mock function to mimic making an async request for data
export function getListAllFiles(amount = 1) {
  return s3Client.send(new ListObjectsCommand({
    Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
    Prefix: "testreact"
  }));
}
