import * as AWS from "aws-sdk"
import * as fs from "fs"
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3"

export const fileDownload = async (filename) => {
    // npx ts-node fileDownload.controller.js


    const client = new S3Client({ region: "us-west-2" })

    const main = async (filename) => {
        const command = new GetObjectCommand({
            Bucket: "donosbucket",
            Key: filename
        });

        try {
            const response = await client.send(command)
            const fileStream = fs.createWriteStream("./lazersDownload.mp3")
            response.Body.pipe(fileStream)

            fileStream.on('finish', () => {
                console.log("File downloaded successfully!")
            });

            fileStream.on('error', (err) => {
                console.error("Error writing file:", err)
            });
        } catch (err) {
            console.error(err)
        }
    };

    return await main(filename)
}

fileDownload("lazers.mp3")
// const mp3File = fileDownload("lazers.mp3")