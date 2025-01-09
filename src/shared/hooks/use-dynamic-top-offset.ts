import { useState, useLayoutEffect, useRef } from 'react';

export const useDynamicTopOffset = () => {
  const [topOffset, setTopOffset] = useState(0);
  const topFiltersRef = useRef<HTMLDivElement | null>(null);
  const groupFiltersRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const calculateTop = () => {
      const topFiltersHeight = topFiltersRef.current?.offsetHeight || 0;
      const groupFiltersHeight = groupFiltersRef.current?.offsetHeight || 0;
      const totalTopOffset = topFiltersHeight + groupFiltersHeight;
      setTopOffset(totalTopOffset);
    };

    calculateTop();

    window.addEventListener('resize', calculateTop);
    return () => window.removeEventListener('resize', calculateTop);
  }, []);

  return { topOffset, topFiltersRef, groupFiltersRef };
};
