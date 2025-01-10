import {useDispatch, useSelector} from "react-redux";
import {
  getTaskStatus,
  GetTaskStatusResponse,
  selectFileId,
  selectSessionStatus,
  setSessionStatus
} from "@/entities/open-question";
import {SessionStatus} from "@/app/types/session.types.ts";
import {useEffect, useState} from "react";
import {AppDispatch} from "@/app/store.ts";


export const useAutoCodingStatus = () => {
  const file_id = useSelector(selectFileId)
  const status = useSelector(selectSessionStatus)
  const dispatch = useDispatch<AppDispatch>()
  const [statusTask, setStatusTask] = useState<GetTaskStatusResponse>()


  useEffect(() => {
    if (status === SessionStatus.AUTOCODING) {
      const getStatus = async () => {
        const response = await dispatch(getTaskStatus({session_id: file_id!})).unwrap()
        if (response.total === response.completed) {
          setStatusTask(response)
          dispatch(setSessionStatus(SessionStatus.AUTOCODING_COMPLETED))
        }
        if (response.pending) {
          setTimeout(() => {
            getStatus()
          }, 5000)
        }
      }
      getStatus()
    }
  }, [status]);

  return {
    total: statusTask?.total ?? 0,
    pending: statusTask?.pending ?? 0,
    completed: statusTask?.completed ?? 0
  }

}