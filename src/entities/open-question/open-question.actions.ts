import {createApiThunk} from "@/app/config/create-api-thunk.ts";
import {openQuestionClient} from "@/app/config/open-question-client.ts";
import {OpenQuestionPaths} from "./open-question.paths.ts";
import {
  GetPriceRequest,
  GetTaskStatusResponse,
  OpenQuestionPreview,
  PostCodingJobRequest
} from "./open-question.types.ts";


export const getPreviewData = createApiThunk<OpenQuestionPreview, string>(
  'openQuestion/getPreviewData',
  async (id) => {
    const response = await openQuestionClient.post(OpenQuestionPaths.PREVIEW_DATA, {
      session_id: id
    }); // Выполняем запрос через ваш экземпляр Axios
    return response; // Возвращаем только данные из ответа
  }
);
export const getPrice = createApiThunk<number, GetPriceRequest>(
  'openQuestion/getPrice',
  async ({session_id, list_name}) => {
    const response = await openQuestionClient.post(OpenQuestionPaths.GET_PRICE, {
      session_id,
      list_name
    }); // Выполняем запрос через ваш экземпляр Axios
    return response; // Возвращаем только данные из ответа
  }
);

export const postCodingJob = createApiThunk<{ message: string }, PostCodingJobRequest>(
  'openQuestion/postCodingJob',
  async ({session_id, codes_sheet, sheet}) => {
    const response = await openQuestionClient.post(OpenQuestionPaths.POST_CODING_JOB, {
      session_id,
      codes_sheet,
      sheet
    }); // Выполняем запрос через ваш экземпляр Axios
    return response; // Возвращаем только данные из ответа
  }
);

export const getTaskStatus = createApiThunk<GetTaskStatusResponse, { session_id: string }>(
  'openQuestion/getTaskStatus',
  async ({session_id}) => {
    const response = await openQuestionClient.post(OpenQuestionPaths.GET_TASK_STATUS, {
      session_id,
    }); // Выполняем запрос через ваш экземпляр Axios
    return response; // Возвращаем только данные из ответа
  }
);

export const downloadFinishFile = createApiThunk<any, { session_id: string }>(
  'openQuestion/downloadFinishFile',
  async ({session_id}) => {
    const response = await openQuestionClient.post(OpenQuestionPaths.DOWNLOAD_FINISH_FILE, {
        session_id,
      }
      , {
        responseType: 'blob',
      }); // Выполняем запрос через ваш экземпляр Axios
    return response; // Возвращаем только данные из ответа
  }
);