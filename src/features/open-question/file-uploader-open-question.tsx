
'use client';

import { Button, Uploader } from "rsuite";
import {BASE_URL_OPEN_QUESTION} from "@/app/config/constants.ts";
import {OpenQuestionPaths, selectFileId, setFileId, setSessionStatus} from "@/entities/open-question";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/app/store.ts";
import {SessionStatus, SessionStorage} from "@/app/types/session.types.ts";
import {BannerStatus} from "@/widgets/open-question/banner-status.tsx";


type FileUploaderResponse = {
  session_id: string;
};

export const FileUploaderOpenQuestion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const file_id = useSelector(selectFileId)

  const handleSuccess = async (response: FileUploaderResponse) => {
    if(response?.session_id) {
      dispatch(setFileId(response.session_id));
      dispatch(setSessionStatus(SessionStatus.FILE_UPLOADED));

      sessionStorage.setItem(SessionStorage.FILE_ID, response.session_id)
      sessionStorage.setItem(SessionStorage.SESSION_STATUS, SessionStatus.FILE_UPLOADED)
    }
    try {
      // Устанавливаем ID сессии и статус
      // setOpenQuestionFileId(response.session_id);
      // setOpenQuestionSessionStatus(OpenQuestionSessionStatus.FILE_UPLOADED);
      //
      // sessionStorage.setItem(OpenQuestionSessionStorage.FILE_ID, response.session_id);
      // sessionStorage.setItem(OpenQuestionSessionStorage.SESSION_STATUS, OpenQuestionSessionStatus.FILE_UPLOADED);

      // Запрос данных для предпросмотра
      // const res = await openQuestionClient.post(
      //   `${OPEN_QUESTION_BASE_URL}${OpenQuestionPaths.PREVIEW_DATA}`,
      //   { session_id: response.session_id }
      // );

      // setPreview(res.data); // Устанавливаем данные предпросмотра
    } catch (error) {
      console.error("Ошибка при загрузке предпросмотра:", error);
    }
  };

  if(file_id) {
    return <BannerStatus/>
  }

  return (
    <div>
      <Uploader
        draggable
        action={`${BASE_URL_OPEN_QUESTION}${OpenQuestionPaths.FILE_UPLOAD}`} // Указываем пустое значение для action
        listType="picture-text"
        fileListVisible={false}
        onSuccess={handleSuccess}
      >
        <Button>Загрузите или перетащите файл...</Button>
      </Uploader>
    </div>
  );
};
