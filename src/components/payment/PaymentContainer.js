import Inspector from '../fsm/Inspector';
import Payment from './Payment';

const PaymentContainer = ({ isInspectorOnly = false, isPaymentOnly = true } = {}) => {
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
          <Payment isInspectorOnly={isInspectorOnly} />
          <Inspector newWindow={true} />
        </div>
      </div>
    </>
  );
};

export default PaymentContainer;
