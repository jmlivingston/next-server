import _debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const setFromEvent = (e) => {
      setPosition({
        x: e.clientX + window.pageXOffset,
        y: e.clientY + window.pageYOffset,
      });
    };
    window.addEventListener(
      'mousemove',
      _debounce((e) => setFromEvent(e), 10)
    );
    return () => window.removeEventListener('mousemove', setFromEvent);
  }, []);

  return position;
};

export default useMousePosition;
