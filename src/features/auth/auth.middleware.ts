// auth.middleware.ts
import { Middleware } from 'redux';
import { checkAuthStatus, setLoading } from './model/auth.slice.ts';
import {ACCESS_TOKEN} from "@/app/config/constants.ts"; // Импортируйте действие для установки состояния загрузки

const authMiddleware: Middleware = (store) => (next) => (action) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const currentPath = window.location.pathname; // Получаем текущий путь

  // Устанавливаем состояние загрузки
  store.dispatch(setLoading(true));

  // Проверяем, если токен отсутствует и мы не на странице авторизации
  if (!token && currentPath !== '/auth') {
    window.location.href = '/auth'; // Редирект на страницу авторизации
    return; // Не вызываем следующий middleware или редюсер
  } else if (token) {
    store.dispatch(checkAuthStatus(true)); // Диспатчим действие для установки статуса
  }

  // Убираем состояние загрузки после проверки токена
  store.dispatch(setLoading(false));

  return next(action); // Возвращаем результат выполнения следующего middleware или редюсера
};

export default authMiddleware;
