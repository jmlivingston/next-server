import React, { useState } from 'react';
import Input from '../common/Input';

const PhoneNumber = () => {
  const [value, setValue] = useState();

  const onChange = ({ target: { value: phoneNumber } }) => {
    let formattedPhoneNumber = phoneNumber;
    if (!phoneNumber) {
      formattedPhoneNumber = phoneNumber;
    } else {
      const onlyNums = phoneNumber.replace(/[^\d]/g, '');
      if (onlyNums.length <= 3) {
        formattedPhoneNumber = onlyNums;
      } else if (onlyNums.length <= 6) {
        formattedPhoneNumber = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
      } else if (onlyNums.length > 6) {
        formattedPhoneNumber = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
      }
    }
    setValue(formattedPhoneNumber);
  };

  return <Input name="name" onChange={onChange} strings={{ name: 'Phone Number' }} value={value} />;
};

export default PhoneNumber;
