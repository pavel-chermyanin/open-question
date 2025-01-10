import {useSelector} from "react-redux";
import {selectSessionStatus} from "@/entities/open-question";
import {useEffect, useState} from "react";
import {SessionStatus} from "@/app/types/session.types.ts";
import {Button, Message, Panel, Text} from "rsuite";
import {ClearSessionStatusButton} from "@/features/open-question/clear-session-status-button.tsx";
import {useAutoCodingStatus} from "@/shared/hooks/use-autocoding-status.tsx";
import {DownloadCompletedFileButton} from "@/features/open-question/download-completed-file-button.tsx";
import {AutocodingProgressBar} from "@/widgets/open-question/autocoding-progress-bar.tsx";


export const BannerStatus = () => {
  const status = useSelector(selectSessionStatus)
  const [statusText, setStatusText] = useState('')
  const {total, completed, pending} = useAutoCodingStatus()

  useEffect(() => {
    switch (status) {
      case SessionStatus.FILE_UPLOADED:
        setStatusText('Загружена активная сессия')
        break
      case SessionStatus.AUTOCODING:
        setStatusText('Идет кодировка')
        break
      case SessionStatus.AUTOCODING_COMPLETED:
        setStatusText('Кодировка завершена')
        break
    }

  }, [status]);


  if (!statusText) {
    return null
  }
  return (
    <Message className={''}>
      <div className={'flex items-center gap-4'}>
        <strong>Статус!</strong> {statusText}.
        {(status === SessionStatus.AUTOCODING || status === SessionStatus.AUTOCODING_COMPLETED) &&
          <AutocodingProgressBar
            status={pending ? 'active' : "success"}
            percent={total > 0 ? +((completed / total) * 100).toFixed() : 0}/>
        }
        <div className={'ml-auto flex gap-2'}>
          {status === SessionStatus.AUTOCODING_COMPLETED && <DownloadCompletedFileButton/>}
          <ClearSessionStatusButton/>
        </div>
      </div>

    </Message>


  )
}