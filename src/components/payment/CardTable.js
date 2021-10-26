import React, { useState } from 'react';
import { API_ROUTES } from '../../config/ROUTES';
import { defaultFormState, getTestCards } from './paymentConfig';

const CardTable = () => {
  const [cards, setCards] = useState(getTestCards());
  const [response, setResponse] = useState({});

  const callPayment = async (card) => {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const body = {
        ...defaultFormState,
        cardHolderName: 'John Smith',
        cardNumber: card.value,
        currency: 'GBP',
        isFallback: false,
        isInit: true,
        isLiabilityShift: false,
        notificationURL: 'http://localhost:9000/pages/payment?challenge=accepted',
      };
      const paymentResponse = await fetch(API_ROUTES.PAYMENT, {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
      });
      const paymentResponseJson = await paymentResponse.json();
      setResponse(paymentResponseJson);
    } catch (error) {
      setResponse(error);
    }
    setCards({
      ...cards,
      [card.id]: {
        ...card,
        isSubmitting: false,
        isSubmitted: true,
      },
    });
  };

  const onClick = ({ key, card }) => {
    callPayment(card);
    setCards({
      ...cards,
      [key]: {
        ...card,
        isSubmitting: true,
      },
    });
  };
  return (
    <div className="container-fluid">
      <h1>Neuvei Test Cards</h1>
      <hr />
      <div className="row">
        <div className="col-6">
          <div className="table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Number</th>
                  {/* <th>Type</th> */}
                  <th>Country</th>
                  <th>Type</th>
                  {/* <th>Expected Result</th> */}
                  <th>Notes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(cards).map(([key, card], index) => {
                  return (
                    <tr key={key}>
                      <td>{index}</td>
                      <td>{card.value}</td>
                      {/* <td>{card.type}</td> */}
                      <td>{card.country}</td>
                      <td>{card.transactionType}</td>
                      {/* <td>{card.expected}</td> */}
                      <td>
                        {card.expected}{' '}
                        {card.notes ? (
                          <>
                            <br />
                            {card.notes}
                          </>
                        ) : null}
                      </td>
                      <td>
                        <button
                          className={`btn btn-${card.isSubmitted ? 'secondary' : 'primary'} btn-sm`}
                          onClick={() => onClick({ key, card })}
                          disabled={card.isSubmitting}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {card.isSubmitting && (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>{' '}
                            </>
                          )}
                          {card.isSubmitted && !card.isSubmitting ? 'Submit ✓' : 'Submit'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-6">
          <p>Response</p>
          <pre>
            <code>{JSON.stringify(response, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CardTable;
