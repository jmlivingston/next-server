import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import ConvertFile from '../../components/ConvertFile';
import FsmContainer from '../../components/fsm/FsmContainer';
import Jenkins from '../../components/Jenkins';
import CardTable from '../../components/payment/CardTable';
import PaymentChallenge from '../../components/payment/PaymentChallenge';
import PaymentComplete from '../../components/payment/PaymentComplete';
import PaymentContainer from '../../components/payment/PaymentContainer';

const Pages = () => {
  const router = useRouter();
  const { slug } = router.query;
  let Component;

  switch (slug) {
    case 'convert-file':
      Component = ConvertFile;
      break;
    case 'fsm':
      Component = FsmContainer;
      break;
    case 'jenkins':
      Component = Jenkins;
      break;
    case 'payment':
      Component = PaymentContainer;
      break;
    case 'payment-card-table':
      Component = CardTable;
      break;
    case 'payment-challenge':
      Component = PaymentChallenge;
      break;
    case 'payment-complete':
      Component = PaymentComplete;
    default:
      Component = () => null;
      break;
  }

  return (
    <>
      {slug && (
        <Head>
          <title>{slug?.substr(0, 1)?.toUpperCase() + slug?.substr(1)}</title>
        </Head>
      )}
      <Component />
    </>
  );
};

export default Pages;
