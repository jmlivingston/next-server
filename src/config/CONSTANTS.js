const ENV_KEY = 'B';
const AWS_ACCESS_KEY_ID = process.env[`AWS_ACCESS_KEY_ID_${ENV_KEY}`];
const AWS_S3_BUCKET = process.env[`AWS_S3_BUCKET_${ENV_KEY}`];
const AWS_SECRET_ACCESS_KEY = process.env[`AWS_SECRET_ACCESS_KEY_${ENV_KEY}`];
const AWS_SIGNATURE_VERSION = 'v4';

const IMAGE_HANDLER_CONFIG = Object.freeze({
  API_BASE_URL: process.env.NEXT_PUBLIC_IMAGE_HANDLER_CONFIG_API_BASE_URL,
  BUCKET: process.env.NEXT_PUBLIC_IMAGE_HANDLER_CONFIG_BUCKET,
  SAMPLE_IMAGE: process.env.NEXT_PUBLIC_IMAGE_HANDLER_CONFIG_SAMPLE_IMAGE,
});

const LOCAL_STORAGE_KEY = Object.freeze({
  PAYMENT_DETAILS: 'PAYMENT_DETAILS',
});

const NEUVEI_API_BASE_URL = process.env.NEUVEI_API_BASE_URL;
const NEUVEI_API_GET_SESSION = process.env.NEUVEI_API_GET_SESSION;
const NEUVEI_API_INIT_PAYMENT = process.env.NEUVEI_API_INIT_PAYMENT;
const NEUVEI_API_PAYMENT = process.env.NEUVEI_API_PAYMENT;
const NEUVEI_API_CHALLENGE = process.env.NEXT_PUBLIC_NEUVEI_API_CHALLENGE;
const NEUVEI_API_CHALLENGE_SIMULATOR = ({ acsUrl, cReq }) =>
  `https://docs.safecharge.com/3Dsimulator/showUrl.php?acsUrl=${acsUrl}&creq=${cReq}`;
const NEUVEI_CONFIG = Object.freeze({
  // See https://docs.safecharge.com/documentation/guides/testing/testing-cards
  CARDS: {
    VISA_APPROVED: '4000027891380961',
    VISA_DECLINE: '4001152882620768',
    VISA_DO_NOT_HONOR: '4000164166749263',
  },
});
const NEUVEI_KEY = process.env.NEUVEI_KEY;
const NEUVEI_MERCHANT_ID = process.env.NEUVEI_MERCHANT_ID;
const NEUVEI_MERCHANT_SITE_ID = process.env.NEUVEI_MERCHANT_SITE_ID;
const NEUVEI_TRANSACTION_STATUS = Object.freeze({
  APPROVED: 'APPROVED',
  REDIRECT: 'REDIRECT',
});

const NEUVEI_3D_MODE = Object.freeze({
  CHALLENGE: 'CHALLENGE',
  FRICTIONLESS: 'FRICTIONLESS',
  FALLBACK: 'FALLBACK',
});

const NEXT_PUBLIC_JENKINS_URL = process.env.NEXT_PUBLIC_JENKINS_URL;
const NEXT_PUBLIC_JENKINS_USER_TOKEN = process.env.NEXT_PUBLIC_JENKINS_URL;

const OPTIMIZELY_CONFIG = JSON.parse(process.env.NEXT_PUBLIC_OPTIMIZELY_CONFIG);

const PAYMENT_FLOW_STATE = Object.freeze({
  CHALLENGE: 'Challenge',
  COMPLETE: 'Complete',
  LIABILITY_SHIFT: 'Liability shift',
  UNSUBMITTED: 'Not submitted',
});

const disabled = true;

export {
  AWS_ACCESS_KEY_ID,
  AWS_S3_BUCKET,
  AWS_SECRET_ACCESS_KEY,
  AWS_SIGNATURE_VERSION,
  ENV_KEY,
  IMAGE_HANDLER_CONFIG,
  LOCAL_STORAGE_KEY,
  NEUVEI_API_BASE_URL,
  NEUVEI_API_GET_SESSION,
  NEUVEI_API_INIT_PAYMENT,
  NEUVEI_API_PAYMENT,
  NEUVEI_API_CHALLENGE,
  NEUVEI_API_CHALLENGE_SIMULATOR,
  NEUVEI_CONFIG,
  NEUVEI_KEY,
  NEUVEI_MERCHANT_ID,
  NEUVEI_MERCHANT_SITE_ID,
  NEUVEI_3D_MODE,
  NEUVEI_TRANSACTION_STATUS,
  NEXT_PUBLIC_JENKINS_URL,
  NEXT_PUBLIC_JENKINS_USER_TOKEN,
  OPTIMIZELY_CONFIG,
  PAYMENT_FLOW_STATE,
};

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
