import { useMachine } from '@xstate/react';
import React, { useState } from 'react';
import { API_ROUTES } from '../../config/CONSTANTS';
import Input from '../common/Input';
import { defaultFormState, strings, TEST_CARDS } from './paymentConfig';
import paymentMachine from './paymentMachine';

function Payment({ isInspectorOnly }) {
  const [cards, setCards] = useState(TEST_CARDS);
  const [activeCard, setActiveCard] = useState(cards[Object.keys(cards)[0]]);
  const [state, send] = useMachine(paymentMachine, { devTools: true });
  const [formState, setFormState] = useState({ ...defaultFormState, cardNumber: activeCard.value });
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

  const onInputChange = ({ target: { name, value } }) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onSelectChange = (event) => {
    const activeCard = cards[event.target.value];
    setActiveCard(activeCard);
    setFormState({
      ...formState,
      cardNumber: activeCard.value,
    });
  };

  return (
    <>
      {isInspectorOnly ? null : (
        <>
          <select className="form-select" value={activeCard.id} onChange={onSelectChange}>
            {Object.entries(cards).map(([key, card]) => {
              return (
                <option key={key} value={key}>{`${card.value} - ${card.type} - ${card.country || 'N/A'} - ${
                  card.expected
                } ${card.notes || ''}`}</option>
              );
            })}
          </select>
          <form onSubmit={onSubmit}>
            <Input name="cardHolderName" strings={strings} value={formState.cardHolderName} onChange={onInputChange} />
            <div className="row">
              <div className="col">
                <Input
                  name="amount"
                  strings={strings}
                  type="number"
                  value={formState.amount}
                  onChange={onInputChange}
                />
              </div>
              <div className="col">
                <Input name="currency" strings={strings} value={formState.currency} onChange={onInputChange} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Input
                  name="cardNumber"
                  strings={strings}
                  type="password"
                  value={activeCard.value}
                  onChange={onInputChange}
                  readOnly
                  disabled
                />
              </div>
              <div className="col">
                <Input name="CVV" strings={strings} type="password" value={formState.CVV} onChange={onInputChange} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Input
                  name="expirationMonth"
                  strings={strings}
                  type="number"
                  value={formState.expirationMonth}
                  onChange={onInputChange}
                />
              </div>
              <div className="col">
                <Input
                  name="expirationYear"
                  strings={strings}
                  type="number"
                  value={formState.expirationYear}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <Input name="address1" strings={strings} value={formState.address1} onChange={onInputChange} />
              </div>
              <div className="col">
                <Input name="address2" strings={strings} value={formState.address2} onChange={onInputChange} />
              </div>
            </div>
            <Input name="city" strings={strings} value={formState.city} onChange={onInputChange} />
            <Input name="state" strings={strings} value={formState.state} onChange={onInputChange} />{' '}
            <Input name="zipCode" type="number" strings={strings} value={formState.zipCode} onChange={onInputChange} />
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
