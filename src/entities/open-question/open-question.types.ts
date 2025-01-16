import {SessionStatus} from "@/app/types/session.types.ts";


export type OpenQuestionState = {
  file_id: string | null
  session_status:SessionStatus | null
  preview:OpenQuestionPreview | null
  loadingPreview:boolean
  calculated_price: number | null
}

export type OpenQuestionPreview = {
  codes:Codes
  questions_and_answers: Record<string, string>
  preview_data:Record<string, string[]>
}

export type GetPriceRequest = {
  session_id:string
  list_name:string
}
export type PostCodingJobRequest = {
  session_id:string
  sheet:string
  codes_sheet:string
}
export type CreateCodesRequest = {
  session_id:string
  question_name:string[]
  question_full:string[]
}

// export type GetTaskStatusResponse = {
//   total:number
//   pending:number
//   completed:number
// }

export type CodesFields = {
  children:string[]
  codes:Record<string, string>
}

export type Codes = Record<string, CodesFields>