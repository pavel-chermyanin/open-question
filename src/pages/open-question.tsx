import {FileUploaderOpenQuestion} from "@/features/open-question/file-uploader-open-question.tsx";
import {useInitialOpenQuestionStatus} from "@/entities/open-question/use-initial-open-question-status.ts";
import {OpenQuestionColumnForm} from "@/features/open-question/open-question-column-form.tsx";

export const OpenQuestion = () => {
  useInitialOpenQuestionStatus()
  return (
    <div className={'p-4 grow'}>
      <FileUploaderOpenQuestion/>
      <OpenQuestionColumnForm/>
    </div>
  )
}