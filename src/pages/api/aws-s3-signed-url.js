import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { AWS_ACCESS_KEY_ID, AWS_S3_BUCKET, AWS_SECRET_ACCESS_KEY, AWS_SIGNATURE_VERSION } from '../../config/CONSTANTS';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { contentType, extension } = req.body;
    const fileName = `${uuidv4()}.${extension}`;

    let s3Params =
      AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY
        ? {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
          }
        : undefined;

    if (AWS_SIGNATURE_VERSION) {
      s3Params = s3Params
        ? {
            ...s3Params,
            ['signatureVersion']: AWS_SIGNATURE_VERSION,
          }
        : { signatureVersion: AWS_SIGNATURE_VERSION };
    }

    const s3Client = new AWS.S3(s3Params);

    const url = await s3Client.getSignedUrlPromise('putObject', {
      Bucket: AWS_S3_BUCKET,
      ContentType: contentType,
      Key: fileName,
      Expires: 6000,
    });

    res.status(200).json({
      isSuccessful: true,
      data: {
        fileName,
        url,
      },
    });
  } else {
    res.status(405).send();
  }
}
