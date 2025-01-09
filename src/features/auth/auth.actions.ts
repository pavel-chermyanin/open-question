import {createApiThunk} from "@/app/config/create-api-thunk.ts";
import {AuthForm, LoginResponse} from "./auth.types.ts";
import {loginClient} from "@/app/config/login-client.ts";


export const login = createApiThunk<LoginResponse, AuthForm>(
  'auth/login',
  async (form) => {
    const response = await loginClient.post('/auth/jwt/login', form); // Выполняем запрос через ваш экземпляр Axios
    return response; // Возвращаем только данные из ответа
  }
);