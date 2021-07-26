import { useRouter } from 'next/router';
import React from 'react';
import ConvertFile from '../../components/ConvertFile';
import FsmContainer from '../../components/fsm/FsmContainer';
import Jenkins from '../../components/Jenkins';
import PaymentContainer from '../../components/payment/PaymentContainer';
import PaymentChallenge from '../../components/payment/PaymentChallenge';
import PaymentComplete from '../../components/payment/PaymentComplete';

const Pages = () => {
  const router = useRouter();
  const { slug } = router.query;

  switch (slug) {
    case 'convert-file':
      return <ConvertFile />;
    case 'fsm':
      return <FsmContainer />;
    case 'jenkins':
      return <Jenkins />;
    case 'payment':
      return <PaymentContainer />;
    case 'payment-challenge':
      return <PaymentChallenge />;
    case 'payment-complete':
      return <PaymentComplete />;
    default:
      return null;
  }
};

export default Pages;
