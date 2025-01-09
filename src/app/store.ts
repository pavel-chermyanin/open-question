import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/user/user.slice';
import { authReducer } from '@/features/auth/model/auth.slice';
import {openQuestionReducer} from "@/entities/open-question/open-question.slice.ts";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    openQuestion: openQuestionReducer,
    // другие редюсеры
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(authMiddleware), // Подключаем мидлвару, если нужно
});

// Тип для состояния всего приложения
export type RootState = ReturnType<typeof store.getState>;

// Тип для dispatch
export type AppDispatch = typeof store.dispatch;


export default store;
