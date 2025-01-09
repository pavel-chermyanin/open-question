import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { RouteTypes } from "@/app/types/routes.types.ts";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setAuth } from "@/features/auth";
import { ACCESS_TOKEN } from "@/app/config/constants.ts";
import { AppDispatch } from "@/app/store.ts";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const currentPath = window.location.pathname; // Получаем текущий путь
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      dispatch(setAuth(true));
    }
    // Устанавливаем задержку в 1 секунду
    const timeout = setTimeout(() => {
      // setIsLoading(false);
      setLoading(false)// После задержки отключаем состояние загрузки
    }, 1000);

    return () => clearTimeout(timeout); // Очистка таймера при размонтировании
  }, [dispatch]);

  useLayoutEffect(() => {
    if(loading) return
    if (currentPath === RouteTypes.AUTH) {
      // setIsLoading(false); // Прекращаем загрузку, если на странице авторизации
      return; // Прекращаем выполнение, если мы на странице авторизации
    }

    if (!auth) {
      window.location.href = RouteTypes.AUTH; // Перенаправление на страницу авторизации
    }
  }, [auth, currentPath,loading]);

  return (
    <>
      {loading   ? ( // Проверяем состояние загрузки
        <div className={'h-screen flex items-center justify-center'}>
          <div className="spinner"> {/* Ваш спиннер */}
            Загрузка...
          </div>
        </div>
      ) : (
        // Если мы не на странице авторизации и есть токен, отображаем children
        (currentPath === RouteTypes.AUTH || auth) ? (
          children
        ) : null
      )}
    </>
  );
};

export default ProtectedRoute;
