const ENV_KEY = 'B'
const AWS_ACCESS_KEY_ID = process.env[`AWS_ACCESS_KEY_ID_${ENV_KEY}`]
const AWS_S3_BUCKET = process.env[`AWS_S3_BUCKET_${ENV_KEY}`]
const AWS_S3_SIGNED_URL = process.env[`AWS_S3_SIGNED_URL_${ENV_KEY}`]
const AWS_SECRET_ACCESS_KEY = process.env[`AWS_SECRET_ACCESS_KEY_${ENV_KEY}`]
const AWS_SIGNATURE_VERSION = 'v4'
const ROUTES = Object.freeze({
  HOME: '/',
  CONVERT_FILE: '/convert-file',
})

export {
  AWS_ACCESS_KEY_ID,
  AWS_S3_BUCKET,
  AWS_S3_SIGNED_URL,
  AWS_SECRET_ACCESS_KEY,
  AWS_SIGNATURE_VERSION,
  ENV_KEY,
  ROUTES,
}
