import {SessionStatus} from "@/app/types/session.types.ts";


export type OpenQuestionState = {
  file_id: string | null
  session_status:SessionStatus | null
  preview:OpenQuestionPreview | null
  calculated_price: number | null
}

export type OpenQuestionPreview = {
  codes:Codes
  sheets: string[]
  headers:string[]
  preview: (string|number)[][]
}

export type Codes = Record<string, Record<string, string>>