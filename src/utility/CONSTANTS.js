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

const OPTIMIZELY_CONFIG = JSON.parse(process.env.NEXT_PUBLIC_OPTIMIZELY_CONFIG)

// Example OPTIMIZELY_CONFIG
// {
//   experiments: {
//     101: {
//       id: '101',
//       name: 'One zero one',
//       variations: {
//         201: {
//           id: '201',
//           name: 'Two zero one',
//         },
//         202: {
//           id: '202',
//           name: 'Two zero two',
//         },
//         203: {
//           id: '203',
//           name: 'Two zero three',
//         },
//       },
//     },
//   },
// }

export {
  AWS_ACCESS_KEY_ID,
  AWS_S3_BUCKET,
  AWS_SECRET_ACCESS_KEY,
  AWS_SIGNATURE_VERSION,
  ENV_KEY,
  NEXT_PUBLIC_JENKINS_URL,
  NEXT_PUBLIC_JENKINS_USER_TOKEN,
  OPTIMIZELY_CONFIG,
  ROUTES,
}
