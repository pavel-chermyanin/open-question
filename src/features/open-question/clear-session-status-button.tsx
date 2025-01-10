import {Button} from "rsuite";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/store.ts";
import {clearOpenQuestion} from "@/entities/open-question";


export const ClearSessionStatusButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const clearSession = () => {
    sessionStorage.clear();
    dispatch(clearOpenQuestion())
  }
  return (
    <Button onClick={clearSession} appearance={'primary'} >Очистить сессию</Button>
  )
}