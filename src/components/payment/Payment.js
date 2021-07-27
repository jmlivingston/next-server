import { useMachine } from '@xstate/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  API_ROUTES,
  LOCAL_STORAGE_KEY,
  NEUVEI_TRANSACTION_STATUS,
  PAYMENT_FLOW_STATE,
  ROUTES,
} from '../../config/CONSTANTS';
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
  const [flowState, setFlowState] = useState(PAYMENT_FLOW_STATE.UNSUBMITTED);
  const [error, setError] = useState(false);
  const [paymentResponseState, setPaymentResponseState] = useState({});
  const [isFallback, setIsFallback] = useState(false);
  const router = useRouter();
  const showExtraFields = false;

  useEffect(() => {
    (async () => {
      if (router.query.challenge === 'accepted') {
        const paymentDetails = localStorage.getItem(LOCAL_STORAGE_KEY.PAYMENT_DETAILS);
        if (paymentDetails) {
          setFlowState(PAYMENT_FLOW_STATE.LIABILITY_SHIFT);
          await callPayment(JSON.parse(paymentDetails));
          localStorage.removeItem(LOCAL_STORAGE_KEY.PAYMENT_DETAILS);
        }
        router.push(ROUTES.PAYMENT.path);
      }
    })();
  }, []);

  const callPayment = async (body) => {
    setError();
    setIsSubmitting(true);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const paymentResponse = await fetch(API_ROUTES.PAYMENT, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });
    let paymentResponseJson = await paymentResponse.json();
    setPaymentResponseState({ ...body, ...paymentResponseJson });
    setIsSubmitting(false);
    setError(paymentResponseJson.transactionStatus);
    switch (flowState) {
      case PAYMENT_FLOW_STATE.UNSUBMITTED:
        if (paymentResponseJson.transactionStatus === NEUVEI_TRANSACTION_STATUS.APPROVED && !isFallback) {
          // Frictionless
          setFlowState(PAYMENT_FLOW_STATE.COMPLETE);
        } else {
          setFlowState(
            paymentResponseJson.transactionStatus === NEUVEI_TRANSACTION_STATUS.REDIRECT
              ? PAYMENT_FLOW_STATE.CHALLENGE
              : PAYMENT_FLOW_STATE.COMPLETE
          );
        }
        break;
      case PAYMENT_FLOW_STATE.LIABILITY_SHIFT:
        setFlowState(PAYMENT_FLOW_STATE.COMPLETE);
        break;
      case PAYMENT_FLOW_STATE.CHALLENGE:
        setFlowState(PAYMENT_FLOW_STATE.LIABILITY_SHIFT);
        break;
    }
    if (paymentResponseJson.transactionStatus === NEUVEI_TRANSACTION_STATUS.REDIRECT) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY.PAYMENT_DETAILS,
        JSON.stringify({
          amount: formState.amount,
          cardHolderName: formState.cardHolderName,
          cardNumber: formState.cardNumber,
          clientRequestId: paymentResponseJson.clientRequestId,
          currency: formState.currency,
          CVV: formState.CVV,
          expirationMonth: formState.expirationMonth,
          expirationYear: formState.expirationYear,
          isFallback: paymentResponseJson.isFallback,
          isInit: paymentResponseJson.isInit,
          isLiabilityShift: true,
          relatedTransactionId: paymentResponseJson.transactionId,
          sessionToken: paymentResponseJson.sessionToken,
        })
      );
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const isInit = flowState === PAYMENT_FLOW_STATE.UNSUBMITTED;
    let body = {
      amount: formState.amount,
      cardHolderName: formState.cardHolderName,
      cardNumber: formState.cardNumber,
      currency: formState.currency,
      CVV: formState.CVV,
      expirationMonth: formState.expirationMonth,
      expirationYear: formState.expirationYear,
      isFallback,
      isInit,
      isLiabilityShift: false,
      notificationURL: ROUTES.PAYMENT_NOTIFICATION_URL.path,
    };

    if (!isInit) {
      body = {
        ...body,
        clientRequestId: paymentResponseState.clientRequestId,
        isLiabilityShift: true,
        relatedTransactionId: paymentResponseState.transactionId,
        sessionToken: paymentResponseState.sessionToken,
      };
    }
    callPayment(body);
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
          <div className="row">
            <div className="col-6">
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
                    <Input
                      name="CVV"
                      strings={strings}
                      type="password"
                      value={formState.CVV}
                      onChange={onInputChange}
                    />
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
                {showExtraFields && (
                  <>
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
                    <Input
                      name="zipCode"
                      type="number"
                      strings={strings}
                      value={formState.zipCode}
                      onChange={onInputChange}
                    />
                  </>
                )}
                {flowState !== 'challenge' && (
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
                )}
              </form>
              <h1>{flowState}</h1>
              {paymentResponseState?.challengeUrl && (
                <>
                  Click to fullfill challenge: <a href={paymentResponseState?.challengeUrl}>Challenge Link</a>
                </>
              )}
              {error && (
                <div className={`alert alert-${error.includes('ERROR') ? 'danger' : 'success'} mt-3`} role="alert">
                  {error}
                </div>
              )}
            </div>
            <div className="col-6">
              <p>Response</p>
              <pre>
                <code>{JSON.stringify(paymentResponseState, null, 2)}</code>
              </pre>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Payment;
