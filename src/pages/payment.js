import Inspector from '../components/fsm/Inspector';
import Payment from '../components/payment/Payment';

const PaymentContainer = () => {
  const isInspectorOnly = true;
  return (
    <>
      <div className="row">
        {isInspectorOnly ? (
          <Payment isInspectorOnly={isInspectorOnly} />
        ) : (
          <div className="col">
            <Payment />
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
