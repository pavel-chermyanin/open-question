import { createAsyncThunk } from '@reduxjs/toolkit';

interface ApiResponse<T, Extra = unknown> {
  data: T;
  extra?: Extra;
}

export const createApiThunk = <T, P = undefined, Extra = undefined>(
  actionType: string,
  apiCall: (params: P) => Promise<ApiResponse<T, Extra>>
) => {
  return createAsyncThunk<T | (T & Extra), P>(
    actionType,
    async (params, { rejectWithValue }) => {
      try {
        const response = await apiCall(params);
        // Проверка, если `extra` присутствует, объединяем с `data`
        if (response.extra) {
          return { ...response.data, ...response.extra };
        }
        return response.data; // Возвращаем только данные
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message || 'Ошибка при выполнении запроса');
        }
        return rejectWithValue('Ошибка при выполнении запроса');
      }
    }
  );
};
