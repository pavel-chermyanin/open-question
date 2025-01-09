import {createRoot} from "react-dom/client";
import {RouterProvider} from "./providers/router-provider";
import {Provider} from 'react-redux';
// Правильный импорт
import "./styles/styles.scss";
import 'rsuite/dist/rsuite-no-reset.min.css';
import store from "@/app/store.ts";
// import ProtectedRoute from "@/app/providers/protected-route.tsx";  // Подключение стилей

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <Provider store={store}> {/* Оборачиваем в Provider */}
    {/*<ProtectedRoute>*/}
      <RouterProvider/>
    {/*</ProtectedRoute>*/}
  </Provider>
);
