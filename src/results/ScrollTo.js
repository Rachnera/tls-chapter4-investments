import { useEffect, useRef } from 'react';

const ScrollTo = ({ children, data }) => {
  const resultRef = useRef(null);
  useEffect(() => {
    if (!data || !resultRef.current) {
      return;
    }
    resultRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [data, resultRef]);

  if (!data) {
    return null;
  }

  return <div ref={resultRef}>{children}</div>;
};

export default ScrollTo;
