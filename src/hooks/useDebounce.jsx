import React, { useEffect, useState } from 'react';

const Debounce = (value, delay) => {
  const [deboundeValue, SetdebounceValue] = useState('');

  useEffect(() => {
    const Debounce = setTimeout(() => {
      SetdebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(Debounce);
    };
  }, [value]);

  return deboundeValue;
};

export default Debounce;
