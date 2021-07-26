import { useMachine } from '@xstate/react';
import React, { useState } from 'react';
import { API_ROUTES } from '../../utility/CONSTANTS';
import Input from '../common/Input';
import { defaultFormState, strings } from './paymentConfig';
import paymentMachine from './paymentMachine2';

function Payment({ isInspectorOnly }) {
  const [state, send] = useMachine(paymentMachine, { devTools: true });
  const [formState, setFormState] = useState(defaultFormState);
  const [initPaymentState, setInitPaymentState] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const intPaymentResponse = await fetch(API_ROUTES.PAYMENT_INIT, {
      method: 'POST',
      body: JSON.stringify({
        amount: formState.amount,
        cardHolderName: formState.cardHolderName,
        cardNumber: formState.cardNumber,
        currency: formState.currency,
        CVV: formState.CVV,
        expirationMonth: formState.expirationMonth,
        expirationYear: formState.expirationYear,
      }),
      headers,
    });
    const intPaymentResponseJson = await intPaymentResponse.json();
    setInitPaymentState(intPaymentResponseJson);
  };

  const onChange = ({ target: { name, value } }) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      {/* <Loader /> */}
      {isInspectorOnly ? null : (
        <>
          <form onSubmit={onSubmit}>
            <Input name="cardHolderName" strings={strings} value={formState.cardHolderName} onChange={onChange} />
            <div className="row">
              <div className="col">
                <Input name="amount" strings={strings} type="number" value={formState.amount} onChange={onChange} />
              </div>
              <div className="col">
                <Input name="currency" strings={strings} value={formState.currency} onChange={onChange} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Input
                  name="cardNumber"
                  strings={strings}
                  type="password"
                  value={formState.cardNumber}
                  onChange={onChange}
                />
              </div>
              <div className="col">
                <Input name="CVV" strings={strings} type="password" value={formState.CVV} onChange={onChange} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Input
                  name="expirationMonth"
                  strings={strings}
                  type="number"
                  value={formState.expirationMonth}
                  onChange={onChange}
                />
              </div>
              <div className="col">
                <Input
                  name="expirationYear"
                  strings={strings}
                  type="number"
                  value={formState.expirationYear}
                  onChange={onChange}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <Input name="address1" strings={strings} value={formState.address1} onChange={onChange} />
              </div>
              <div className="col">
                <Input name="address2" strings={strings} value={formState.address2} onChange={onChange} />
              </div>
            </div>
            <Input name="city" strings={strings} value={formState.city} onChange={onChange} />
            <Input name="state" strings={strings} value={formState.state} onChange={onChange} />{' '}
            <Input name="zipCode" type="number" strings={strings} value={formState.zipCode} onChange={onChange} />
            <div className="text-end">
              <button className="btn btn-primary mt-3 text-end">{strings.submit}</button>
            </div>
          </form>
          <hr />
          <pre>
            <code>{JSON.stringify({ formState, initPaymentState }, null, 2)}</code>
          </pre>
        </>
      )}
    </>
  );
}

Payment.propTypes = {};

export default Payment;
