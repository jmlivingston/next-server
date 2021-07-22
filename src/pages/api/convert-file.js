import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import {
  AWS_ACCESS_KEY_ID,
  AWS_S3_BUCKET,
  AWS_SECRET_ACCESS_KEY,
  AWS_SIGNATURE_VERSION,
} from '../../utility/CONSTANTS';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      // 1 - Upload converted file to S3 (We're just using a fsm one now.)
      const { fileName } = req.body;

      const s3Client = new AWS.S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        signatureVersion: AWS_SIGNATURE_VERSION,
      });

      console.log(path.join(path.resolve(), 'sample.jpg'));

      const params = {
        Bucket: AWS_S3_BUCKET,
        Key: fileName,
        Body: fs.createReadStream(path.join(path.resolve(), 'sample.jpg')),
      };

      await s3Client.upload(params).promise();

      // 2 - Get converted file
      const data = await s3Client
        .getObject({
          Bucket: params.Bucket,
          Key: params.Key,
        })
        .promise();

      res.status(200).json({
        isSuccessful: true,
        data,
      });
    } else {
      res.status(405).send();
    }
  } catch (error) {
    res.status(500).send({
      error,
      isSuccessful: false,
    });
  }
}
