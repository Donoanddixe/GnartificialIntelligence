import * as AWS from "aws-sdk"
import * as fs from "fs"
import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";

export const getBucketList = async () => {
    // npx ts-node getBucketList.controller.js

    const client = new S3Client({ region: "us-west-2" })

    const main = async () => {
        const command = new ListObjectsCommand({
            Bucket: "donosbucket",
        });

        try {
            const response = await client.send(command)
            const bucketArray = response.Contents
            const filenameArray = bucketArray.map((file) => {
                return file.Key
            })
            console.log(filenameArray)
            return filenameArray
        } catch (err) {
            console.error(err)
        }
    };

    return await main()
}

getBucketList()