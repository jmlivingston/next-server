import _debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';

const useWindowSize = ({ debounceWait = 300 }) => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Debounce used to prevent handling resize too frequently
    window.addEventListener(
      'resize',
      _debounce(() => handleResize(), debounceWait)
    );

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
