import { createBrowserRouter } from "react-router-dom";
import { AuthPage } from "@/pages/auth.tsx";
import { RouteTypes } from "@/app/types/routes.types.ts";
import {MainPage} from "@/pages/main.tsx";
import {HomePage} from "@/pages/home.tsx";
import {OpenQuestion} from "@/pages/open-question.tsx";
import {Brands} from "@/pages/brands.tsx";

  // Правильный путь к файлу

// Определяем маршруты
export const router = createBrowserRouter([
  {
    path: RouteTypes.HOME,
    element:
      <MainPage />
    ,
    children: [
      {
        path: RouteTypes.HOME, // Дочерний маршрут с таким же путем
        element: <HomePage />,
        children: [
          {
            path: RouteTypes.HOME, // Дочерний маршрут с таким же путем
            element: <OpenQuestion /> // Можно использовать тот же компонент или другой, если нужно
          },
          {
            path: RouteTypes.BRANDS, // Дочерний маршрут с таким же путем
            element: <Brands /> // Можно использовать тот же компонент или другой, если нужно
          },
          // Здесь можно добавить другие дочерние маршруты, если нужно
        ]
      },
      // Здесь можно добавить другие дочерние маршруты, если нужно
    ]
  },
  {
    path: RouteTypes.AUTH,
    element: <AuthPage />
  },

]);
