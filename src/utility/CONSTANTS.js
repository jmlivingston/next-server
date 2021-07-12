const ENV_KEY = 'B'
const AWS_ACCESS_KEY_ID = process.env[`AWS_ACCESS_KEY_ID_${ENV_KEY}`]
const AWS_S3_BUCKET = process.env[`AWS_S3_BUCKET_${ENV_KEY}`]
const AWS_SECRET_ACCESS_KEY = process.env[`AWS_SECRET_ACCESS_KEY_${ENV_KEY}`]
const AWS_SIGNATURE_VERSION = 'v4'
const NEXT_PUBLIC_JENKINS_URL = process.env.NEXT_PUBLIC_JENKINS_URL
const NEXT_PUBLIC_JENKINS_USER_TOKEN = process.env.NEXT_PUBLIC_JENKINS_URL

const ROUTES = Object.freeze({
  HOME: { display: 'Home', path: '/' },
  CONVERT_FILE: {
    disabled: true,
    display: 'Convert File',
    path: '/convert-file',
  },
  JENKINS: { disabled: true, display: 'Jenkins', path: '/jenkins' },
  OPTIMIZELY: { display: 'Optimizely', path: '/reservations/start' },
})

const OPTIMIZELY_EXPERIMENTS = Object.freeze({
  [process.env.NEXT_PUBLIC_OPTIMIZELY_EXPERIMENT_ID]: {
    id: process.env.NEXT_PUBLIC_OPTIMIZELY_EXPERIMENT_ID,
    name: process.env.NEXT_PUBLIC_OPTIMIZELY_EXPERIMENT_NAME,
    variations: {
      [process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION1]: {
        id: process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION1_ID,
        name: process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION1_NAME,
      },
      [process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION2]: {
        id: process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION2_ID,
        name: process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION2_NAME,
      },
      [process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION3]: {
        id: process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION3_ID,
        name: process.env.NEXT_PUBLIC_OPTIMIZELY_VARIATION3_NAME,
      },
    },
  },
})

export {
  AWS_ACCESS_KEY_ID,
  AWS_S3_BUCKET,
  AWS_SECRET_ACCESS_KEY,
  AWS_SIGNATURE_VERSION,
  ENV_KEY,
  NEXT_PUBLIC_JENKINS_URL,
  NEXT_PUBLIC_JENKINS_USER_TOKEN,
  OPTIMIZELY_EXPERIMENTS,
  ROUTES,
}
