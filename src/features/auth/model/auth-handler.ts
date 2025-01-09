// authHandlers.ts
import { AuthState } from './auth.slice';

export const handleLoginPending = (state: AuthState) => {
  state.loading = true; // Устанавливаем состояние загрузки в true
  state.error = undefined; // Сбрасываем ошибку
};

export const handleLoginFulfilled = (state: AuthState) => {
  state.loading = false; // Устанавливаем состояние загрузки в false
  state.isAuthenticated = true; // Устанавливаем пользователя как аутентифицированного
}
export const handleGetMeFulfilled = (state: AuthState) => {
  state.isAuthenticated = true; // Устанавливаем пользователя как аутентифицированного
};

