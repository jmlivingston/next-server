import React, { useState } from 'react';
import { getTestCards } from './paymentConfig';

const CardTable = () => {
  const [cards, setCards] = useState(getTestCards());
  const onClick = ({ key, card }) => {
    setCards({
      ...cards,
      [key]: {
        ...card,
        isSubmitted: true,
      },
    });
  };
  return (
    <div className="container">
      <h1>Neuvei Test Cards</h1>
      <hr />
      <table className="table table">
        <thead>
          <tr>
            <th>#</th>
            <th>Number</th>
            <th>Type</th>
            <th>Country</th>
            <th>Type</th>
            <th>Expected Result</th>
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
                <td>{card.type}</td>
                <td>{card.country}</td>
                <td>{card.transactionType}</td>
                <td>{card.expected}</td>
                <td>{card.notes}</td>
                <td>
                  <button
                    className={`btn btn-${card.isSubmitted ? 'secondary' : 'primary'} btn-sm`}
                    onClick={() => onClick({ key, card })}
                  >
                    Submit {card.isSubmitted ? '(OK)' : ''}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CardTable;
