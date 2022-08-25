import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListObjectsCommand, ListObjectsOutput, DeleteObjectCommand, _Object } from "@aws-sdk/client-s3";
import { TrashIcon } from "@heroicons/react/outline";
import { s3Client } from "../../libraries/S3Client";

export default function Media() {
  const [data, setData] = useState<ListObjectsOutput>({});

  const getContents = async() => {
    try {
      const data = await s3Client.send(new ListObjectsCommand({
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
        Prefix: "testreact"
      }));
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const destroyContent = async(content: _Object) => {
    try {
      const data = await s3Client.send(new DeleteObjectCommand({ 
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
        Key: content.Key,
      }));
      return data;
    } catch (err) {
      console.log("Error", err);
    }
  }

  const getFileSize = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  useEffect(() => {
    getContents();
  } , [data]);

  return (
    <>
      <div className="mb-6 flex flex-col items-center justify-between space-y-3 px-1 sm:flex-row sm:space-y-0 2xl:mb-8 2xl:px-2">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Media Center</h1>
        <Link to="/media/uploads" className="inline-flex justify-center items-center px-4 2xl:px-5 py-2 2xl:py-2.5 text-center rounded-xl 2xl:rounded-2xl text-sm 2xl:text-base font-semibold tracking-wide focus:outline-none transition duration-300 bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600 active:bg-indigo-700 text-white">Upload Image</Link>
      </div>
      <div className="relative overflow-x-auto rounded-lg border 2xl:rounded-xl">
        <table className="table-auto w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6"><span className="sr-only">Image</span></th>
              <th scope="col" className="py-3 px-6">URL</th>
              <th scope="col" className="py-3 px-6">Size</th>
              <th scope="col" className="py-3 px-6">Last Modified</th>
              <th scope="col" className="py-3 px-6"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody>
            {data.Contents?.map((content, index) =>  (
              <tr key={content.Key} className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img className="object-cover w-16 h-16 rounded-lg 2xl:rounded-xl" src={`https://mpindo.sgp1.cdn.digitaloceanspaces.com/${content.Key}`} alt={content.Key} />
                </td>
                <td className="py-4 px-6 font-medium text-gray-500 dark:text-gray-300">{`https://mpindo.sgp1.cdn.digitaloceanspaces.com/${content.Key}`}</td>
                <td className="py-4 px-6 text-gray-500 dark:text-gray-300">{getFileSize(content.Size as number)}</td>
                <td className="py-4 px-6 text-gray-500 dark:text-gray-300">{content.LastModified?.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                <td className="py-4 px-6 space-x-2 2xl:space-x-3">
                  <button
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                    onClick={() => destroyContent(content as any)}>
                    <TrashIcon aria-hidden="true" className="w-5 h-5 2xl:w-6 2xl:h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
