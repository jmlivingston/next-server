import { useRouter } from 'next/router';
import React from 'react';
import { NEUVEI_CHALLENGE_URL, ROUTES } from '../../utility/CONSTANTS';
import { strings } from './paymentConfig';

const PaymentChallenge = () => {
  const {
    query: { paReq },
  } = useRouter();

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('PaReq', paReq);
    formData.append('TermUrl', ROUTES.PAYMENT_COMPLETE.path);
    fetch(NEUVEI_CHALLENGE_URL, { method: 'POST', body: formData });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="text-center">
        <button className="btn btn-primary mt-3 text-end">{strings.submit}</button>
      </div>
    </form>
  );
};

export default PaymentChallenge;
