import { useEffect, useRef, useState } from "react";

export const useDynamicPlacement = () => {
  const inputRef = useRef<HTMLDivElement | null>(null); // Ссылка на элемент
  const [placement, setPlacement] = useState<"topStart" | "bottomStart">("bottomStart");

  useEffect(() => {
    const handleResize = () => {
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        const distanceToBottom = window.innerHeight - rect.bottom;

        // Проверяем расстояние до нижней границы окна
        if (distanceToBottom < 320) {
          setPlacement("topStart");
        } else {
          setPlacement("bottomStart");
        }
      }
    };

    // Вызываем при монтировании и при изменении размера окна
    window.addEventListener("resize", handleResize);
    handleResize(); // первичная проверка

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { placement, inputRef }; // Возвращаем placement и ссылку на элемент
};

