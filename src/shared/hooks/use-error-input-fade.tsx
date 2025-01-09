import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

export const useErrorInputFade = (name: string) => {
  const {
    clearErrors,
    formState: { errors },
  } = useFormContext();

  // console.log('eeee',errors,name)
  const [isFadingOut, setIsFadingOut] = useState(false);
  // Используем функцию для получения вложенной ошибки
  const errorMessage =
    typeof getNestedValue(errors, name)?.message === "string"
      ? getNestedValue(errors, name)?.message
      : "";



  useEffect(() => {
    if (errorMessage) {
      setIsFadingOut(false); // Убираем состояние исчезновения при появлении ошибки
      const timeout = setTimeout(() => {
        setIsFadingOut(true); // Включаем исчезновение через 3 секунды
        setTimeout(() => {
          clearErrors(name); // Очищаем ошибку через 3 секунды после включения fadeOut
        }, 300); // Длительность исчезновения
      }, 3000); // Пауза перед началом исчезновения

      return () => clearTimeout(timeout); // Очистка таймера при размонтировании
    } else {
      setIsFadingOut(false); // Если ошибки нет, убираем состояние исчезновения
    }
  }, [errorMessage, clearErrors, name]);

  return { isFadingOut, errorMessage };
};
