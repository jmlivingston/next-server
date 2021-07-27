import { useMachine } from '@xstate/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { API_ROUTES } from '../../config/CONSTANTS';
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
  const [flowState, setFlowState] = useState('unsubmitted');
  const [error, setError] = useState(false);
  const [paymentResponseState, setPaymentResponseState] = useState({});
  const [isFallback, setIsFallback] = useState(false);
  const {
    query: { challenge },
  } = useRouter();
  useEffect(() => {
    (async () => {
      if (challenge === 'accepted') {
        const paymentDetails = localStorage.getItem('paymentDetails');
        if (paymentDetails) {
          setFlowState('liabilityShift');
          await callPayment(JSON.parse(paymentDetails));
          localStorage.removeItem('paymentDetails');
        }
      }
    })();
    setCardHolder(activeCard.value);
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
    setError(paymentResponseJson.transactionStatus); // + ' - ' + paymentResponseJson.status);
    switch (flowState) {
      case 'unsubmitted':
        if (paymentResponseJson.transactionStatus === 'APPROVED' && !isFallback) {
          // Frictionless
          setFlowState('unsubmitted');
        } else {
          setFlowState(paymentResponseJson.transactionStatus === 'REDIRECT' ? 'challenge' : 'liabilityShift');
        }
        break;
      case 'liabilityShift':
        setFlowState('unsubmitted');
        break;
      case 'challenge':
        setFlowState('liabilityShift');
        break;
    }
    if (paymentResponseJson.transactionStatus === 'REDIRECT') {
      localStorage.setItem(
        'paymentDetails',
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
          // paResponse: isChallenge ? undefined : '{{PaResponse}}', //HACK comes from somewhere?
          relatedTransactionId: paymentResponseJson.transactionId,
          sessionToken: paymentResponseJson.sessionToken,
        })
      );
    }
  };

  const onSubmit = async (event) => {
    event?.preventDefault();
    const isInit = flowState === 'unsubmitted';
    let body;
    if (isInit) {
      body = {
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
        notificationURL: 'http://localhost:9000/pages/payment?challenge=accepted',
      };
    } else {
      body = {
        amount: formState.amount,
        cardHolderName: formState.cardHolderName,
        cardNumber: formState.cardNumber,
        clientRequestId: paymentResponseState.clientRequestId,
        currency: formState.currency,
        CVV: formState.CVV,
        expirationMonth: formState.expirationMonth,
        expirationYear: formState.expirationYear,
        isFallback,
        isInit,
        isLiabilityShift: true,
        paResponse: flowState === 'challenge' ? undefined : '{{PaResponse}}', //HACK comes from somewhere?
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

  const setCardHolder = (card) => {
    // switch (card) {
    //   case '4000020951595032':
    //     setActiveUser(users['CL-BRW1']);
    //     break;
    //   case '4000027891380961':
    //     setActiveUser(users['FL-BRW1']);
    //     break;
    //   case '4012001037141112':
    //     setActiveUser(users['John Smith']);
    //     break;
    // }
  };

  const onCardChange = (event) => {
    const activeCard = cards[event.target.value];
    setActiveCard(activeCard);
    setFormState({
      ...formState,
      cardNumber: activeCard.value,
    });
    setCardHolder(activeCard.value);
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
            </div>
          </div>
        </>
      )}
    </>
  );
}

Payment.propTypes = {};

export default Payment;
