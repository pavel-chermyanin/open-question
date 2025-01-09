import {createApiThunk} from "@/app/config/create-api-thunk.ts";
import {openQuestionClient} from "@/app/config/open-question-client.ts";
import {OpenQuestionPaths} from "./open-question.paths.ts";
import {OpenQuestionPreview} from "./open-question.types.ts";


export const getPreviewData = createApiThunk<OpenQuestionPreview, any>(
  'openQuestion/getPreviewData',
  async (id) => {
    const response = await openQuestionClient.post(OpenQuestionPaths.PREVIEW_DATA,{
      session_id:id
    }); // Выполняем запрос через ваш экземпляр Axios
    return response; // Возвращаем только данные из ответа
  }
);
export const getPrice = createApiThunk<number, any>(
  'openQuestion/getPrice',
  async (data) => {
    const response = await openQuestionClient.post(OpenQuestionPaths.GET_PRICE,{
      session_id:data.id,
      list_name: data.list_name
    }); // Выполняем запрос через ваш экземпляр Axios
    return response; // Возвращаем только данные из ответа
  }
);