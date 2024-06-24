import * as AWS from "aws-sdk"
import * as fs from "fs"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// remember you had to set up your sso in aws , dont forget to run command if you get 500

const fileUpload = async (mp3FilePath) => {
    // npx ts-node fileUpload.controller.js
    // const readStream =
    console.log(mp3FilePath)
    const fileContent = fs.readFileSync(mp3FilePath)
    // const s3 = new AWS.S3()

    const fileParts = mp3FilePath.split("/"); // maybe need regex?
    const filename = fileParts.pop() // should be song.mp3
    console.log(filename)


    const client = new S3Client({ region: "us-west-2" })

    const main = async (filename, fileContent) => {
        const command = new PutObjectCommand({
            Bucket: "donosbucket",
            Key: filename,
            Body: fileContent
        });

        try {
            const response = await client.send(command)
            console.log(response)
        } catch (err) {
            console.error(err)
        }
    }

    await main(filename, fileContent)
}

fileUpload("./lazers.mp3")