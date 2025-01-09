import {createApiThunk} from "@/app/config/create-api-thunk.ts";
import {User} from "@/entities/user/user.types.ts";
import {openQuestionClient} from "@/app/config/open-question-client.ts";


export const getMe = createApiThunk<User, void>(
  'user/getMe',
  async () => {
    const response = await openQuestionClient.get('/auth/users/me'); // Выполняем запрос через ваш экземпляр Axios
    return response; // Возвращаем только данные из ответа
  }
);