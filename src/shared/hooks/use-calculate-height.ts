import { useEffect } from 'react';

export const useCalculateHeight = (ref: React.RefObject<HTMLElement>, offset: number = 0,load:boolean) => {
  useEffect(() => {
    const calculateHeight = () => {
      if (ref.current) {
        const topOffset = ref.current.getBoundingClientRect().top;
        ref.current.style.height = `calc(100vh - ${topOffset + offset}px - 20px)`;
        // ref.current.style.overflowY = `auto`;
        // ref.current.style.overflowX = `hidden`;
      }
    };

    // Вызываем calculateHeight после первого рендера
    const handleResize = () => {
      requestAnimationFrame(calculateHeight);
    };

    // Используем setTimeout для задержки
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(calculateHeight);
    }, 0);

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [ref, offset,load]);
};
