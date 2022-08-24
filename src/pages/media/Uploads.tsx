import{ ChangeEvent, useState } from "react";
import { CloudUploadIcon } from "@heroicons/react/outline";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../libraries/S3Client";

export default function Uploads() {
  const [files, setFiles] = useState([]);
  
  const handleFilesChange = async (event: ChangeEvent<HTMLInputElement>) => {
    let inputFiles = event.currentTarget.files;
    const values = Object.values(inputFiles as object).map((inputFile) => {
      const objectURL = URL.createObjectURL(inputFile);
      inputFile.src = objectURL;
      return inputFile;
    })
    console.log(values)
    setFiles(values as [])
  }
  
  const handleUploads = async () => {
    try {
      const data = await s3Client.putObject({
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
        Key: 'testreact/' + (files[0] as any).name,
        Body: files[0],
        ACL: "public-read"
      });
      console.log("Successfully uploaded object: " + process.env.REACT_APP_S3_BUCKET_NAME + "/" + (files[0] as any).name);
      console.log(data);
      return data;
    } catch (err) {
      console.log("Error", err);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center py-8 2xl:min-h-[calc(100vh-4rem)] 2xl:py-10">
      <div className="mx-auto flex flex-col w-full max-w-xl items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="dark:hover:bg-bray-800 flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center py-6">
            <CloudUploadIcon aria-hidden="true" className="mb-3 h-10 w-10 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-300 font-semibold">Choose files</p>
          </div>
        </label>
        <input className="sr-only" id="dropzone-file" type="file" onChange={(e) => handleFilesChange(e)} />
      </div>
      {files && (
        <ul className="mt-6 space-y-3">
          {files.map((file: any, index: number) => (
            <li className="flex items-center space-x-4" key={index}>
              <img src={file.src} className="object-cover w-16 h-16 rounded-lg" alt={file.name} />
              <span>{file.name}</span>
            </li>
          ))}
        </ul>
      )}
      <button className="bg-indigo-500 text-white rounded-lg px-4 py-2 mt-8" onClick={handleUploads}>Upload</button>
    </div>
  );
}
