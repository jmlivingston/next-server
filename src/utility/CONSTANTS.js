const API_ROUTES = Object.freeze({
  INIT_PAYMENT: '/api/init-payment',
  PAYMENT: '/api/payment',
});

const ENV_KEY = 'B';
const AWS_ACCESS_KEY_ID = process.env[`AWS_ACCESS_KEY_ID_${ENV_KEY}`];
const AWS_S3_BUCKET = process.env[`AWS_S3_BUCKET_${ENV_KEY}`];
const AWS_SECRET_ACCESS_KEY = process.env[`AWS_SECRET_ACCESS_KEY_${ENV_KEY}`];
const AWS_SIGNATURE_VERSION = 'v4';

const NEUVEI_BASE_URL = process.env.NEUVEI_BASE_URL;
const NEUVEI_CHALLENGE_URL = process.env.NEXT_PUBLIC_NEUVEI_CHALLENGE_URL;
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

const NEXT_PUBLIC_JENKINS_URL = process.env.NEXT_PUBLIC_JENKINS_URL;
const NEXT_PUBLIC_JENKINS_USER_TOKEN = process.env.NEXT_PUBLIC_JENKINS_URL;

const OPTIMIZELY_CONFIG = JSON.parse(process.env.NEXT_PUBLIC_OPTIMIZELY_CONFIG);

const ROUTES = Object.freeze({
  CONVERT_FILE: {
    disabled: true,
    display: 'Convert File',
    path: '/convert-file',
  },
  HOME: { display: 'Home', path: '/' },
  JENKINS: { disabled: true, display: 'Jenkins', path: '/jenkins' },
  OPTIMIZELY: { display: 'Optimizely', path: '/reservations/start' },
  PAYMENT: { display: 'Payment', path: '/payment' },
  PAYMENT_CHALLENGE: { display: 'Payment Challenge', path: '/payment-challenge', inNav: false },
  PAYMENT_COMPLETE: { display: 'Payment Complete', path: '/payment-complete', inNav: false },
});

export {
  API_ROUTES,
  AWS_ACCESS_KEY_ID,
  AWS_S3_BUCKET,
  AWS_SECRET_ACCESS_KEY,
  AWS_SIGNATURE_VERSION,
  ENV_KEY,
  NEUVEI_BASE_URL,
  NEUVEI_CHALLENGE_URL,
  NEUVEI_CONFIG,
  NEUVEI_KEY,
  NEUVEI_MERCHANT_ID,
  NEUVEI_MERCHANT_SITE_ID,
  NEXT_PUBLIC_JENKINS_URL,
  NEXT_PUBLIC_JENKINS_USER_TOKEN,
  OPTIMIZELY_CONFIG,
  ROUTES,
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
