import {useDispatch, useSelector} from "react-redux";
import {
  // getTaskStatus,
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
      const socket = new WebSocket(`ws://172.16.0.138:8000/api/ws/get_task_status/${file_id}`);
      socket.onmessage = (ev) => {
        const data = JSON.parse(ev.data)
        setStatusTask(data)
        if (data.total === data.completed) {
          dispatch(setSessionStatus(SessionStatus.AUTOCODING_COMPLETED))
        }
      }


    }
  }, [status]);

  return {
    total: statusTask?.total ?? 0,
    pending: statusTask?.pending ?? 0,
    completed: statusTask?.completed ?? 0
  }

}