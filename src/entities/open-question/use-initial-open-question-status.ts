import {useEffect} from "react";
import {SessionStatus, SessionStorage} from "@/app/types/session.types.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/store.ts";
import {setFileId, setSessionStatus} from "@/entities/open-question/open-question.slice.ts";


export const useInitialOpenQuestionStatus = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const status = sessionStorage.getItem(SessionStorage.SESSION_STATUS);
    const file_id = sessionStorage.getItem(SessionStorage.FILE_ID);

    if(status) {
      dispatch(setSessionStatus(status as SessionStatus));
    }
    if(file_id) {
      dispatch(setFileId(file_id))
    }

  }, []);

}