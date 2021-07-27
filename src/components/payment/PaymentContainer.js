import Inspector from '../fsm/Inspector';
import Payment from './Payment';

const PaymentContainer = () => {
  const isInspectorOnly = false;
  const isPaymentOnly = true;
  return isPaymentOnly ? (
    <div className="container">
      <Payment />
    </div>
  ) : (
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

export default PaymentContainer;
