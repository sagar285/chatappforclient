import { S3Client,PutObjectCommand,DeleteObjectCommand,GetObjectCommand } from  "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import "dotenv/config.js"


 const bucketName = process.env.bucketName
const region = process.env.region
const accessKeyId = process.env.accessKeyId
const secretAccessKey = process.env.secretAccessKey

const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  })

// const cloudfront = new CloudFrontClient({
//     region,
//     credentials:{
//         accessKeyId:accessKeyId,
//         secretAccessKey:secretAccessKey,
//     }
// })
const uploadFile =(fileBuffer, fileName, mimetype)=>{
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype
      }
return s3Client.send(new PutObjectCommand(uploadParams));
}

const deleteFile =(fileName)=>{
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
      }
return s3Client.send(new DeleteObjectCommand(deleteParams));
}


const getObjectSignedUrl =async(key)=>{
    const params = {
        Bucket: bucketName,
        Key: key
      }
      const command = new GetObjectCommand(params);
      const seconds = 200
      const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });
      return url
}

export {uploadFile,deleteFile}

