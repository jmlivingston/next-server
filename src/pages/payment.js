import Head from 'next/head';
import Inspector from '../components/fsm/Inspector';
import Payment from '../components/payment/Payment';

const PaymentContainer = () => {
  const isInspectorOnly = true;
  return (
    <>
      <Head>
        <title>Payment</title>
      </Head>
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

export default PaymentContainer;
