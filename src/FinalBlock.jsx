import React from 'react';

const defaultCurrencies = ['UAH', 'USD', 'EUR'];

export const FinalBlock = ({ value, currency, onChangeValue, onChangeCurrency }) => (
  <div className="block">
    <ul className="currencies">
      {defaultCurrencies.map((cur) => (
        <li
          onClick={() => onChangeCurrency(cur)}
          className={currency === cur ? 'active' : ''}
          key={cur}>
          {cur}
        </li>
      ))}
      
    </ul>
    <input
      disabled type="number"
      onChange={(e) => onChangeValue(e.target.value)}
      value={value}
      placeholder={0}
    />
  </div>
);
