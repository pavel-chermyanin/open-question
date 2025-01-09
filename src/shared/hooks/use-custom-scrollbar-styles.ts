// hooks/useCustomScrollbarStyles.ts
import {useEffect} from 'react';

interface ScrollbarStylesOptions {
  wrapperClass: string;
  scrollbarHeight?: number; // Высота скроллбара
  scrollbarWidth?: number; // Ширина скроллбара
  trackColor?: string; // Цвет дорожки
  thumbColor?: string; // Цвет ползунка
}

export const useCustomScrollbarStyles = (

  {
    wrapperClass,
    scrollbarHeight = 10, // По умолчанию 10px
    scrollbarWidth = 6, // По умолчанию 6px
    trackColor = '#f1f1f1', // По умолчанию серый
    thumbColor = 'var(--primary-color)', // По умолчанию primary color

  }: ScrollbarStylesOptions) => {
  useEffect(() => {
    const addScrollbarStyles = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        
        .${wrapperClass}::-webkit-scrollbar {
          width: ${scrollbarWidth}px; /* Ширина скроллбара */
          height: ${scrollbarHeight}px; /* Высота скроллбара */
        }
        
        .${wrapperClass}::-webkit-scrollbar-track {
          background: ${trackColor}; /* Цвет дорожки */
        }
        
        .${wrapperClass}::-webkit-scrollbar-thumb {
          background-color: ${thumbColor}; /* Цвет бегунка */
          border-radius: 20px; /* Округление бегунка */
        }
      `;
      document.head.appendChild(style);
    };

    addScrollbarStyles();

  }, [wrapperClass, scrollbarHeight, scrollbarWidth, trackColor, thumbColor]);
};
