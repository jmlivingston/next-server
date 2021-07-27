import { useMachine } from '@xstate/react';
import React, { useState } from 'react';
import { API_ROUTES, NEUVEI_API_CHALLENGE_SIMULATOR } from '../../config/CONSTANTS';
import Input from '../common/Input';
import { defaultFormState, getTestCardHolders, getTestCards, strings } from './paymentConfig';
import paymentMachine from './paymentMachine';

function Payment({ isInspectorOnly }) {
  const cards = getTestCards({ useBasic: true });
  const users = getTestCardHolders({ useBasic: true });
  const [activeCard, setActiveCard] = useState(cards[Object.keys(cards)[0]]);
  const [activeUser, setActiveUser] = useState(users[Object.keys(users)[0]]);
  const [state, send] = useMachine(paymentMachine, { devTools: true });
  const [formState, setFormState] = useState({ ...defaultFormState, cardNumber: activeCard.value });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flowState, setFlowState] = useState('init');
  const [error, setError] = useState(false);
  const [paymentResponseState, setPaymentResponseState] = useState({});
  const [isFallback, setIsFallback] = useState(false);

  const onSubmit = async (event) => {
    setError();
    setIsSubmitting(true);
    event.preventDefault();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const isInit = flowState === 'init';
    const isChallenge = flowState === 'challenge';
    let paymentResponseJson;
    if (isChallenge) {
      const url = NEUVEI_API_CHALLENGE_SIMULATOR({
        acsUrl: paymentResponseState.paymentOption.card.threeD.acsUrl,
        cReq: paymentResponseState.paymentOption.card.threeD.cReq,
      });
      console.log(url);
      setIsSubmitting(false);
    } else {
      const body = isInit
        ? {
            amount: formState.amount,
            cardHolderName: formState.cardHolderName,
            cardNumber: formState.cardNumber,
            currency: formState.currency,
            CVV: formState.CVV,
            expirationMonth: formState.expirationMonth,
            expirationYear: formState.expirationYear,
            isInit,
            isFallback,
            isLiabilityShift: false,
          }
        : {
            amount: formState.amount,
            cardHolderName: formState.cardHolderName,
            cardNumber: formState.cardNumber,
            currency: formState.currency,
            CVV: formState.CVV,
            expirationMonth: formState.expirationMonth,
            expirationYear: formState.expirationYear,
            clientRequestId: paymentResponseState.clientRequestId,
            sessionToken: paymentResponseState.sessionToken,
            clientRequestId: paymentResponseState.clientRequestId,
            relatedTransactionId: paymentResponseState.transactionId,
            sessionToken: paymentResponseState.sessionToken,
            paResponse: isChallenge ? undefined : '{{PaResponse}}', //HACK comes from somewhere?
            relatedTransactionId: paymentResponseState.transactionId,
            isInit,
            isFallback,
            isLiabilityShift: true,
          };
      const paymentResponse = await fetch(API_ROUTES.PAYMENT, {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
      });
      paymentResponseJson = await paymentResponse.json();
      setPaymentResponseState({ ...body, ...paymentResponseJson });
      setIsSubmitting(false);
      setError(paymentResponseJson.transactionStatus + ' - ' + paymentResponseJson.status);
    }
    switch (flowState) {
      case 'init':
        if (paymentResponseJson.transactionStatus === 'APPROVED' && !isFallback) {
          setFlowState('init');
        } else {
          setFlowState(paymentResponseJson.transactionStatus === 'REDIRECT' ? 'challenge' : 'liabilityShift');
        }
        break;
      case 'liabilityShift':
        setFlowState('init');
        break;
      case 'challenge':
        setFlowState('liabilityShift');
        break;
    }
  };

  const onInputChange = ({ target: { name, value } }) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onCardChange = (event) => {
    const activeCard = cards[event.target.value];
    setActiveCard(activeCard);
    setFormState({
      ...formState,
      cardNumber: activeCard.value,
    });
  };

  const onCardHolderChange = (event) => {
    const activeUser = users[event.target.value];
    setActiveUser(activeUser);
    setFormState({
      ...formState,
      cardHolderName: activeUser.value,
    });
    setIsFallback(activeUser.notes.includes('Fallback'));
  };

  return (
    <>
      {isInspectorOnly ? null : (
        <>
          <label className="form-label">Card</label>
          <select className="form-select" value={activeCard.id} onChange={onCardChange}>
            {Object.entries(cards).map(([key, card]) => {
              return (
                <option key={key} value={key}>{`${card.value} - ${card.type} - ${card.transactionType} - ${
                  card.country || 'N/A'
                } - ${card.expected} ${card.notes ? ` - ${card.notes}` : ''}`}</option>
              );
            })}
          </select>
          <form onSubmit={onSubmit}>
            {/* <Input name="cardHolderName" strings={strings} value={formState.cardHolderName} onChange={onInputChange} /> */}
            <label className="form-label">Cardholder Name</label>
            <select className="form-select" value={activeUser.value} onChange={onCardHolderChange}>
              {Object.entries(users).map(([key, user]) => {
                return <option key={key} value={key}>{`${user.value} - ${user.notes}`}</option>;
              })}
            </select>
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
            {/* <div className="form-check mt-2">
              {isFallback.toString()}
              <input
                className="form-check-input"
                type="checkbox"
                checked={isFallback}
                onChange={() => setIsFallback(!isFallback)}
                id="fall-back"
              />
              <label className="form-check-label" htmlFor="fall-back">
                Is Fallback?
              </label>
            </div> */}
            {/* <hr />
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
            <Input name="zipCode" type="number" strings={strings} value={formState.zipCode} onChange={onInputChange} /> */}
            <div className="text-end">
              <button className="btn btn-primary mt-3 text-end" disabled={isSubmitting}>
                {isSubmitting && (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>{' '}
                  </>
                )}
                {strings.submit}
              </button>
            </div>
          </form>
          <h1>{flowState}</h1>
          {error && (
            <div className={`alert alert-${error === 'ERROR' ? 'danger' : 'success'} mt-3`} role="alert">
              {error}
            </div>
          )}
          {(paymentResponseState || formState) && (
            <>
              <hr />
              <pre>
                <code>
                  {JSON.stringify(
                    {
                      ...paymentResponseState,
                      //formState
                    },
                    null,
                    2
                  )}
                </code>
              </pre>
            </>
          )}
        </>
      )}
    </>
  );
}

Payment.propTypes = {};

export default Payment;
