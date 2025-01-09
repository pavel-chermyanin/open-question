import React from "react";
import { RouterProvider as ReactRouterProvider } from "react-router-dom";
import { router } from "../config/router.tsx";
// import {AppDispatch} from "@/app/store.ts";
// import {useDispatch} from "react-redux";  // Импортируй объект маршрутов

export const RouterProvider: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   // Вызываем действие для проверки авторизации при первой загрузке
  //   dispatch({ type: 'AUTH/CHECK_AUTH_STATUS' });
  // }, [dispatch]);
  return <ReactRouterProvider router={router} />;  // Передаем маршруты в провайдер
};