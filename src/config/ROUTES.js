import ConvertFile from '../components/ConvertFile';
import FsmContainer from '../components/fsm/FsmContainer';
import Image from '../components/image/ImageContainer';
import Jenkins from '../components/Jenkins';
import PhoneNumber from '../components/misc/PhoneNumber';
import TableWithTooltip from '../components/misc/TableWithTooltip';
import CardTable from '../components/payment/CardTable';
import IFrameModal from '../components/payment/IFrameModal';
import PaymentChallenge from '../components/payment/PaymentChallenge';
import PaymentComplete from '../components/payment/PaymentComplete';
import PaymentContainer from '../components/payment/PaymentContainer';
import Redirector from '../components/payment/Redirector';

const disabled = true;

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : '';

const API_ROUTES = Object.freeze({
  PAYMENT_INIT: `${BASE_URL}/api/payment/init`,
  PAYMENT: `${BASE_URL}/api/payment`,
});

const ROUTES = Object.freeze({
  CONVERT_FILE: {
    component: ConvertFile,
    disabled,
    display: 'Convert File',
    path: '/pages/convert-file',
  },
  FSM: {
    component: FsmContainer,
    disabled,
    display: 'FSM',
    path: '/pages/fsm',
  },
  HOME: { display: 'Home', path: '/' },
  IFRAME_MODAL: { component: IFrameModal, display: 'IFrame Modal', path: '/pages/iframe-modal' },
  IMAGE: {
    component: Image,
    display: 'Image',
    path: '/pages/image',
  },
  JENKINS: {
    component: Jenkins,
    disabled,
    display: 'Jenkins',
    path: '/pages/jenkins',
  },
  OPTIMIZELY: { disabled, display: 'Optimizely', path: '/reservations/start' },
  PAYMENT: {
    component: PaymentContainer,
    display: 'Payment',
    path: '/pages/payment',
  },
  PAYMENT_CARD_TABLE: {
    component: CardTable,
    display: 'Payment Cards',
    path: '/pages/payment-card-table',
  },
  PAYMENT_CHALLENGE: {
    component: PaymentChallenge,
    disabled,
    display: 'Payment Challenge',
    path: '/pages/payment-challenge',
  },
  PAYMENT_COMPLETE: {
    component: PaymentComplete,
    disabled,
    display: 'Payment Complete',
    path: '/pages/payment-complete',
  },
  PAYMENT_DIAGRAM: {
    component: PaymentContainer,
    display: 'Payment Diagram',
    path: '/pages/payment-diagram',
    props: { isPaymentOnly: false, isInspectorOnly: true },
  },
  PAYMENT_NOTIFICATION_URL: {
    disabled: true,
    display: 'Payment Complete - Challenge Accepted',
    path: `/pages/payment?challenge=accepted`,
  },
  PHONE_NUMBER: {
    component: PhoneNumber,
    display: 'Phone Number',
    path: '/pages/phone-number',
  },
  REDIRECT: {
    component: Redirector,
    disabled,
    display: 'Redirect',
    path: '/pages/redirect',
  },
  TABLE_TOOLTIP: {
    component: TableWithTooltip,
    display: 'Table Tooltip',
    path: '/pages/table-tooltip',
  },
});

export { API_ROUTES, ROUTES };
