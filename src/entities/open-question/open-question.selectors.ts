import {OpenQuestionState} from "./open-question.types.ts";

export const selectFileId = (state: { openQuestion: OpenQuestionState }) => state.openQuestion.file_id;
export const selectSessionStatus = (state: { openQuestion: OpenQuestionState }) => state.openQuestion.session_status;
export const selectPreview = (state: { openQuestion: OpenQuestionState }) => state.openQuestion.preview;
export const selectCalculatedPrice = (state: { openQuestion: OpenQuestionState }) => state.openQuestion.calculated_price;