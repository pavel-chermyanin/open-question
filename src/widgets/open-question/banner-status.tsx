import {useSelector} from "react-redux";
import {selectSessionStatus} from "@/entities/open-question";
import {useEffect, useState} from "react";
import {SessionStatus} from "@/app/types/session.types.ts";
import {Button, Message, Panel, Text} from "rsuite";
import {ClearSessionStatusButton} from "@/features/open-question/clear-session-status-button.tsx";


export const BannerStatus = () => {
  const status = useSelector(selectSessionStatus)
  const [statusText, setStatusText] = useState('')

  useEffect(() => {
    switch (status) {
      case SessionStatus.FILE_UPLOADED:
        setStatusText('Загружена активная сессия')
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
        <ClearSessionStatusButton/>
      </div>

    </Message>


  )
}