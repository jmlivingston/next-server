import { useRouter } from 'next/router';
import React from 'react';
import ConvertFile from '../../components/ConvertFile';
import Fsm from '../../components/fsm/Fsm';
import Inspector from '../../components/fsm/Inspector';
import Jenkins from '../../components/Jenkins';
import Payment from '../../components/payment/Payment';
import PaymentChallenge from '../../components/payment/PaymentChallenge';
import PaymentComplete from '../../components/payment/PaymentComplete';

const FsmContainer = () => {
  return (
    <>
      <Fsm />
      <Inspector />
    </>
  );
};

const PaymentContainer = () => {
  const isInspectorOnly = false;
  return (
    <>
      <div className="row">
        {isInspectorOnly ? (
          <Payment isInspectorOnly={isInspectorOnly} />
        ) : (
          <div className="col">
            <Payment isInspectorOnly={isInspectorOnly} />
          </div>
        )}
        <div className="col">
          <Inspector />
        </div>
      </div>
    </>
  );
};

const Pages = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);

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
